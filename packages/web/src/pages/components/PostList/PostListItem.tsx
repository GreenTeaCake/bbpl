import { memo, useCallback, type FC, type MouseEvent } from 'react';
import type { Post, User } from '@bbpl/common';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useNavigate } from 'react-router-dom';

export type PostListItemProps = {
  isSelected?: boolean;
  post: Post;
  user?: User | undefined;
};

export const PostListItem: FC<PostListItemProps> = (props) => {
  const {
    isSelected,
    post: { body, id, title },
    user,
  } = props;

  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      navigate(`/posts/${id}/commentaries`);
    },
    [id, navigate],
  );

  return (
    <Card
      sx={{
        outline: (theme) => {
          return isSelected ? `2px solid ${theme.palette.secondary.main}` : undefined;
        },
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardHeader title={title} subheader={user?.username} />
        <CardContent>{body}</CardContent>
      </CardActionArea>
    </Card>
  );
};

export const PostListItemMemoized = memo(PostListItem);
