const translations: Record<string, Record<string, string>> = {
    en: {
        welcome: 'Welcome',
        'student.dashboard': 'Student Dashboard',
        'fee.due': 'Fee Due',
        attendance: 'Attendance',
        grade: 'Grade',
    },
    hi: {
        welcome: 'स्वागत है',
        'student.dashboard': 'छात्र डैशबोर्ड',
        'fee.due': 'फीस बकाया',
        attendance: 'उपस्थिति',
        grade: 'ग्रेड',
    },
    bn: {
        welcome: 'স্বাগতম',
        'student.dashboard': 'ছাত্র ড্যাশবোর্ড',
        'fee.due': 'ফি বাকি',
        attendance: 'উপস্থিতি',
        grade: 'গ্রেড',
    },
};

const defaultLang = 'en';

export const t = (key: string, lang: string = defaultLang): string => {
    return translations[lang]?.[key] || translations[defaultLang]?.[key] || key;
};

export const setLanguage = (lang: string): void => {
    if (translations[lang]) {
        process.env.LANG = lang;
    }
};

export const getLanguage = (): string => {
    return process.env.LANG || defaultLang;
};

export const addTranslation = (lang: string, key: string, value: string): void => {
    if (!translations[lang]) translations[lang] = {};
    translations[lang][key] = value;
};
