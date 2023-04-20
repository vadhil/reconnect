import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Post as IPost} from './main'
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
interface Props {
    post: IPost

}
interface Likes {
    userId: string
    likeId: string
}

export const Post = (props: Props) => {
    const {post} = props;
    const [user] = useAuthState(auth);


    // const [likeAmount, setLikeAmount] = useState<number | null> (null);
    const [likes, setLikes] = useState<Likes[] | null> (null);



    const likesRef = collection( db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    }

    const addLike = async () => {
        try{
        const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id});

        if (user) {
        setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}]);
        }
        } catch (err) {
        console.log(err);
        }
        };

        const removeLike = async () => {
            try{
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), 
            where("userId", "==", user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId)
            await deleteDoc(likeToDelete);
    
            if (user) {
            setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
            
            }} catch (err) {
            console.log(err);
            }
            };

    useEffect(() =>{
    getLikes()
    }, []);

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    return <div className='container mx-auto col-12 col-lg-6 border p-3 m-3 rounded bg-light shadow-sm'>
        <div className="row ">
            <div className="row-col">
            <h4 className='col text-start text-danger'>{post.username}</h4>
            <h5 className='col '>{post.title}</h5>
            </div>
            <p className='col lead'>{post.description}</p>
            <button onClick={hasUserLiked?  removeLike: addLike} className='btn '> 
            {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
            </button>
            {likes && <p>likes: {likes?.length} </p>}
        </div>
    </div>
} 