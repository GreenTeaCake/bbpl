import { type SyntheticEvent, memo, useCallback, type FC, useMemo } from 'react';
import type { Commentary, Tag } from '@bbpl/common';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField, { type TextFieldVariants } from '@mui/material/TextField';
import { updateTags } from 'store/commentaries';
import { useAppDispatch } from 'store';
import type { FilterOptionsState } from '@mui/material';
import partition from 'lodash/fp/partition';

export type CommentaryListItemProps = {
  allTags: Set<Tag>;
  commentary: Commentary;
};

type Option = {
  label: string;
  inputValue?: string;
};

const FILTER = createFilterOptions<Option>();

export const CommentaryListItem: FC<CommentaryListItemProps> = (props) => {
  const {
    allTags,
    commentary: { id: commentaryId, name, email, body, tags = [] },
  } = props;

  const dispatch = useAppDispatch();

  const options = useMemo(() => tags.map<Option>((label) => ({ label })), [tags]);
  const allOptions = useMemo(() => [...allTags].map<Option>((label) => ({ label })), [allTags]);

  const handleTagInputChange = useCallback(
    (event: SyntheticEvent, newValue: (string | Option)[]) => {
      event.preventDefault();
      const [[newOption], regularOptions] = partition<Option>((o) => o.inputValue)(newValue);
      const newTags = regularOptions.map((o) => o.label);
      if (newOption) {
        newTags.push(newOption.inputValue!);
      }
      dispatch(updateTags({ commentaryId, tags: newTags }));
    },
    [commentaryId, dispatch],
  );

  const filterOptions = useCallback(
    (input: Option[], state: FilterOptionsState<Option>): Option[] => {
      const filtered = FILTER(input, state);
      const { inputValue } = state;
      if (inputValue.trim() !== '') {
        const exist = tags.includes(inputValue);
        if (!exist) {
          filtered.push({ inputValue, label: `+ "${inputValue}"` });
        }
      }
      return filtered;
    },
    [tags],
  );

  return (
    <Card>
      <CardHeader title={name} subheader={email} />
      <CardContent>{body}</CardContent>
      <CardActions>
        <Autocomplete
          filterOptions={filterOptions}
          freeSolo
          isOptionEqualToValue={(option: Option, value: Option) => {
            return option.label === value.label;
          }}
          multiple
          onChange={handleTagInputChange}
          options={allOptions}
          renderInput={(params) => {
            const fieldParams = { ...params, size: 'small' } as unknown as TextFieldVariants;
            // @ts-expect-error Params are poorly typed
            return <TextField {...fieldParams} label="Tags" />;
          }}
          sx={{
            width: '100%',
          }}
          value={options}
        />
      </CardActions>
    </Card>
  );
};

export const CommentaryListItemMemoized = memo(CommentaryListItem);
