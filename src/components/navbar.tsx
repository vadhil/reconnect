import { Link } from 'react-router-dom'
import {auth} from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';

import { useNavigate} from "react-router-dom";



export const Navbar = () => {
const navigate = useNavigate() 

    const [user] = useAuthState(auth)
    const signUserOut = async () => {
        await signOut(auth);
        navigate('/login')
    }
    return <div>

<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">RE-connect</a>
    <div className="text-danger  d-inline-block">
        <Link className='none btn btn-warning mr-5 align-self-center' to="/"> Home</Link>
        <Link className='none btn btn-info ml-3 ' to="/login"> Login</Link>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

.       <div className="">
           {user && (
                <div className="container bg- warning">
                    <div className="row bg-dark text-white p-3 rounded">
                        <img className='col-2 col-lg-1 img-fluid' src={user?.photoURL || ""} width="100" />
                        <div className="row-col-1 col justify-content-start align-items-center">
                            <h4 className='col-4 text-start'>{user?.displayName}</h4>
                             <p className=' lead col ms-auto text-start' >{user?.email}</p>
                        </div>
                        <button className=' col-3 col-lg-1 align-self-center btn btn-danger ml-0' onClick={signUserOut}> log out</button>
                    </div>
                    <div className="bg-dark row justify-content-start ml-3 mt-2 ">

                    </div>

                </div>
            )}
        </div>
    </div>
}