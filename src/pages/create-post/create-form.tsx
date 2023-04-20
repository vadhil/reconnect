import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {addDoc, collection} from 'firebase/firestore'
import {auth, db} from "../../config/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate} from "react-router-dom";


interface CreateFormData {
    title: string;
    description: string
}
export const CreateForm = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate() 


    const schema = yup.object().shape({
        title: yup.string().required('you must input title'),
        description: yup.string().required('you must input descrition')
    })

    const {register, handleSubmit, formState: { errors },} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })
    const postsRef = collection( db, "posts")
    const onCreatePost = async (data: any) => {
            await addDoc(postsRef, {
                // title: data.title,
                // description: data.description,
                ...data,
                username: user?.displayName,
                userId: user?.uid,
            })
            navigate('/')
            
    }
    return ( <>
        <h3 className='display-5 fw-bolder mb-3'>post a status</h3>

    <div className="col-8 mx-auto bg-light col-lg-3 shadow border p-3 rounded">
        <form onSubmit={handleSubmit(onCreatePost)} action="" className='d-flex gap-1 flex-column justify-content-center align-items-center'>
            <input className='w-50 form-control' type="text" placeholder='title...' {...register("title")}/>
            { errors? <p  className='text-danger'>{errors.description?.message}</p>   : <p className="d-none"></p>        }
            {/* <p className='text-danger'>{errors.title?.message}</p> */}
            <textarea  className='col-8 form-control height ' placeholder='description'{...register("description")} />
            { errors? <p  className='text-danger'>{errors.description?.message}</p>   : <p className="d-none"></p>        }
            <input className='col btn btn-success' type="submit"/>
        </form>
    </div>
    </>

    )
}
