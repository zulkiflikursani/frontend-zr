import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // e.preventDefault();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  const hendleClck = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      history("/login");
    } catch (error) {
      if (error.response) console.log(error.response.data.msg);
      setMsg(error.response.data.msg);
    }
  };

  // const loginAuth = async (username, password) => {
  //   try {
  //     // Replace this with your actual authentication logic
  //     if (username === "user" && password === "admin") {
  //       const value = username + " dan " + password;
  //       await AsyncStorage.setItem("userToken", value);
  //       // Simulate successful login
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Login auth error:", error);
  //     // console.log(error);
  //     // return false;
  //   }
  // };
  return (
    <section className="flex justify-center items-center bg-red-500 h-screen ">
      <div className=" w-full md:w-96 p-4 m-2 bg-red-100 rounded-lg">
        <p className="p-4 mx-auto bg-white rounded-lg mb-3 text-red-500  ">
          {msg}
        </p>
        <div className="">
          <label htmlFor="user" className="block text-base mb-1 mx-1  ">
            User Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="user"
            id="user"
            value={name}
            className="border-2 rounded-lg shadow-md p-2 w-full "
            placeholder="User Name"
          ></input>
        </div>
        <div className="">
          <label htmlFor="user" className="block text-base mb-1 mx-1  ">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="user"
            id="user"
            className="border-2 rounded-lg shadow-md p-2 w-full "
            placeholder="Email"
          ></input>
        </div>
        <div className="">
          <label htmlFor="password" className="block text-base mb-1 mx-1  ">
            Password
          </label>
          <input
            type="password"
            name="pass"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 rounded-lg shadow-md p-2 w-full"
            placeholder="*******"
          ></input>
        </div>
        <div className="">
          <label htmlFor="confpassword" className="block text-base mb-1 mx-1  ">
            Confirmasi Password
          </label>
          <input
            type="password"
            name="confpass"
            id="confpass"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            className="border-2 rounded-lg shadow-md p-2 w-full"
            placeholder="*******"
          ></input>
        </div>
        <input type="checkbox" /> Show Password
        <div className="text-center mt-2">
          <button
            onClick={hendleClck}
            className="border rounded-lg bg-red-500 py-2 w-1/2 mx-auto"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
