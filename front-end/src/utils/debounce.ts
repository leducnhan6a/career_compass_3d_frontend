export function debounce<F extends (...args: never[]) => void>(
    func: F,
    wait: number
): (...args: Parameters<F>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function executedFunction(...args: Parameters<F>) {
        const later = () => {
            if (timeout) clearTimeout(timeout);
            func(...args);
        };

        // Clear the previous timeout before setting a new one
        clearTimeout(timeout!);

        // Set a new timeout to call the function after the wait period
        timeout = setTimeout(later, wait);
    };
}
