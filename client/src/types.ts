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

export type Post = {
    id: number,
    title: string,
    description?: string,
    imageUrl: string | null,
    author: Author
}


export type AuthBody = {
    user: User | null,
    login: () => Promise<void>,
    logout: () => Promise<void>,
    loading: boolean
}