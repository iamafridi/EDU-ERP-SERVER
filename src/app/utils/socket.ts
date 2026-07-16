import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { JwtHelpers } from './jwt';

let io: Server | null = null;

const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token as string;
    if (!token) {
        return next(new Error('Authentication required'));
    }

    try {
        const decoded = JwtHelpers.verifyToken(token) as { uid: string; email: string; role: string; userId: string };
        (socket as any).user = decoded;
        next();
    } catch {
        next(new Error('Invalid or expired token'));
    }
};

const connectionTracker = new Map<string, number[]>();

const socketRateLimiter = (socket: Socket, next: (err?: Error) => void) => {
    const ip = socket.handshake.address;
    const now = Date.now();
    const windowMs = 60000;
    const maxConnections = 10;

    const timestamps = connectionTracker.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < windowMs);

    if (recent.length >= maxConnections) {
        return next(new Error('Too many connections. Try again later.'));
    }

    recent.push(now);
    connectionTracker.set(ip, recent);

    socket.on('disconnect', () => {
        const current = connectionTracker.get(ip) || [];
        const idx = current.indexOf(now);
        if (idx !== -1) current.splice(idx, 1);
        if (current.length === 0) connectionTracker.delete(ip);
    });

    next();
};

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || '*',
            credentials: true,
        },
    });

    io.use(socketRateLimiter);
    io.use(socketAuthMiddleware);

    io.on('connection', (socket) => {
        const user = (socket as any).user;
        if (user?.userId) {
            socket.join(user.userId);
        }
    });

    console.log('Socket.io initialized');
};

export const getIO = (): Server => {
    if (!io) {
        throw new Error('Socket.io not initialized. Call initSocket first.');
    }
    return io;
};

export const emitToUser = (userId: string, event: string, data: unknown) => {
    if (io) {
        io.to(userId).emit(event, data);
    }
};
