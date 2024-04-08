import { createSelector } from '@reduxjs/toolkit';
import type { User } from '@bbpl/common';
import type { AppState } from '../store';

export const getUsersMap = createSelector([(state: AppState) => state.users.value], (users) =>
  users.reduce((m, u) => m.set(u.id, u), new Map<number, User>()),
);
