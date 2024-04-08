import type { QueryKeyType } from './QueryKeyType';

const API_HOST = 'localhost';
const API_PORT = 3000;
const API_BASE_PATH = 'api/v1';
const API_BASE_URL = `http://${API_HOST}:${API_PORT}`;

export function getApiUrl(queryKey: QueryKeyType[]): URL {
  const apiPath = [API_BASE_PATH, ...queryKey].join('/');
  return new URL(apiPath, API_BASE_URL);
}
