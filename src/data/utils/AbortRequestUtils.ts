export const cancelSources = new Map<string, AbortController>([]);

export function cancelLastRequest(requestId: string): void {
  const token = cancelSources.get(requestId);
  if (token) {
    token.abort();
  }
}

export function getCancelToken(requestId: string): AbortSignal {
  cancelLastRequest(requestId);
  const nextCancelSource = new AbortController();
  cancelSources.set(requestId, nextCancelSource);
  return nextCancelSource.signal;
}
