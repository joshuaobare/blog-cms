import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DeletePost from "./DeletePost";

export default function FullPost(props) {
  const [postData, setPostData] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [postId, setPostId] = useState("");
  const { id } = useParams();
  const [newComment, setNewComment] = useState({ text: "", postId: id });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate();
  const [commentDeleted, setCommentDeleted] = useState(false)

  const fetchPostData = async () => {
    const postResponse = await fetch(`https://lively-moon-2540.fly.dev/api/post/${id}`);
    const post = await postResponse.json();    
    console.log(post)
    setPostData(post.post);
    setPostComments(post.comments);
  };

  useEffect(() => {
    fetchPostData();
    setAuthToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    
  }, [postData, postComments])



  const handleChange = (e) => {
    setNewComment((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(id);
      const request = await fetch("https://lively-moon-2540.fly.dev/api/post/comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      const response = await request.json()
      console.log(response)
      setNewComment({ text: "", postId: id })
      fetchPostData()
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (e) => {
    try {
      const request = await fetch(`https://lively-moon-2540.fly.dev/api/post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const response = await request.json();
      console.log(response);
      setDeleteDialogOpen((prevState) => !prevState);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
   

  const deleteComment = async (e, commentId) => {        
    try {      
      const request = await fetch(`https://lively-moon-2540.fly.dev/api/post/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const response = await request.json();
      console.log(response);
      fetchPostData()
    } catch (err) {
      console.log(err);
    }
  }

useEffect(()=> {}, [commentDeleted])

  const dialogToggle = () => {
    setDeleteDialogOpen((prevState) => !prevState);
    
  };

  return (
    <div className="full-post">
      <h1>{postData.title}</h1>
      <div className="full-post-byline">
        <div>
          <b>{postData.authorName}</b>{" "}
          <span className="full-post-author-span">Contributor</span>{" "}
        </div>
        <div className="full-post-author-span">
          {new Date(postData.timestamp).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="full-post-edit-btn-cont">
        <Link to={`/posts/edit/${id}`}>
          <button className="btn btn-danger">Edit Post</button>
        </Link>
      </div>
      <p className="full-post-text">{postData.text}</p>
      <div className="full-post-edit-btn-cont">
        <button className="btn btn-danger" onClick={dialogToggle}>
          Delete Post
        </button>
      </div>
      <h3>Comments</h3>
      <div className="full-post-comments">
        {postComments.length !== 0 ? (
          postComments.map((comment) => (
            <Comment key={comment._id} id={comment._id} comment={comment} deleteComment={deleteComment} />
          ))
        ) : (
          <div>No Comments</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="full-post-form" method="post">
        <div className="form-group">
          <label htmlFor="text">
            <b>Add Comment</b>
          </label>
          <textarea
            onChange={handleChange}
            value={newComment.text}            
            className="form-control text"
            name="text"
            id="text"
          ></textarea>          
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>

      <DeletePost
        deleteDialogOpen={deleteDialogOpen}
        dialogToggle={dialogToggle}
        postId={id}
        deletePost={deletePost}
      />
    </div>
  );
}
