import { create } from "zustand";


interface Likes {
    userId: string;
    postId: number;
}
interface Author {
    name?: string;
    email: string
}

interface BasePost {
    id: number;
    title: string;
    description?: string;
    published: boolean;
    updatedAt: string;
    imageUrl?: string;
}

export interface HomePost extends BasePost {
    author: Author;
    Likes: Likes[]
}

export type DraftPost = BasePost;

export interface PublishedPost extends BasePost {
    Likes: Likes[]
}

export type OpenablePost = HomePost | DraftPost | PublishedPost;

interface PostState {
    posts: OpenablePost[] | null;
    currPost: OpenablePost | null;
    setPosts: (posts: OpenablePost[] | null) => void;
    setCurrPost: (post: OpenablePost | null) => void;
}


export const usePostStore = create<PostState>((set) => ({
    posts: [],
    currPost: null,
    setPosts: (posts: OpenablePost[] | null) => set({ posts }),
    setCurrPost: (post: OpenablePost | null) => set({ currPost: post })
}));

interface LikeState {
    likesByPost: Record<number, Likes[]>;
    setLikes: (postId: number, likes: Likes[]) => void;
    addLike: (like: Likes) => void;
    removeLike: (like: Likes) => void;
}


export const useLikeStore = create<LikeState>((set) => ({
    likesByPost: {},
    setLikes: (postId: number, likes: Likes[]) => set((state) => ({
        likesByPost: state.likesByPost[postId]
            ? state.likesByPost
            : { ...state.likesByPost, [postId]: likes },
    })),
    addLike: (like: Likes) => set((state) => {
        const currentLikes = state.likesByPost[like.postId] ?? [];
        const alreadyLiked = currentLikes.some(
            (item) => item.userId === like.userId && item.postId === like.postId,
        );

        if (alreadyLiked) return state;

        return {
            likesByPost: {
                ...state.likesByPost,
                [like.postId]: [...currentLikes, like],
            },
        };
    }),
    removeLike: (like: Likes) => set((state) => ({
        likesByPost: {
            ...state.likesByPost,
            [like.postId]: (state.likesByPost[like.postId] ?? []).filter(
                (item) => !(item.userId === like.userId && item.postId === like.postId),
            ),
        },
    })),
}));
