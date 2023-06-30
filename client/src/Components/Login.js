import React, { useState } from "react";
import "./form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LoginData),
    });
    console.log(LoginData);
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      toast.error("Enter Valid credentials");
    }

    if (json.success) {
      localStorage.setItem("userToken", JSON.stringify(json.authToken));
      toast.success("succesfully logged in");
      setTimeout(() => {
        navigate("/dog-breeds");
      }, 5000);
    }
  };
  return (
    <div>
      <div className="container-msg">
        <h1>
          “You can say any foolish thing to a dog, and the dog will give you a
          look that says, ‘Wow, you’re right! I never would’ve thought of
          that!’”—Dave Barry
        </h1>
      </div>
      <form className="form-container" onSubmit={submitHandler}>
        <label>
          Email
          <input
            type="email"
            value={LoginData.email}
            onChange={(e) =>
              setLoginData({ ...LoginData, email: e.target.value })
            }
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={LoginData.password}
            onChange={(e) =>
              setLoginData({ ...LoginData, password: e.target.value })
            }
          />
        </label>
        <button type="submit">Login</button>
        <p>
          Are You New User <Link to="/">Clickhere</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
