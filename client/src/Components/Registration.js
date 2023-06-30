import React, { useState } from "react";
import "./form.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("User already exists!!");
      }
      toast.success(`Registration successful!`);
      setTimeout(() => {
        navigate("/login");
      }, 5000);

      // Registration successful
    } catch (error) {
      // Error handling
      toast.error("error while registering!");
    }
  };

  return (
    <div>
      <div className="container-msg">
        <h1>WHAT KIND OF BREED YOUR DOG?</h1>
        <p>Want To Explore How many kind of Breeds are there in this world</p>
      </div>

      <form className="form-container" onSubmit={submitHandler}>
        <label>
          UserName
          <input
            type="text"
            placeholder="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </label>
        <button type="submit">Register</button>
        <p>
          Are You Existing User <Link to="/login">Clickhere</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Registration;
