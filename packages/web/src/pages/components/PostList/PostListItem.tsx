import type { FC } from 'react';
import type { Post, User } from '@bbpl/common';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

export type PostListItemProps = {
  post: Post;
  user?: User | undefined;
};

export const PostListItem: FC<PostListItemProps> = (props) => {
  const {
    post: { body, title },
    user,
  } = props;

  return (
    <Card>
      <CardHeader title={title} subheader={user?.username} />
      <CardContent>{body}</CardContent>
    </Card>
  );
};
