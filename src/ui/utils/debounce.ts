/**
 * Simple debounce utility for delaying function execution.
 * Replaces lodash.debounce for the Search component.
 */

interface DebouncedFunction<Args extends unknown[]> {
  (...args: Args): void;
  cancel(): void;
}

export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number,
): DebouncedFunction<Args> {
  let timeoutId: NodeJS.Timeout | null = null;

  const debouncedFunc = (...args: Args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFunc.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedFunc;
}
