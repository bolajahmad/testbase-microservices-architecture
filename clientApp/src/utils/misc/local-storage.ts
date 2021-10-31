export const extract = <T>(key: string) => {
    const value = localStorage.getItem(key);
    try {
        return value && (JSON.parse(value) as T);
    } catch (e) {
        return null;
    }
};

export const save = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
};
