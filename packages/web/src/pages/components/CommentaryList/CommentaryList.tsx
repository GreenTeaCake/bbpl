import type { FC } from 'react';
import Stack from '@mui/material/Stack';
import { useAppSelector } from 'store';
import { getPostCommentaries } from 'store/selectors';
import type { Tag } from '@bbpl/common';
import { CommentaryListItemMemoized } from './CommentaryListItem';

type CommentaryListProps = {
  postId: number;
  allTags: Set<Tag>;
};

export const CommentaryList: FC<CommentaryListProps> = (props) => {
  const { postId, allTags } = props;

  const commentaries = useAppSelector((state) => getPostCommentaries(state, postId));

  return (
    <Stack alignItems="stretch" spacing={2}>
      {commentaries.map((commentary) => {
        const { id } = commentary;
        return <CommentaryListItemMemoized allTags={allTags} commentary={commentary} key={id} />;
      })}
    </Stack>
  );
};
