import React, { useEffect, useState } from 'react'
import { api } from '../Api';

type Author = {
    email: string,
    name?: string,
}

type Post = {
    id: number,
    title: string,
    description?: string,
    author: Author
}


function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const getPosts = async () => {
        try {
            const response = await api.get("/posts");
            setPosts(response.data);
            // console.log(response?.data);

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getPosts();
    }, []);
    return (
        <div>
            <h1 className='text-4xl'>All your posts are here</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <h3>{post.author.name} - {post.author.email}</h3>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home