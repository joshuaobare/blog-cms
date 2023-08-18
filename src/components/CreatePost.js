import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    published: false,
    authorName: "",
  });

  const [authToken, setAuthToken] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    const userData = JSON.parse(localStorage.getItem("user"));
    setFormData((prevState) => ({ ...prevState, authorName: userData.name }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "radio" ? eval(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://lively-moon-2540.fly.dev/api/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      setFormData({
        title: "",
        text: "",
        published: false,
        authorName: "",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-post">
      <h1>Create Post</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChange}
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={formData.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <textarea
            className="form-control"
            type="text"
            name="text"
            id="text"
            value={formData.text}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <fieldset>
            <legend>published</legend>
            <label htmlFor="published">Yes</label>
            <input
              type="radio"
              onChange={handleChange}
              value={true}
              name="published"
              id="published"
            />
            <label htmlFor="unpublished">No</label>
            <input
              type="radio"
              value={false}
              name="published"
              id="unpublished"
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
