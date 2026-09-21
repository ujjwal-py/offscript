import { Link } from 'react-router-dom'
import { Button, Card, Flex, Text, Box } from '@chakra-ui/react'
import { useThemeStore } from '@/store/themeStore'
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";



function Navbar() {
    // const navigate = useNavigate();
    const { theme, setTheme } = useThemeStore();

    return (
        <Box bg="bg" color="fg" padding="2">

            <Card.Root
                maxW="full"
                padding="2"
                minHeight="50px"
                height="auto"
                color="white"
                borderWidth="2px"
                borderColor="bg.inverted"
                boxShadow="md"
                bg="bg.emphasized"
                borderRadius="md">


                <Card.Title width="full">
                    <Flex
                        width="full"
                        gap="4"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Flex gap={{ base: "4", md: "8" }} alignItems="center">
                            <Link to="/home"><Text fontSize="xl" fontWeight="semibold" color="bg.inverted">Home</Text></Link>
                            <Link to="/my-posts"><Text fontSize="xl" fontWeight="semibold" color="bg.inverted">Create</Text></Link>
                        </Flex>
                        <Flex gap="8" alignContent="center" justifyContent="center">
                            <Button size="sm" borderRadius="full" onClick={() => {
                                setTheme(theme === "dark" ? "light" : "dark")
                            }}>{theme === "dark" ? <FiSun /> : <BsFillMoonStarsFill />}</Button>
                            <Link to="/profile"><Text fontSize="xl" fontWeight="semibold" color="bg.inverted">Profile</Text></Link>

                        </Flex>
                    </Flex>

                </Card.Title>

            </Card.Root>
        </Box>
    )
}

export default Navbar
