import { useSelector } from 'react-redux'
import Post from '../components/Posts/Post';
import './Posts.css';

export default function Posts() {

  const filtersePosts = useSelector( (state) => state.post.filteredPosts)

  return (
    <>
    <div className='posts'>
    {filtersePosts.map((post, index) =>(<div key={index}> <Post post={post}/></div>))}
    </div>
     

    </>
  )
}
