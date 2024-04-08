import { describe, expect, test } from 'vitest';
import { getApiUrl } from './getApiUrl';

describe('getApiUrl', () => {
  test('returns URL for two-part key', () => {
    expect(getApiUrl(['posts', 1]).toString()).toBe('https://jsonplaceholder.typicode.com/posts/1');
  });

  test('returns URL for one-part key', () => {
    expect(getApiUrl(['posts']).toString()).toBe('https://jsonplaceholder.typicode.com/posts');
  });

  test('returns URL for no key', () => {
    expect(getApiUrl([]).toString()).toBe('https://jsonplaceholder.typicode.com/');
  });
});
