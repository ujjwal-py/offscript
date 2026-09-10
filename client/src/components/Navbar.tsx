import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

function Navbar() {
    // const navigate = useNavigate();
    return (
        <Box
            bg="gray.900"
            maxWidth="full"
            height="12"
            padding="2"
            color="white"
            borderWidth="2px"
            borderColor="gray.200"
            fontSize="xl"
            borderRadius="md"
            margin="2">


            <div className='flex justify-between'>
                <div className='flex mt-4 gap-8 '>
                    <Link to="/home">Home</Link>
                    <Link to="/my-posts">Create</Link>
                </div>
                <Link to="/profile">Profile</Link>

            </div>


        </Box>
    )
}

export default Navbar