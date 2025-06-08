import { AppState } from "@/types/app-state";
import { Message } from "@/types/message";
import { Post, PostSlice } from "@/types/post";
import { StateCreator } from "zustand";

export const createPostSlice: StateCreator<AppState, [], [], PostSlice> = (
  set,
  get,
) => ({
  posts: [],

  addPost: (content, imageUrl) => {
    const { currentUserId, posts } = get();
    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUserId,
      content,
      imageUrl,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
    };
    set({ posts: [newPost, ...posts] });
  },

  likePost: (postId) => {
    const { currentUserId, posts, addNotification } = get();

    const updatedPosts = posts.map((post) => {
      if (post.id !== postId) return post;

      const hasLiked = post.likes.includes(currentUserId);
      const newLikes = hasLiked
        ? post.likes.filter((id) => id !== currentUserId)
        : [...post.likes, currentUserId];

      if (!hasLiked && currentUserId !== post.userId) {
        addNotification(post.userId, {
          actorId: currentUserId,
          type: "like",
        });
      }

      return { ...post, likes: newLikes };
    });

    set({ posts: updatedPosts });
  },

  commentOnPost: (postId, text) => {
    const { currentUserId, posts, addNotification } = get();

    const comment: Message = {
      id: Date.now().toString(),
      userId: currentUserId,
      text,
      createdAt: new Date().toISOString(),
    };

    const updatedPosts = posts.map((post) => {
      if (post.id !== postId) return post;

      if (post.userId !== currentUserId) {
        addNotification(post.userId, {
          actorId: currentUserId,
          type: "comment",
        });
      }

      return { ...post, comments: [...post.comments, comment] };
    });

    set({ posts: updatedPosts });
  },
});
