import { Link } from 'react-router-dom'
import {auth} from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

export const Navbar = () => {
    const [user] = useAuthState(auth)
    const signUserOut = async () => {
        await signOut(auth);
        // navigate('/login')
    }
    return <div>
        <Link to="/"> Home</Link>
        <Link to="/login"> Login</Link>

.       <div className="">
           {user && (
                <div className="">
                <p>{user?.displayName}</p>
                <p>{user?.email}</p>
                <img src={user?.photoURL || ""} width="100" height="100"/>
                <button onClick={signUserOut}> log out</button>
                </div>
            )}
        </div>
    </div>
}