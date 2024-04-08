import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { setPosts, setUsers, store } from 'store';
import type { Post, User } from '@bbpl/common';
import { withTestEnv } from 'test/withTestEnv';
import { PostList } from './PostList';

const POST: Post = {
  id: 1,
  title: 'Post Title',
  body: 'Post Body',
  userId: 1,
};

const USER: User = {
  id: 1,
  name: 'User Name',
  username: 'User Username',
  email: 'User Email',
};

const PostListWithTestEnv = withTestEnv(PostList);

export const setUpView = (posts: Post[], users: User[]) => {
  store.dispatch(setPosts(posts));
  store.dispatch(setUsers(users));

  render(<PostListWithTestEnv />);
};

describe('PostList', () => {
  test('shows post with user', async () => {
    setUpView([POST], [USER]);

    const titleElement = await screen.findByText(POST.title);
    expect(titleElement).toBeDefined();

    const bodyElement = await screen.findByText(POST.body);
    expect(bodyElement).toBeDefined();

    const usernameElement = await screen.findByText(USER.username);
    expect(usernameElement).toBeDefined();
  });

  test('shows post without user', async () => {
    setUpView([POST], [{ ...USER, id: 2 }]);

    const titleElement = await screen.findByText(POST.title);
    expect(titleElement).toBeDefined();

    const bodyElement = await screen.findByText(POST.body);
    expect(bodyElement).toBeDefined();

    const usernameElement = screen.queryByText(USER.username);
    expect(usernameElement).not.toBeTruthy();
  });
});
