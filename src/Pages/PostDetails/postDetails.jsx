import { useLoaderData } from "react-router-dom"

const PostDetails=()=>{
    const post=useLoaderData()
    const {id,authorname,postdescription, image,authoremail,posttitle,tags}=post
    return(
<div>
      <h2>{posttitle}</h2>
      <img src={image} alt={posttitle} />
      <p>{postdescription}</p>
      {/* <VoteSection postId={_id} upvote={post.upvote} downvote={downvote} /> */}
      {/* <CommentSection postId={_id} />
      <ShareButton postId={_id} /> */}
    </div>
    )
}
export default PostDetails