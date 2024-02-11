import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [nama, setNama] = useState("");
  const [hBeli, setHbeli] = useState("");
  const [hJual, setHjual] = useState("");
  const [kat, setKat] = useState("");
  const navigate = useNavigate();
  // let API = "https://backend-zr.vercel.app/";
  let API = "https://backend-zr.vercel.app/";
  // let API = "http://localhost:5000/";

  const saveProduct = async (e) => {
    e.preventDefault();
    await axios
      .post(API + "products", {
        nama: nama,
        kat: kat,
        hbeli: parseInt(hBeli),
        hjual: parseInt(hJual),
      })
      .then(function (response) {
        console.log(response);
        navigate("/data-barang");
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
    // console.log(responsedata.data);
  };
  // const handleClick = (event) => {
  //   event.currentTarget.disabled = true;
  // };
  return (
    <div
      className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow
    shadow-slate-300 container"
    >
      <form onSubmit={saveProduct} className="my-10">
        <div className="flex flex-col">
          <h3 className="text-center text-lg font-bold mb-3 text-slate-700 ">
            Tambah Produk
          </h3>
          <div className="mb-5">
            <label className="font-bold text-slate-700" htmlFor="">
              Nama Produk
            </label>
            <input
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 foucus:outline-none focus:boder-slate-500 hover:shadow"
              placeholder="Nama Produk "
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700" htmlFor="">
              Kategori
            </label>
            <select
              className="w-full py-3 border border-slate-200 rounded-lg px-3 foucus:outline-none focus:boder-slate-500 hover:shadow"
              placeholder="Kategori "
              value={kat}
              onChange={(e) => setKat(e.target.value)}
            >
              <option value=""></option>
              <option value="1">Voucer Data</option>
              <option value="2">Aksesoris</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700" htmlFor="">
              Harga Beli
            </label>
            <input
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 foucus:outline-none focus:boder-slate-500 hover:shadow"
              placeholder="Harga Beli"
              value={hBeli}
              onChange={(e) => setHbeli(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700" htmlFor="">
              Harga Jual
            </label>
            <input
              type="text"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 foucus:outline-none focus:boder-slate-500 hover:shadow"
              placeholder="Harga Jual"
              value={hJual}
              onChange={(e) => setHjual(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-red-600  rounded-lg hover:bg-red-500 hover:shadow "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
