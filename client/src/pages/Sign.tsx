import React, { useState } from 'react'
import { Button, Card, Field, Input, Stack, Text } from '@chakra-ui/react'
import { api } from '../Api'
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
type SignInBody = {
    name?: string,
    email: string,
    password: string
}
type mode = "signin" | "signup";

function Sign() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<mode>("signup");
    // const { user, login } = useAuth();
    const setUser = useAuthStore((state) => state.setUser)
    const [formData, setFormData] = useState<SignInBody>({
        name: "",
        email: "",
        password: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        let res;
        try {
            if (mode === "signin") {
                res = await api.post("/signin", formData)
            }
            else {
                res = await api.post("/signup", formData);
            }
            // context
            setUser(res.data.user);
            console.log(res.data)

            // resetting form
            setFormData({
                name: "",
                email: "",
                password: ""
            })

            navigate("/profile")

        } catch (err) {
            console.log(err);
        }

    }
    // useEffect(() => {
    //     if (user) {
    //         navigate("/home");
    //     }
    // }, [user])
    // const isSignUp = mode === "signup";

    return (
        <Card.Root maxWidth="md" margin="4" mx="auto" borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="md">
            <Card.Header>
                <Card.Title textAlign="center">
                    {mode === "signup" ? "Create an account" : "Welcome back"}
                </Card.Title>
                <Card.Description textAlign="center">
                    {mode === "signup" ? "Sign up to get started" : "Sign in to continue"}
                </Card.Description>
            </Card.Header>

            <form onSubmit={handleSubmit}>
                <Card.Body>
                    <Stack gap="4" w="full">
                        {mode === "signup" &&
                            <Field.Root required>
                                <Field.Label>Name</Field.Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                />
                            </Field.Root>
                        }

                        <Field.Root required>
                            <Field.Label>Email</Field.Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                        </Field.Root>

                        <Field.Root required>
                            <Field.Label>Password</Field.Label>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                        </Field.Root>
                    </Stack>
                </Card.Body>

                <Card.Footer flexDirection="column" gap="3">
                    <Button type="submit" width="full">
                        {mode === "signup" ? "Sign up" : "Sign in"}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                    >
                        <Text>
                            {mode === "signup" ? "Already registered? Sign in" : "Need an account? Sign up"}
                        </Text>
                    </Button>
                </Card.Footer>
            </form>
        </Card.Root>
    )
}

export default Sign
