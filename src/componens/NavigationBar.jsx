import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const goTo = useNavigate();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [exp, setExp] = useState("");
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    refreshToken();
    getUser();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(API_URL + "token", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExp(decoded.exp);
    } catch (error) {
      console.log(error);
      if (error.response) {
        goTo("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (exp * 1000 < currentDate.getTime()) {
        const response = await axios.get(API_URL + "token", {
          withCredentials: true,
        });
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.name);
        setExp(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const getUser = async () => {
    const response = await axiosJWT.get(API_URL + "users", {
      headersL: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
  };
  const Logout = async () => {
    try {
      await axios.delete(API_URL + "users/logout", {
        withCredentials: true,
      });
      goTo("/");
    } catch (error) {
      console.log(error);
    }
  };

  const menu = [
    { id: 1, title: "Data Barang", link: "/data-barang" },
    { id: 2, title: "Penjualan", link: "/penjualan" },
    { id: 3, title: "Pembelian", link: "/pembelian" },
    { id: 4, title: "Daftar Penjualan", link: "/daftarpenjualan" },
    { id: 5, title: "Daftar Pembelian", link: "/daftarpembelian" },
    { id: 6, title: "Laporan", link: "/laporan" },
    // {title:"Data Barang",link:"/data-barang"}
  ];
  return (
    <>
      <nav className="flex  items-center justify-between flex-wrap bg-red-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">ZR Kasir</span>
        </div>
        <div className="block lg:hidden" onClick={() => setOpen(!open)}>
          <button className="flex items-center px-3 py-2 border rounded text-red-200 border-red-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            open ? "top-20" : "hidden"
          } `}
        >
          <div className="text-sm lg:flex-grow">
            {menu.map((link) => (
              <a
                key={link.id}
                href={link.link}
                className="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4"
              >
                {link.title}
              </a>
            ))}
          </div>
          <div>
            <button
              href="#"
              className=" mr-3 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              onClick={Logout}
            >
              Logout
            </button>
            <button
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              {name}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
