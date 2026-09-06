import React, { useEffect, useState } from 'react'
import { api } from '../Api';
import type { UserPost } from '../types';

type newPost = {
    title: string,
    description?: string,
    published: boolean
}

function NewPost() {
    const [data, setData] = useState<newPost>({
        title: "",
        description: "",
        published: false
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.target.name === "submit") {
            setData((prev) => ({
                ...prev,
                published: true
            }))
        }
        try {
            const res = await api.post("/new-post", data);
            setData({
                title: "",
                description: "",
                published: false
            })
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}
                className='grid grid-rows-3 gap-4 p-2 bg-cyan-600 text-white text-2xl '>
                <div className='grid grid-cols-2 '>
                    <label>Title</label>
                    <input type='text'
                        name="title"
                        value={data.title}
                        placeholder='title for your post'
                        onChange={handleChange}
                        className='bg-cyan-950' />
                </div>
                <div className='grid grid-cols-2 '>
                    <label>Description</label>
                    <input type='text'
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder='add a description for your post'
                        className='bg-cyan-950' />
                </div >
                <button type='submit' name='submit'
                    className='bg-cyan-950 cursor-pointer' >Publish
                </button>
                <button type='submit' name='save'
                    className='bg-cyan-950 cursor-pointer' >Save Draft
                </button>
            </form >
        </div>
    )
}

function Myposts() {
    const [data, setData] = useState<UserPost[]>([]);
    const [publishedPosts, setPublishedPosts] = useState<UserPost[]>([]);
    const [draftedPosts, setDraftedPosts] = useState<UserPost[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const reponse = await api.get('/user-posts');
                setData(reponse.data);
                setPublishedPosts(
                    data.filter((post) => post.published === true)
                )
                setDraftedPosts(
                    data.filter((post) => post.published === false)
                )
            } catch (err) {
                console.log(err);
                setData([]);
            }
        }

        fetchUserPosts();
    }, []);
    return (
        <div className='text-black'>
            <NewPost />

            {/* display posts  */}

            {/* drafted posts */}
            <div>
                <h2>Drafted Posts</h2>
                <ul>
                    {draftedPosts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <h4>{post.last_updated}</h4>
                            <p>{post.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* published post */}
            <div>
                <ul>
                    <h2>Published Posts</h2>
                    {publishedPosts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <h4>{post.last_updated}</h4>
                            <p>{post.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Myposts