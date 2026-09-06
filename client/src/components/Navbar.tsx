import { Link } from 'react-router-dom'

function Navbar() {
    // const navigate = useNavigate();
    return (
        <div className='bg-blue-950 text-2xl text-white font-mono p-2'>
            <div className='flex  gap-8'>
                <Link to="/home">Home</Link>
                <Link to="/auth">Sign Up</Link>
                <Link to="/my-posts">My Posts</Link>
                <Link to="/profile">Profile</Link>


            </div>
        </div>
    )
}

export default Navbar