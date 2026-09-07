import { Link } from 'react-router-dom'

function Navbar() {
    // const navigate = useNavigate();
    return (
        <div className='flex justify-between font-tech bg-blue-950 text-2xl rounded-lg  border-blue-400  text-white  p-2'>
            <div className='flex  gap-12'>
                <Link to="/home">Home</Link>
                <Link to="/my-posts">Create </Link>
            </div>
            <div>
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    )
}

export default Navbar