import {
  Fragment,
  type MouseEvent,
  type SyntheticEvent,
  memo,
  useCallback,
  type FC,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react';
import type { Commentary, Tag } from '@bbpl/common';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import TextField, { type TextFieldVariants } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { addReply, updateTags } from 'store/commentaries';
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
    commentary: { id: commentaryId, name, email, body, replies, tags = [] },
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

  const [reply, setReply] = useState('');

  const isReplyButtonDisabled = useMemo(() => !reply.trim(), [reply]);

  const handleReplyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setReply(event.target.value);
    },
    [setReply],
  );

  const handleReplyClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setReply('');
      dispatch(addReply({ reply, commentaryId }));
    },
    [setReply, dispatch, reply, commentaryId],
  );

  const filterOptions = useCallback(
    (input: Option[], state: FilterOptionsState<Option>): Option[] => {
      const filtered = FILTER(input, state);
      const { inputValue } = state;
      if (inputValue.trim() !== '' && !filtered.length) {
        filtered.push({ inputValue, label: `+ "${inputValue}"` });
      }
      return filtered;
    },
    [],
  );

  return (
    <Card>
      <CardHeader title={name} subheader={email} />
      <CardContent>
        <Stack direction="column">
          <div>{body}</div>
          {!!replies.length && (
            <List>
              {replies.map((text, textIndex) => {
                const isLast = textIndex === replies.length - 1;
                return (
                  <Fragment key={text}>
                    <ListItem>
                      <ListItemText>
                        <Typography
                          variant="caption"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            wordBreak: 'break-all',
                          }}
                        >
                          {text}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    {!isLast && <Divider key={`divider-${text}`} />}
                  </Fragment>
                );
              })}
            </List>
          )}
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'stretch',
          gap: '16px',
        }}
      >
        <Stack sx={{ width: '100%' }} direction="row" gap={1}>
          <TextField
            label="Reply"
            onChange={handleReplyChange}
            size="small"
            sx={{
              width: '100%',
            }}
            value={reply}
            variant="outlined"
          />
          <IconButton disabled={isReplyButtonDisabled} onClick={handleReplyClick}>
            <SendIcon />
          </IconButton>
        </Stack>
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
            // bad style, no time to customize the component
            margin: '0 !important',
            width: '100%',
          }}
          value={options}
        />
      </CardActions>
    </Card>
  );
};

export const CommentaryListItemMemoized = memo(CommentaryListItem);
