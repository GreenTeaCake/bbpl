import { describe, expect, test } from 'vitest';
import { getApiUrl } from './getApiUrl';

describe('getApiUrl', () => {
  test('returns URL for two-part key', () => {
    expect(getApiUrl(['games', 0]).toString()).toBe('http://localhost:3000/api/v1/games/0');
  });

  test('returns URL for one-part key', () => {
    expect(getApiUrl(['games']).toString()).toBe('http://localhost:3000/api/v1/games');
  });

  test('returns URL for no key', () => {
    expect(getApiUrl([]).toString()).toBe('http://localhost:3000/api/v1');
  });
});
