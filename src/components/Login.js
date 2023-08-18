import { useState, useEffect } from "react";

export default function Login(props) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    
  };

  

  return (
    <div className="login">
      <h1>Login Page</h1>
      {!props.loggedIn ? 

      <form action="" method="post" className="login-form" onSubmit={(e) => props.loginHandleSubmit(e, userData)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            onChange={handleChange}
            value={userData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={userData.password}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form> :
      
      <div>You are already logged in...</div>
      
      }
    </div>
  );
}
