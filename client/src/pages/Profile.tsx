import PublishedPostCard from '@/components/PublishedPostCard';
import { useAuthStore } from '@/store/authStore';
import { Text, Image, Card, Stack, Button, Flex, Box } from '@chakra-ui/react'
import useFetch from '../hooks/useFetch';
import UserPostDialogue from '@/components/PostDialogue';
import { api } from '@/Api';
import { useOptionStore, usePostStore, type PublishedPost } from '@/store/postStore';
import SearchOptions from '@/components/SearchOptions';
import LoadingScreen from '@/components/LoadingScreen';
import EmptyState from '@/components/EmptyState';

function ViewPostCard() { // custom postcard to display published posts
  const post = usePostStore((state) => state.currPost)
  if (!post) return <div>loading...</div>
  // const handleDelete = async () => {    // need to delete the post likes realtions before deleting the post
  //   try {
  //     const res = await api.delete(`/delete-post/${post.id}`);
  //     console.log(res.data);
  //     if (setOpen) {
  //       console.log("Closing dialog");
  //       setOpen(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     if (refetch) {
  //       refetch();
  //     }
  //   }
  // }
  return (
    <>
      <Card.Root maxWidth="full" overflow="hidden" borderWidth="2px" borderRadius="md" padding='2' borderColor="grey.300" boxShadow="md" >
        <Stack alignItems="center" justifyContent="center" marginTop="4" gap="8">
          <Text fontSize="4xl" fontWeight="bold">{post.title}</Text>
          {post.imageUrl && <Image src={post.imageUrl} alt={post.title} />}
          <Text fontSize="md">{post.description}</Text>
        </Stack >

      </Card.Root >
    </>
  )
}

function Profile() {
  const { user, logOut } = useAuthStore();;
  const q = useOptionStore((state) => state.q);
  const sort_by = useOptionStore((state) => state.sortBy);
  const order = useOptionStore((state) => state.order)
  const postsUrl = q.trim() ? "/search-user-posts" : "/published"

  const { data, loading, refetch } = useFetch<PublishedPost[]>(postsUrl, { sort_by, order, q })
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      logOut(); // user store function
    } catch (err) {
      console.log(err);
    }
  }




  return (
    <>

      <div className='min-h-screen'>
        <Flex alignItems="center"
          justifyContent="space-between"
          padding="4"
          margin="2"
          borderWidth="2px"
          borderColor="bg.inverted"
          borderRadius="md">
          <Text textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
          >Welcome, {user?.name || "user"}</Text>
          <Button variant="outline" bg="red.solid" color="bg" onClick={handleLogout}>Logout</Button>
        </Flex>

        <Text marginLeft="2" textAlign="center" fontWeight="semibold" fontSize="2xl">Your Published Posts</Text>
        <SearchOptions />

        {loading ? <LoadingScreen message="Loading posts or data please wait" /> : data && data.length > 0 ?
          <Box as="ul" className='p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' >
            {data.map((post) => (
              <UserPostDialogue key={post.id} post={post}
                usage="update" trigger={<PublishedPostCard post={post} />}
                refetch={refetch}
                DialogContent={ViewPostCard} />
            ))}
        </Box> : <EmptyState />
        }
      </div>
    </>

  )
}

export default Profile
