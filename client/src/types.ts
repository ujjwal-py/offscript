export type User = {
    id: string,
    name: string,
    email: string,
    createdAt: string
}


export type UserPost = {
    id: number,
    title: string,
    description?: string,
    published: boolean,
    updatedAt: string,
    imageUrl: string | null
}

type Author = {
    email: string,
    name?: string,
}

type like = {
    userId: string
    postId: number
}


export type Post = {
    id: number,
    title: string,
    description?: string,
    imageUrl: string | null,
    author: Author,
    likes: like[]
}

export type PostCardProps = {
    post: Post
}

export type AuthBody = {
    user: User | null,
    login: () => Promise<void>,
    logout: () => Promise<void>,
    loading: boolean
}


export type ParamBody = {
    page?: number,
    limit?: number,
    order?: "asc" | "desc",
    sort_by?: "createdAt" | "updatedAt" | "likes" | "title",
    q?: string
}