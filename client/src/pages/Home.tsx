import PostCard from '@/components/PostCard';
import useFetch from '../hooks/useFetch';
import type { Post } from '@/types';


function Home() {
    const { data, loading } = useFetch<Post[]>("/posts");
    console.log(data);



    return (
        <div>
            <h1 className='text-4xl text-black'>Top Posts</h1>
            {!loading ? <ul>
                {data?.map((post) => (

                    <PostCard key={post.id} post={post} />

                ))}
            </ul>
                :
                <h2>Hold on we are fetching posts</h2>}

        </div>
    )



}

export default Home