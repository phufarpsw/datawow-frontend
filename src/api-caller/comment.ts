import { getInstance } from "@/api/apiClient";
import { formattedError } from "@/utils/formattedError";

export interface IComment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
  };
}

export async function getCommentByPostId(postId: string) {
  try {
    const { data } = await getInstance().get(`/post/${postId}/comment`);
    return data;
  } catch (error) {
    return formattedError(error);
  }
}
