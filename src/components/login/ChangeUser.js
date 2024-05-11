import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const ChangeUser = () => {
  const baseApiUrl = process.env.REACT_APP_API_URL;
  const APIurl = `${baseApiUrl}/api/users`;

  const newUsername = useRef();
  const newPassword = useRef();
  const oldUsername = useRef();
  const oldPassword = useRef();

  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    setIsUploading(true);
    e.preventDefault();
    const user = {
      newUsername: newUsername.current.value,
      newPassword: newPassword.current.value,
      oldUsername: oldUsername.current.value,
      oldPassword: oldPassword.current.value,
    };
    await axios
      .put(APIurl, user)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("token", response.headers.token);
        navigate("/admin", { replace: true });
      })
      .catch((err) => {
        setInvalid(true);
        setError(err);
      }).finally(() => {
        setIsUploading(false);
      })
  };
  return (
    <>
      <div className="container-fluid row ltr">
        <div className="col-md-2"></div>
        <form className="col-md-6">
          {/* <input type="hidden" name="id" ref={idRef} /> */}
          <div className="m-2">
            <label htmlFor="oldUsername" className="form-label">
              Old username :
            </label>
            <input
              name="oldUsername"
              ref={oldUsername}
              className="form-control"
              type="text"
            />
          </div>
          <div className="m-2">
            <label htmlFor="username" className="form-label">
              New username :
            </label>
            <input
              name="username"
              ref={newUsername}
              className="form-control"
              type="text"
            />
          </div>
          <div className="m-2">
            <label htmlFor="oldPassword" className="form-label">
              Old password :
            </label>
            <input
              name="oldPassword"
              ref={oldPassword}
              className="form-control"
              type="password"
            />
          </div>
          <div className="m-2">
            <label htmlFor="password" className="form-label">
              New password :
            </label>
            <input
              name="password"
              ref={newPassword}
              className="form-control"
              type="password"
            />
          </div>
          {invalid ? (
            <span className="text-danger ltr invalid-message">
              {error.response.data}
            </span>
          ) : null}
          <div className="m-4 pt-4 me-2">
            <button disabled={isUploading ? true : false} className="btn btn-primary" onClick={e => submit(e)}>
              change
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
