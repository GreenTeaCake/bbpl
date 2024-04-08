/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FilterBy = 'ALL' | 'USERNAME' | 'USER_ID' | 'POST_BODY';

export type FiltersState = {
  query: string;
  filterBy: FilterBy;
};

export const initialState: FiltersState = {
  query: '',
  filterBy: 'ALL',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    resetFilters: () => initialState,
    setFilterBy: (state, action: PayloadAction<FilterBy>) => {
      state.filterBy = action.payload;
    },
    setFilterQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { resetFilters, setFilterBy, setFilterQuery } = filtersSlice.actions;
