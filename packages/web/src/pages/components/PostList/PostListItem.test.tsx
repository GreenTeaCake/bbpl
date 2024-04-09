import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { setPosts, setUsers, store } from 'store';
import type { Post, User } from '@bbpl/common';
import { withTestEnv } from 'test/withTestEnv';
import * as router from 'react-router-dom';
import { PostListItem } from './PostListItem';

const navigateMock = vi.fn();
vi.spyOn(router, 'useNavigate');
vi.mock('react-router-dom', async (importOriginal) => {
  return {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    ...(await importOriginal<typeof import('react-router-dom')>()),
    useNavigate: () => navigateMock,
  };
});

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

export const setUpView = (posts: Post[], users: User[]) => {
  store.dispatch(setPosts(posts));
  store.dispatch(setUsers(users));

  render(<PostListItemWithTestEnv initialEntries={['/posts']} post={POST} user={USER} />);
};

describe('PostListItem', () => {
  test('fires handler when clicked', async () => {
    setUpView([POST], [USER]);

    expect(navigateMock).toBeCalledTimes(0);

    const titleElement = await screen.findByText(POST.title);
    expect(titleElement).toBeDefined();

    fireEvent.click(titleElement);

    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).toBeCalledWith(`/posts/${POST.id}/commentaries`);
  });
});
