import { useCallback, type FC, type MouseEvent } from 'react';
import type { Post, User } from '@bbpl/common';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

export type PostListItemProps = {
  isSelected?: boolean;
  onClick?: (postId: number) => void;
  post: Post;
  user?: User | undefined;
};

export const PostListItem: FC<PostListItemProps> = (props) => {
  const {
    isSelected: isSelectd,
    onClick,
    post: { body, id, title },
    user,
  } = props;

  const handleCardClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (onClick) {
        onClick(id);
      }
    },
    [onClick, id],
  );

  return (
    <Card
      sx={{
        outline: (theme) => {
          return isSelectd ? `2px solid ${theme.palette.secondary.main}` : undefined;
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
