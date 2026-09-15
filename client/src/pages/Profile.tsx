import PublishedPostCard from '@/components/PublishedPostCard';
import { useAuthStore } from '@/store/authStore';
import { Text, Image, Card, Stack, Button, Flex } from '@chakra-ui/react'
import useFetch from '../hooks/useFetch';
import UserPostDialogue, { type DialogContextProps } from '@/components/UserPostDialogue';
import { api } from '@/Api';
import { usePostStore, type HomePost } from '@/store/postStore';
import { BASE_URL } from '@/config';

function ViewPostCard({ setOpen, refetch }: DialogContextProps) {
  const { currPost: post } = usePostStore();
  if (!post) return <div>loading...</div>
  const handleDelete = async () => {
    try {
      const res = await api.delete(`/delete-post/${post.id}`);
      console.log(res.data);
      if (setOpen) {
        console.log("Closing dialog");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (refetch) {
        refetch();
      }
    }
  }
  return (
    <>
      <Card.Root maxWidth="full" overflow="hidden" borderWidth="2px" borderRadius="md" padding='2' borderColor="grey.300" boxShadow="md" >
        <Stack alignItems="center" justifyContent="center" marginTop="4" gap="8">
          <Text fontSize="4xl" fontWeight="bold">{post.title}</Text>
          {post.imageUrl && <Image src={`${BASE_URL}${post.imageUrl}`} alt={post.title} />}
          <Text fontSize="md">{post.description}</Text>
        </Stack >
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline" bg="red" onClick={handleDelete} >Delete</Button>
        </Card.Footer>
      </Card.Root >
    </>
  )
}

function Profile() {
  const { user, logOut } = useAuthStore();
  const { data, loading, refetch } = useFetch<HomePost[]>("/published")


  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" padding="4" margin="2" borderWidth="1px" borderColor="gray.200">
        <Text textAlign="center" fontSize="2xl" fontWeight="bold">Welcome, {user?.name || "user"}</Text>
        <Button variant="outline" bg="red.solid" onClick={logOut}>Logout</Button>
      </Flex>

      <Text marginLeft="2" textAlign="center" fontWeight="semibold" fontSize="2xl">Your Published Posts</Text>

      {loading === false && data ?
        <ul className='p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data.map((post) => (
            <UserPostDialogue key={post.id} post={post}
              usage="view" trigger={<PublishedPostCard post={post} />}
              refetch={refetch}
              DialogContent={ViewPostCard} />
          ))}
        </ul> : <h3>hold tight,fetching your posts</h3>
      }
    </>
  )
}

export default Profile