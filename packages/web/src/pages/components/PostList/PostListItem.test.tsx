import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { setPosts, setUsers, store } from 'store';
import type { Post, User } from '@bbpl/common';
import { withTestEnv } from 'test/withTestEnv';
import { PostListItem } from './PostListItem';

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

const PostListItemWithTestEnv = withTestEnv(PostListItem);

const clickHandler = vi.fn();

export const setUpView = (posts: Post[], users: User[]) => {
  store.dispatch(setPosts(posts));
  store.dispatch(setUsers(users));

  render(<PostListItemWithTestEnv onClick={clickHandler} post={POST} user={USER} />);
};

describe('PostListItem', () => {
  test('fires handler when clicked', async () => {
    setUpView([POST], [USER]);

    expect(clickHandler).toBeCalledTimes(0);

    const titleElement = await screen.findByText(POST.title);
    expect(titleElement).toBeDefined();

    fireEvent.click(titleElement);

    expect(clickHandler).toBeCalledTimes(1);
    expect(clickHandler).toBeCalledWith(POST.id);
  });
});
