import {
    Card, Input, Stack, Field,
    Textarea, FileUpload, RadioCard,
    HStack, Button, Image
} from "@chakra-ui/react"
import { useState } from "react"
import { HiUpload } from 'react-icons/hi'
import { api } from "@/Api";
import axios, { AxiosError } from "axios";
import type { DialogContextProps } from "@/components/PostDialogue"
import { usePostStore, type DraftPost } from "@/store/postStore";
import { toaster } from "./ui/toaster";
import type { errorType } from "@/store/errorStore";

type PostFromCardProps = DialogContextProps



function PostFormCard({ refetch, usage, setOpen }: PostFromCardProps) {
    const { currPost: post } = usePostStore();
    const [image, setImage] = useState<File | null>(null);
    const initialData: DraftPost = {
        id: -1,
        title: "",
        published: false,
        updatedAt: ""
    }
    const [data, setData] = useState<DraftPost>(post || initialData);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("published", data.published ? "publish" : "draft");

        if (data.description) {
            formData.append("description", data.description);
        }
        if (image) {
            formData.append("image", image);
        }
        try {
            if (usage === "create") {
                await api.post("/new-post", formData);
            } else {
                await api.put(`/update-post/${data.id}`, formData);
            }
            // console.log(res.data);
            if (setOpen) {
                setOpen(false);
            }
            // call the refetch function to refresh the data
            if (refetch) {
                refetch();
            }
            toaster.create({
                title: "Post created Successfully",
                type: "success"
            })
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const Error: errorType = err.response?.data;
                toaster.create({
                    title: Error.message,
                    description: Error.errCode,
                    type: "error"
                })
            } else {
                console.error(err);
            }

        }
    }
    const handleDelete = async () => {
        try {
            await api.delete(`/delete-post/${data.id}`);
            // console.log(res.data);

            if (setOpen) {
                console.log("Closing dialog");
                setOpen(false);
            }
            toaster.create({
                title: "post has been deleted",
                type: "success"
            })
        } catch (err) {
            // console.log(err);
            if (err instanceof AxiosError) {
                const Error: errorType = err.response?.data;
                toaster.create({
                    title: Error.message,
                    description: Error.errCode,
                    type: "error"
                })
            }
        } finally {
            if (refetch) {
                refetch();
            }
        }
    }
    return (
        <Card.Root
            maxWidth="100vw"
            margin="2"
            bg="bg.muted"
            borderWidth="1px"
            borderColor="border.emphasized" borderRadius="md"
            boxShadow="md" overflow="hidden">
            <Card.Header>
                <Card.Title textAlign="center">{usage === "create" ? "Create" : "Update"}  Post</Card.Title>
            </Card.Header>
            <Card.Body>
                <Stack gap="3" w="full">
                    <Field.Root >
                        <Field.Label>
                            <Field.RequiredIndicator />
                            Post Title
                        </Field.Label>
                        <Input placeholder="Enter post title"
                            name="title"
                            value={data.title}
                            onChange={handleChange} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Description</Field.Label>
                        <Textarea placeholder="Enter post description"
                            name="description"
                            value={data.description}
                            onChange={handleChange} />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Upload an Image for Post</Field.Label>
                        <HStack
                            width="full"
                            align="stretch"
                            flexWrap="wrap"
                            gap="2"
                        >
                            <FileUpload.Root accept={["image/*"]}
                                onFileChange={(e) => { setImage(e.acceptedFiles[0] ?? null) }}>
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload /> Upload file
                                    </Button>
                                </FileUpload.Trigger>
                                <FileUpload.List />
                            </FileUpload.Root>
                            {data.imageUrl && <Image width="12" height="12" src={data.imageUrl} alt="Selected file" />}
                        </HStack>
                    </Field.Root>
                    <Field.Root >
                        <Field.Label>Save as Draft?</Field.Label>
                        <RadioCard.Root value={data.published ? "publish" : "draft"}
                            onValueChange={(e) => {
                                if (e.value === null) return;
                                setData((prev) => ({
                                    ...prev,
                                    published: e.value === "publish" ? true : false,
                                }));
                            }}
                            name="published">
                            <HStack
                                width="full"
                                align="stretch"
                                flexWrap="wrap"
                                justifyContent="space-between"
                                gap="2"
                            >
                                <RadioCard.Item value="draft" >
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        <RadioCard.ItemText>Yes</RadioCard.ItemText>
                                        <RadioCard.ItemIndicator />
                                    </RadioCard.ItemControl>
                                </RadioCard.Item>
                                <RadioCard.Item value="publish">
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        <RadioCard.ItemText>No</RadioCard.ItemText>
                                        <RadioCard.ItemIndicator />
                                    </RadioCard.ItemControl>
                                </RadioCard.Item>
                            </HStack>
                        </RadioCard.Root>
                    </Field.Root>
                </Stack>
            </Card.Body>
            <Card.Footer flexWrap="wrap" justifyContent="flex-end" gap="2">
                <Button onClick={handleSubmit} variant="solid">{data.published ? "Publish" : "Draft"}</Button>
                {usage === "update" && <Button variant="outline" color="red.400" onClick={handleDelete}>Delete</Button>}
            </Card.Footer>
        </Card.Root >
    )
}



export default PostFormCard;
