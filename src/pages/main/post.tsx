import { Post as IPost} from './main'
interface Props {
    post: IPost

}

export const Post = (props: Props) => {
    const {post} = props
    return <div className='container mx-auto col-12 col-lg-6 border p-3 m-3 rounded bg-light shadow-sm'>
        <div className="row ">
            <div className="row-col">
            <h4 className='col text-start text-danger'>{post.username}</h4>
            <h5 className='col '>{post.title}</h5>
            </div>
            <p className='col lead'>{post.description}</p>
            <button className='btn '>&#128077;</button>
        </div>
    </div>
} 