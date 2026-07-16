import PDFDocument from 'pdfkit';

type TReceiptData = {
    receiptNumber: string;
    studentName: string;
    amount: number;
    date: Date;
    items?: { name: string; amount: number }[];
};

type TTranscriptData = {
    studentName: string;
    program: string;
    semester: string;
    grades: { course: string; grade: string; credits: number }[];
    sgpa: number;
    cgpa: number;
};

type TReportData = {
    title: string;
    generatedAt: Date;
    sections: { heading: string; content: string }[];
};

const generatePdf = (buildDoc: (doc: typeof PDFDocument.prototype) => void): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Buffer[] = [];

        doc.on('data', (chunk: Buffer) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        buildDoc(doc);
        doc.end();
    });
};

export const generateReceipt = async (data: TReceiptData): Promise<Buffer> => {
    return generatePdf((doc) => {
        doc.fontSize(20).text('RECEIPT', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Receipt #: ${data.receiptNumber}`);
        doc.text(`Student: ${data.studentName}`);
        doc.text(`Date: ${data.date.toLocaleDateString()}`);
        doc.moveDown();
        doc.text(`Amount: Rs. ${data.amount.toLocaleString()}`, { underline: true });
        if (data.items) {
            doc.moveDown();
            doc.text('Breakdown:');
            data.items.forEach((item) => {
                doc.text(`  ${item.name}: Rs. ${item.amount}`);
            });
        }
    });
};

export const generateTranscript = async (data: TTranscriptData): Promise<Buffer> => {
    return generatePdf((doc) => {
        doc.fontSize(20).text('TRANSCRIPT', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Student: ${data.studentName}`);
        doc.text(`Program: ${data.program}`);
        doc.text(`Semester: ${data.semester}`);
        doc.moveDown();
        data.grades.forEach((g) => {
            doc.text(`${g.course} — ${g.grade} (${g.credits} cr)`);
        });
        doc.moveDown();
        doc.text(`SGPA: ${data.sgpa}    CGPA: ${data.cgpa}`);
    });
};

export const generateReport = async (data: TReportData): Promise<Buffer> => {
    return generatePdf((doc) => {
        doc.fontSize(20).text(data.title, { align: 'center' });
        doc.fontSize(10).text(`Generated: ${data.generatedAt.toLocaleString()}`, { align: 'right' });
        doc.moveDown();
        data.sections.forEach((s) => {
            doc.fontSize(14).text(s.heading);
            doc.fontSize(11).text(s.content);
            doc.moveDown(0.5);
        });
    });
};
