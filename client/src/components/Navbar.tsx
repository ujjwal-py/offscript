import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

function Navbar() {
    // const navigate = useNavigate();
    return (
        <Box bg="blueviolet"
            width="100%"
            height="12"
            padding="4"
            color="white"
            borderWidth="1px"
            borderColor="blue.500"
            borderRadius="md">

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