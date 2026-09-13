import { Link } from 'react-router-dom'
import { Card, Flex, HStack, Text } from '@chakra-ui/react'

function Navbar() {
    // const navigate = useNavigate();
    return (
        <Card.Root
            maxWidth="full"
            padding="2"
            margin="2"
            height="50px"
            color="white"
            marginBottom="2"
            borderWidth="2px"
            borderColor="bg.inverted"
            boxShadow="md"
            borderRadius="md">


            <Card.Title >
                <Flex justifyContent="space-between" alignItems="center">
                    <Flex gap="8" alignItems="center">
                        <Link to="/home"><Text fontSize="xl" fontWeight="semibold" color="bg.inverted">Home</Text></Link>
                        <Link to="/my-posts"><Text fontSize="xl" fontWeight="semibold" color="bg.inverted">Create</Text></Link>
                    </Flex>

                    <Link to="/profile"><Text fontSize="xl" fontWeight="semibold" color="bg.inverted">Profile</Text></Link>
                </Flex>



            </Card.Title>



        </Card.Root>
    )
}

export default Navbar