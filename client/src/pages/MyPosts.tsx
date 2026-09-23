import useFetch from '../hooks/useFetch';
import { Text } from '@chakra-ui/react';
import DraftedPostCard from '@/components/DraftedPostCard';
import PostFormCard from '@/components/PostFormCard';
import UserPostDialogue from '@/components/PostDialogue';
import type { DraftPost } from '@/store/postStore';
import LoadingScreen from '@/components/LoadingScreen';
import EmptyState from '@/components/EmptyState';


function MyPosts() {
    const { data, loading, refetch } = useFetch<DraftPost[]>("/unpublished");



    return (
        <div>

            <PostFormCard refetch={refetch} usage="create" />

            {/* display posts  */}

            {/* drafted posts */}
            <div>
                <Text textAlign="center" fontSize="3xl" fontWeight="bold"> Drafted Posts</Text>
                {loading ? <LoadingScreen message="Loading posts or data please wait" /> : data && data.length > 0 ?
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
                    </ul> : <EmptyState message="No drafts or pending posts found." />
                }

            </div>



        </div>
    )
}

export default MyPosts
