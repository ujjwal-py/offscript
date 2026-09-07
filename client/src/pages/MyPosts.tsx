import React, { useEffect, useState } from 'react'
import { api } from '../Api';
import type { UserPost } from '../types';
import useFetch from '../hooks/useFetch';

type newPost = {
    title: string,
    description?: string,
    published: boolean
}

type Prop = {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

function NewPost(props: Prop) {
    const [data, setData] = useState<newPost>({
        title: "",
        description: "",
        published: false
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "published") {
            setData((prev) => ({
                ...prev,
                published: value === "publish"
            }))
        }
        else {
            setData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const postData = data;
            console.log(postData);
            const res = await api.post("/new-post", postData);
            setData({
                title: "",
                description: "",
                published: false
            })
            console.log(res.data);
            props.setRefresh((prev) => !prev);
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
                <div className='flex gap-6'>
                    <p>Save as draft?</p>
                    <label>Yes</label>
                    <input type='radio'
                        name='published'
                        value="draft"
                        checked={data.published === false}
                        onChange={handleChange} />
                    <label>No</label>
                    <input type='radio'
                        name='published'
                        value="publish"
                        checked={data.published === true}
                        onChange={handleChange} />
                </div>
                <button type='submit'
                    className='bg-cyan-950 cursor-pointer' >
                    {data.published ? "Publish Post" : "Save Draft"}
                </button>
            </form >
        </div>
    )
}

function MyPosts() {

    const { data, loading, refetch } = useFetch<UserPost[]>("/drafts");
    const [refresh, setRefresh] = useState<boolean>(false);
    // console.log(loading);
    useEffect(() => {
        refetch();
    }, [refresh]);


    return (
        <div className='text-black'>
            <NewPost setRefresh={setRefresh} />

            {/* display posts  */}

            {/* drafted posts */}
            <div>
                <h2 className='text-2xl'>Drafted Posts</h2>
                {loading === false ?
                    <ul className='p-2'>
                        {data?.map((post) => (
                            <li key={post.id} className='mt-2'>
                                <h3 className='font-bold'>{post.title}</h3>
                                <h4>{post.updatedAt}</h4>
                                <p>{post.description}</p>
                            </li>
                        ))}
                    </ul> : <h3>hold tight, fetching your drafts</h3>
                }

            </div>

            {/* published post */}

        </div>
    )
}

export default MyPosts