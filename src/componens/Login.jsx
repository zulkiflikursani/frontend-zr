import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const history = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [exp, setExp] = useState("");
  const [company, setCompany] = useState("");
  const [level, setLevel] = useState("");
  const [errorLogin, setError] = useState("");
  const [cookiePermission, setCookiePermission] = useState(
    localStorage.getItem("cookiePermission")
  );

  const urlParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    // console.log(API_URL);
    PermisioanCookie();
    const error = urlParams.get("error");
    if (!error) {
      refreshToken();
    } else {
      setError(error);
    }
  }, []);

  const PermisioanCookie = async () => {
    if (!localStorage.getItem("cookiePermission")) {
      // Jika pengguna belum memberikan izin sebelumnya, tampilkan pesan dan minta izin
      const allowCookies = window.confirm(
        "This website uses cookies to improve your experience. Do you allow us to use cookies?"
      );
      if (allowCookies) {
        // Jika pengguna mengizinkan, simpan preferensi di localStorage
        await localStorage.setItem("cookiePermission", "true");
        setCookiePermission("true");
      }
    }
  };
  const refreshToken = async () => {
    try {
      const response = await axios.get(API_URL + "token", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExp(decoded.exp);
      setCompany(decoded.company);
      setLevel(decoded.level);
      history("/dashboard");
    } catch (error) {
      console.log(error);
      history("/");
    }
  };

  const hendleClck = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        API_URL + "users/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      history("/dashboard");
    } catch (error) {
      if (error.response) console.log(error.response.data.msg);
      setMsg(error.response.data.msg);
    }
  };

  const signAuht = async () => {
    try {
      const response = await axios.get(API_URL + "oauth/google");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center items-center bg-red-500 h-screen ">
      <div className=" w-full md:w-96 p-4 m-2 bg-red-100 rounded-lg">
        <p className="p-4 mx-auto bg-white rounded-lg mb-3 text-red-500  ">
          {msg}
          {errorLogin ? errorLogin : ""}
        </p>
        <div className="">
          <label htmlFor="user" className="block text-base mb-1 mx-1  ">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            placeholder="User Name"
          ></input>
        </div>
        <input type="checkbox" /> Show Password
        <div className="text-center mt-2">
          <button
            onClick={hendleClck}
            className="border rounded-lg bg-red-500 py-2 w-1/2 mx-2"
          >
            Login
          </button>

          <button
            className="border-2 border-red-500 rounded-lg bg-white-500 py-2 w-1/2 mt-2"
            onClick={signAuht}
          >
            Sign in With Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
