import { memo, type FC } from 'react';
import type { Commentary } from '@bbpl/common';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import SendIcon from '@mui/icons-material/Send';

export type CommentaryListItemProps = {
  commentary: Commentary;
};

export const CommentaryListItem: FC<CommentaryListItemProps> = (props) => {
  const {
    commentary: { name, email, body },
  } = props;

  return (
    <Card>
      <CardHeader title={name} />
      <CardContent>{body}</CardContent>
      <CardActions>
        <Button
          color="secondary"
          endIcon={<SendIcon />}
          href={`mailto:${email}`}
          variant="outlined"
        >
          {email.toLowerCase()}
        </Button>
      </CardActions>
    </Card>
  );
};

export const CommentaryListItemMemoized = memo(CommentaryListItem);
