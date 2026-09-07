import useFetch from '../hooks/useFetch';

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
    const { data, loading } = useFetch<Post[]>("/posts");

    return (
        <div>
            <h1 className='text-4xl text-black'>Top Posts</h1>
            {!loading ? <ul>
                {data?.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <h3>{post.author.name} - {post.author.email}</h3>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
                :
                <h2>Hold on we are fetching posts</h2>}

        </div>
    )



}

export default Home