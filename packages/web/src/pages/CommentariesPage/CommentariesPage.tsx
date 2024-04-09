import { type FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchCommentaries } from 'store/commentaries';
import { CommentaryList } from 'pages/components/CommentaryList';
import { getAllTags } from 'store/selectors';

function getPostId(id: string | undefined): number | null {
  if (id == null || id === '') {
    return null; // Post Id is empty
  }
  const postId = Number.parseInt(id, 10);
  if (Number.isNaN(postId)) {
    return null; // `Post Id is NaN
  }
  return postId;
}

export const CommentariesPage: FC = () => {
  const { id } = useParams();
  const postId = getPostId(id);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const allTags = useAppSelector(getAllTags);

  useEffect(() => {
    if (postId === null) {
      navigate('/posts');
    } else {
      void dispatch(fetchCommentaries(postId));
    }
  }, [postId, navigate, dispatch]);

  return postId == null ? null : <CommentaryList postId={postId} allTags={allTags} />;
};
