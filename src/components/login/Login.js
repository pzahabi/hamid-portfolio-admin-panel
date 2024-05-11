import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const userName = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [invalid, setInvalid] = React.useState(false);
  const [error, setError] = React.useState("");

  const baseApiUrl = process.env.REACT_APP_API_URL;
  const APIurl = `${baseApiUrl}/api/login`;

  const login = async (e) => {
    e.preventDefault();
    setInvalid(false);
    const user = {
      username: userName.current.value,
      password: password.current.value,
    };
    await axios
      .post(APIurl, user)
      .then((response) => {
        localStorage.setItem("token", response.headers.token);
        navigate("/admin", { replace: true });
      })
      .catch((err) => {
        setInvalid(true);
        setError(err);
      });
  };
  return (
    <>
      <div className="login-background">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input type="text" name="userName" required="" ref={userName} autoComplete="none" />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                required=""
                ref={password}
              />
              <label>Password</label>
            </div>
            {invalid ? (
              <span className="text-danger ltr invalid-message">
                {error.response.data}
              </span>
            ) : null}
            {/* <a  onClick={login} type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a> */}
            <button type="submit" onClick={e => login(e)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
