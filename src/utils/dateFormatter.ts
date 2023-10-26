export function formatDate(inputDate: string) {
    const parts = inputDate.split('.');

    const originalDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);

    return originalDate.toISOString().split('T')[0];
}