import type { QueryKeyType } from './QueryKeyType';

const API_BASE_URL = `https://jsonplaceholder.typicode.com`;

export function getApiUrl(queryKey: QueryKeyType[]): URL {
  const apiPath = queryKey.join('/');
  return new URL(apiPath, API_BASE_URL);
}
