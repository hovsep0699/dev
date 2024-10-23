export function formatDateToDDMMYYYY(date?: Date | null): string | null {
    if (!date || !(date instanceof Date))
        return null;
    const day = String(date.getDay()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}