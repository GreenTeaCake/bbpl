import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { resetFilters, store } from 'store';
import { withTestEnv } from 'test/withTestEnv';
import { PostFilter } from './PostFilter';

const PostFilterWithTestEnv = withTestEnv(PostFilter);

const setUpView = () => {
  render(<PostFilterWithTestEnv initialEntries={['/posts']} />);
};

describe('PostFilter', () => {
  afterEach(async () => {
    await act(() => store.dispatch(resetFilters()));
  });

  test('shows default state', async () => {
    setUpView();

    const selectElement = await screen.findByRole('combobox');
    expect(selectElement).toBeDefined();
    expect(selectElement.textContent).toEqual('all');

    const inputElement = (await screen.findByTestId('query-input-wrapper')).querySelector('input');
    expect(inputElement).toBeDefined();
    expect(inputElement!.textContent).toEqual('');

    const buttonElement = await screen.findByRole('button');
    expect(buttonElement).toBeDefined();
    expect(buttonElement).toBeDisabled();

    expect(store.getState().filters.filterBy).toEqual('ALL');
    expect(store.getState().filters.query).toEqual('');
  });

  test('emits find by', async () => {
    setUpView();

    const selectElement = await screen.findByRole('combobox');
    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/username/i));

    const buttonElement = await screen.findByRole('button');
    expect(buttonElement).toBeDefined();
    expect(buttonElement).not.toBeDisabled();

    expect(store.getState().filters.filterBy).toEqual('USERNAME');
    expect(store.getState().filters.query).toEqual('');
  });

  test('emits query', async () => {
    setUpView();

    const inputElement = (await screen.findByTestId('query-input-wrapper')).querySelector('input');
    fireEvent.change(inputElement!, { target: { value: 'query' } });

    const buttonElement = await screen.findByRole('button');
    expect(buttonElement).toBeDefined();
    expect(buttonElement).not.toBeDisabled();

    expect(store.getState().filters.filterBy).toEqual('ALL');
    expect(store.getState().filters.query).toEqual('query');
  });

  test('resets filters', async () => {
    setUpView();

    const selectElement = await screen.findByRole('combobox');
    fireEvent.mouseDown(selectElement);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/username/i));

    const inputElement = (await screen.findByTestId('query-input-wrapper')).querySelector('input');
    fireEvent.change(inputElement!, { target: { value: 'query' } });

    const buttonElement = await screen.findByRole('button');
    expect(buttonElement).toBeDefined();
    expect(buttonElement).not.toBeDisabled();

    expect(store.getState().filters.filterBy).toEqual('USERNAME');
    expect(store.getState().filters.query).toEqual('query');

    fireEvent.click(buttonElement);

    expect(store.getState().filters.filterBy).toEqual('ALL');
    expect(store.getState().filters.query).toEqual('');
  });
});
