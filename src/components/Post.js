import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Post(props) {
  
  const fontStyle = {
    color: !props.post.published? "red": "green"
  }
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <div className="homepage-post-title">
            <Card.Title>{props.post.title}</Card.Title>
          </div>
          <Card.Subtitle className="mb-2 text-muted">            
            <div>{(new Date(props.post.timestamp)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</div>
            <div><b>{props.post.authorName}</b></div>
            <div style={fontStyle}>{props.post.published? "published" : "unpublished"}</div>
          </Card.Subtitle>
          <div className="homepage-post-text">
            <Card.Text>{props.post.text}</Card.Text>
          </div>

          <Link to={`/posts/post/${props.post._id}`}>
            <div>Read Post</div>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
