import { Card, Stack, Text, Image} from "@chakra-ui/react";
import { useEffect } from "react";
import { api } from "@/Api";
import LikeButton from "@/components/LikeButton";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch"
import { useAuthStore } from "@/store/authStore";
import type { HomePost } from "@/store/postStore";

type fetchPost = {
  post: HomePost;
}
const PostPage = () => {
    const {id} = useParams();
    const { data, loading} = useFetch(`/posts/${id}`)
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
   let post;
   if (data) {
       const d = data as fetchPost;
       post = d.post;
    }
    useEffect(() => { // setting user on first landing 
    if (user) {
      return;
    }
    const getMe = async () => {
      try {
        const res = await api.get("/me");
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (err) { 
          // console.log(err)
      }
    }
    getMe();
   },[])
   if (loading) return <div>loading...</div>
   if (!post) return  <div>No post found</div>

   
  return (
  <Card.Root
    maxW="full"
    overflow="hidden"
    borderWidth="2px"
    bg="bg.panel"
    borderRadius="md"
    margin="3"
    padding={{ base: "2", md: "4" }}
    borderColor="bg.subtle"
    boxShadow="md"
  >
    <Stack
      width="full"
      alignItems="center"
      justifyContent="center"
      marginTop={{ base: "2", md: "4" }}
      gap={{ base: "3", md: "4" }}
    >
      <Text
        width="full"
        textAlign="center"
        fontSize={{ base: "xl", md: "4xl" }}
        fontWeight="bold"
        overflowWrap="anywhere"
      >
        {post.title}
      </Text>
      <Text
        width="full"
        textAlign="center"
        fontSize="md"
        fontWeight="semibold"
        overflowWrap="anywhere"
      >
        {post.author.name || "user"} - {post.author.email}
      </Text>
      {post?.imageUrl && (
        <Image
          src={post.imageUrl}
          alt={post.title}
          width="full"
          maxW="100%"
          maxH={{ base: "35vh", md: "55vh" }}
          objectFit="contain"
        />
      )}
      <Text textAlign="left" width="full" fontSize="lg" overflowWrap="anywhere" whiteSpace="pre-line">
        {post.description && post.description}
      </Text>
      <LikeButton post={post} />
    </Stack>
  </Card.Root>
  )
}

export default PostPage