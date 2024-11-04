import { getInstance } from "@/api/apiClient";
import { formattedError } from "@/utils/formattedError";

export interface IPost {
  id: string;
  title: string;
  description: string;
  community: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  user: {
    id: string;
    username: string;
  };
  _count: {
    Comments: number;
  };
}

export interface ICreatePost {
  title: string;
  description: string;
  community: string;
  authorId: string;
}

export interface IUpdatePost {
  id: string;
  title: string;
  description: string;
  community: string;
  authorId: string;
}

export interface IPostSearch {
  title: string;
  community: string[];
}

export async function getPosts(query: IPostSearch) {
  try {
    const { data } = await getInstance().get("/post", {
      params: {
        title: query.title,
        community: query.community[0],
      },
    });
    return data;
  } catch (error) {
    return formattedError(error);
  }
}

export async function getPostById(postId: string) {
  try {
    const { data } = await getInstance().get(`/post/${postId}`);
    return data;
  } catch (error) {
    return formattedError(error);
  }
}

export async function createPost(body: ICreatePost) {
  try {
    const { data } = await getInstance().post("/post", body);
    return data;
  } catch (error) {
    return formattedError(error);
  }
}

export async function deletePost(postId: string) {
  try {
    const userId = localStorage.getItem("userId");
    const { data } = await getInstance().delete(`/post/${postId}`, {
      data: {
        userId,
      },
    });
    return data;
  } catch (error) {
    return formattedError(error);
  }
}

export async function updatePost(body: IUpdatePost) {
  try {
    const test = {
      title: body.title,
      description: body.description,
      community: body.community,
      authorId: body.authorId,
      userId: body.authorId,
    };
    const { data } = await getInstance().patch(`/post/${body.id}`, test);
    return data;
  } catch (error) {
    return formattedError(error);
  }
}
