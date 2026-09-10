import { useEffect, useState } from 'react'
import type { UserPost } from '../types';
import useFetch from '../hooks/useFetch';
import { Text } from '@chakra-ui/react';
import DraftedPostCard from '@/components/DraftedPostCard';
import PostFormCard from '@/components/PostFormCard';
import PostDialogue from '@/components/PostDialogue';

// type newPost = {
//     title: string,
//     description?: string,
//     published: "draft" | "publish"
// }


function MyPosts() {
    const postData = {
        id: -1,
        title: "",
        description: "",
        published: false,
        updatedAt: "",
        imageUrl: null
    }
    const { data, loading, refetch } = useFetch<UserPost[]>("/drafts");
    const [refresh, setRefresh] = useState<boolean>(false);
    // console.log(loading);
    useEffect(() => {
        refetch();
    }, [refresh]);



    return (
        <div>
            <PostFormCard post={postData} setRefresh={setRefresh} usage="create" />

            {/* display posts  */}

            {/* drafted posts */}
            <div>
                <Text textAlign="center" fontSize="3xl" fontWeight="bold"> Drafted Posts</Text>
                {loading === false ?
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data?.map((post) => (
                            <PostDialogue key={post.id} post={post}>
                                <DraftedPostCard post={post} />
                            </PostDialogue>
                        ))}
                    </ul> : <h3 color="white">hold tight, fetching your drafts</h3>
                }

            </div>



        </div>
    )
}

export default MyPosts