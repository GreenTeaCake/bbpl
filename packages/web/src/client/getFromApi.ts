import type { QueryKeyType } from './QueryKeyType';
import { getApiUrl } from './getApiUrl';

export function getFromApi<T>(queryKey: QueryKeyType[]) {
  return async function get(signal: AbortSignal | null): Promise<T> {
    const response = await fetch(getApiUrl(queryKey), {
      signal,
      credentials: 'include',
    });
    if (!response.ok) {
      const { statusText } = response;
      throw new DOMException(statusText, statusText);
    }
    return response.json() as Promise<T>;
  };
}
