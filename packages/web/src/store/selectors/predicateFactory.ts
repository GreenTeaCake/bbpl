import type { PostData } from './PostData';
import type { FilterBy } from '../filters';

type Predicate = (postData: PostData) => boolean;

type PredicateFactory = (query: string) => Predicate;

function stubTrue() {
  return true;
}

export const getUsernamePredicate: PredicateFactory = (query) => {
  if (!query.trim()) {
    return stubTrue;
  }

  return function usernamePredicate(postData) {
    const username = postData.user?.username;
    const regexp = new RegExp(query.trim(), 'ig');
    return username ? regexp.test(username) : false;
  };
};

export const getUserIdPredicate: PredicateFactory = (query) => {
  if (!query.trim()) {
    return stubTrue;
  }

  const userId = Number.parseInt(query.trim(), 10);

  return function userIdPredicate(postData) {
    return postData.post.userId === userId;
  };
};

export const getPostBodyPredicate: PredicateFactory = (query) => {
  if (!query.trim()) {
    return stubTrue;
  }

  return function postBodyPredicate(postData) {
    const regexp = new RegExp(query.trim(), 'ig');
    return regexp.test(postData.post.body);
  };
};

export const FACTORIES: Record<FilterBy, PredicateFactory[]> = {
  ALL: [getUsernamePredicate, getUserIdPredicate, getPostBodyPredicate],
  USERNAME: [getUsernamePredicate],
  USER_ID: [getUserIdPredicate],
  POST_BODY: [getPostBodyPredicate],
};
