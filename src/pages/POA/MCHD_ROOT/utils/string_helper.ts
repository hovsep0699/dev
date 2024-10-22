export const joinStrings =(...strings: (string | null | undefined)[]): string => {
    return strings
        .filter((s): s is string => s != null && s.trim().length > 0) // Filter out null and undefined
        .join(' ').trim();// Join remaining strings with a space
}

export const getKeyOrNull = (key?: string | null): string | null => {
    if (!key || key.length === 0) return null;
    return key;
}