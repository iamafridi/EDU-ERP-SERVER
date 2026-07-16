import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

export const parseCsv = <T = Record<string, string>>(content: string): T[] => {
    return parse(content, { columns: true, skip_empty_lines: true, trim: true }) as T[];
};

export const generateCsv = <T extends Record<string, unknown>>(data: T[]): string => {
    return stringify(data, { header: true });
};

export const importFromCsv = async <T>(
    model: any,
    fileContent: string,
    transform?: (row: Record<string, string>) => T,
): Promise<{ inserted: number; errors: string[] }> => {
    const errors: string[] = [];
    let inserted = 0;
    const rows = parseCsv<Record<string, string>>(fileContent);

    for (const row of rows) {
        try {
            const doc = transform ? transform(row) : (row as unknown as T);
            await model.create(doc);
            inserted++;
        } catch (err: any) {
            errors.push(err.message || 'Unknown error');
        }
    }

    return { inserted, errors };
};

export const exportToCsv = async <T>(
    model: any,
    query: Record<string, unknown> = {},
): Promise<string> => {
    const data = await model.find(query).lean();
    return generateCsv(data as Record<string, unknown>[]);
};
