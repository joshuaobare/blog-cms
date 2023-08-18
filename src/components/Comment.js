export default function Comment(props) {
  return (
    <div className="Comment">
      <div>
        <div className="commenter">Anon</div>
        <div className="comment-text">{props.comment.text}</div>
        <div className="comment-date">
          {new Date(props.comment.timestamp).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
      <div>
        <form
          method="delete"
          onSubmit={(e) => props.deleteComment(e, props.id)}
        >
          <input type="hidden" />
          <button className="btn btn-danger delete-comment-btn">
            Delete Comment
          </button>
        </form>
      </div>
    </div>
  );
}
