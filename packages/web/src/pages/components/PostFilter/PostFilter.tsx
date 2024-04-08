import { type ChangeEvent, useCallback, useMemo, type FC, type MouseEvent } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {
  resetFilters,
  setFilterBy,
  setFilterQuery,
  useAppDispatch,
  useAppSelector,
  type FilterBy,
} from 'store';

export type Option<T extends string | number = number> = {
  value: T;
  label: string;
};

const FILTER_OPTIONS: Option<FilterBy>[] = [
  { value: 'ALL', label: 'all' },
  { value: 'USERNAME', label: 'username' },
  { value: 'USER_ID', label: 'user id' },
  { value: 'POST_BODY', label: 'post body' },
];

export const PostFilter: FC = () => {
  const filterBy = useAppSelector((state) => state.filters.filterBy);
  const query = useAppSelector((state) => state.filters.query);

  const dispatch = useAppDispatch();

  const handleFilterByChange = useCallback(
    (event: SelectChangeEvent<FilterBy>) => {
      event.preventDefault();
      dispatch(setFilterBy(event.target.value as FilterBy));
    },
    [dispatch],
  );

  const handleClearClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      dispatch(resetFilters());
    },
    [dispatch],
  );

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      dispatch(setFilterQuery(event.target.value));
    },
    [dispatch],
  );

  const isClearButtonDisabled = useMemo<boolean>(() => {
    return filterBy === 'ALL' && !query.trim();
  }, [filterBy, query]);

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <FormControl
        sx={{
          width: '170px',
        }}
      >
        <InputLabel>Filter by</InputLabel>
        <Select label="Filter by" onChange={handleFilterByChange} value={filterBy}>
          {FILTER_OPTIONS.map((option) => {
            const { value, label } = option;
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <TextField
          data-testid="query-input-wrapper"
          label="Query"
          onChange={handleQueryChange}
          value={query}
        />
      </FormControl>
      <IconButton
        color={isClearButtonDisabled ? 'default' : 'primary'}
        disabled={isClearButtonDisabled}
        onClick={handleClearClick}
        sx={{
          width: '40px',
          height: '40px',
          padding: '8px',
        }}
      >
        <ClearIcon />
      </IconButton>
    </Stack>
  );
};
