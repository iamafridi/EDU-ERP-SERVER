import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Medical College ERP API',
            version: '1.0.0',
            description: 'Complete ERP & Hostel Management System for Medical Colleges',
        },
        servers: [{ url: '/api/v1' }],
        components: {
            securitySchemes: {
                firebaseAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Firebase ID Token',
                },
            },
        },
        security: [{ firebaseAuth: [] }],
    },
    apis: ['./src/app/modules/**/*.route.ts'],
};

export const setupSwagger = (app: Application) => {
    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
