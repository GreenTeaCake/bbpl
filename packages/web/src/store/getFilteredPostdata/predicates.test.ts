import { describe, expect, test } from 'vitest';
import type { PostData } from './getFilteredPostData';
import { getPostBodyPredicate, getUserIdPredicate, getUsernamePredicate } from './predicates';

const POST_DATA: PostData = {
  post: {
    id: 1,
    userId: 1,
    body: 'post body',
    title: 'post title',
  },
  user: {
    id: 1,
    name: 'name',
    username: 'username',
    email: 'email',
  },
};

describe('predicates', () => {
  describe('postBody', () => {
    [
      { query: '', expected: true },
      { query: '  ', expected: true },
      { query: 'post', expected: true },
      { query: 'body', expected: true },
      { query: 'post body', expected: true },
      { query: 'query', expected: false },
      { query: '1', expected: false },
    ].forEach(({ query, expected }) => {
      test(`returns '${expected}' for '${query}'`, () => {
        const p = getPostBodyPredicate(query);
        const actual = p(POST_DATA);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('userId', () => {
    [
      { query: '', expected: true },
      { query: '  ', expected: true },
      { query: '1', expected: true },
      { query: '11', expected: false },
      { query: 'query', expected: false },
    ].forEach(({ query, expected }) => {
      test(`returns '${expected}' for '${query}'`, () => {
        const p = getUserIdPredicate(query);
        const actual = p(POST_DATA);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('username', () => {
    [
      { query: '', expected: true },
      { query: '  ', expected: true },
      { query: 'user', expected: true },
      { query: 'name', expected: true },
      { query: 'username', expected: true },
      { query: '1', expected: false },
      { query: 'query', expected: false },
    ].forEach(({ query, expected }) => {
      test(`returns '${expected}' for '${query}'`, () => {
        const p = getUsernamePredicate(query);
        const actual = p(POST_DATA);
        expect(actual).toEqual(expected);
      });
    });
  });
});
