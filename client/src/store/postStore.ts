import { create } from "zustand";


interface Likes {
    userId: string;
    postId: number;
}
interface Author {
    name?: string;
    email: string
}

export interface HomePost {
    id: number;
    title: string;
    description?: string;
    published: boolean;
    updatedAt: string;
    imageUrl?: string;
    author: Author;
    Likes: Likes[]
}

export interface DraftPost {
    id: number;
    title: string;
    description?: string;
    published: boolean;
    updatedAt: string;
    imageUrl?: string
}

interface PostState {
    posts: HomePost[] | null;
    currPost: HomePost | null;
    setPosts: (posts: HomePost[] | null) => void;
    setCurrPost: (post: HomePost | null) => void;
}


export const usePostStore = create<PostState>((set) => ({
    posts: [],
    currPost: null,
    setPosts: (posts: HomePost[] | null) => set({ posts }),
    setCurrPost: (post: HomePost | null) => set({ currPost: post })
}));

// const initialPost: DraftPost = {
//     id: -1,
//     title: "",
//     description: "",
//     published: false,
//     updatedAt: ""
// }

// export const useDraftPostStore = create<PostState<DraftPost>>((set) => ({
//     posts: [],
//     currPost: initialPost,
//     setPosts: (posts: DraftPost[]) => set({ posts }),
//     setCurrPost: (post: DraftPost) => set({ currPost: post })
// }))
