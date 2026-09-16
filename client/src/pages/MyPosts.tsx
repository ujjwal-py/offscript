import useFetch from '../hooks/useFetch';
import { Text } from '@chakra-ui/react';
import DraftedPostCard from '@/components/DraftedPostCard';
import PostFormCard from '@/components/PostFormCard';
import UserPostDialogue from '@/components/PostDialogue';
import type { DraftPost } from '@/store/postStore';

function MyPosts() {
    const { data, loading, refetch } = useFetch<DraftPost[]>("/drafts");

    return (
        <div>
            <PostFormCard refetch={refetch} usage="create" />

            {/* display posts  */}

            {/* drafted posts */}
            <div>
                <Text textAlign="center" fontSize="3xl" fontWeight="bold"> Drafted Posts</Text>
                {loading === false ?
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data?.map((post) => (
                            <UserPostDialogue key={post.id}
                                trigger={<DraftedPostCard post={post} />}
                                usage="update"
                                post={post} // infers the type generic 
                                refetch={refetch}
                                DialogContent={PostFormCard}

                            >
                            </UserPostDialogue>
                        ))}
                    </ul> : <h3 color="white">hold tight, fetching your drafts</h3>
                }

            </div>



        </div>
    )
}

export default MyPosts