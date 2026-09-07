import { useAuth } from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import type { UserPost } from '../types';

function Profile() {
  const { user, logout } = useAuth();
  const { data, loading } = useFetch<UserPost[]>("/published")

  return (
    <>
      <div>
        <h2>User info</h2>
        <h3>{user?.name}</h3>
        <button onClick={logout} className='border-2 border-black text-2xl bg-blue-900 text-white'>logout</button>
        {loading === false && data ?
          <ul className='p-2'>
            {data.map((post) => (
              <li key={post.id} className='mt-2'>
                <h3 className='font-bold'>{post.title}</h3>
                <h4>{post.updatedAt}</h4>
                <p>{post.description}</p>
              </li>
            ))}
          </ul> : <h3>hold tight, fetching your posts</h3>
        }
      </div>
    </>
  )
}

export default Profile