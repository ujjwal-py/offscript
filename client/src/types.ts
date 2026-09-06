export type User = {
    id: string,
    name: string,
    email: string,
    joined: string
}


export type UserPost = {
    id: number,
    title: string,
    description?: string,
    published: boolean,
    last_updated: string,
}
