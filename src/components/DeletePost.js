export default function DeletePost(props) {
  return (
    <dialog open={props.deleteDialogOpen ? "open" : false}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Post</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.dialogToggle}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete post?</p>
          </div>
          <div className="modal-footer delete-modal-btn-cont">
            <button
              type="button"
              className="btn btn-danger"
              onClick={props.deletePost}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.dialogToggle}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
