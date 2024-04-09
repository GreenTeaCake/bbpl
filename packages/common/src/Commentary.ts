import type { Tag } from './Tag';

export type Commentary = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  tags?: Tag[];
  replies: string[];
};
