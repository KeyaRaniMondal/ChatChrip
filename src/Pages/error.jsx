import { Link } from 'react-router-dom'
import error from '../assets/error.jpg'
import { FaCircleArrowLeft } from 'react-icons/fa6'
const Error = () => {
    return (
        <div style={{
            backgroundImage: `url(${error})`,
            width: "100vw",
            height: "100vh",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Link to={'/'}>
            <div className='pt-24 gap-2 flex justify-center mx-auto text-center text-2xl font-bold text-white'>
            <FaCircleArrowLeft className='mt-1'/>
            <h2>Return to Home Page</h2>
            </div>
            </Link>
        </div>
    )
}
export default Error