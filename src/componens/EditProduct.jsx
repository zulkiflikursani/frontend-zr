import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [nama, setNama] = useState("");
  const [hBeli, setHbeli] = useState("");
  const [hJual, setHjual] = useState("");
  const [kat, setKat] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  let API = "https://backend-zr.vercel.app/";

  useEffect(() => {
    const getProductByid = async () => {
      const response = await axios.get(API + "products/" + id);
      // console.log(response);
      // console.log(response.data[0].nama);
      setNama(response.data[0].nama);
      setKat(response.data[0].kat);
      setHbeli(response.data[0].hbeli);
      setHjual(response.data[0].hjual);
    };
    getProductByid();
  }, [id]);
  const editProduct = async (e) => {
    e.preventDefault();
    await axios
      .patch("http://localhost:5000/products/" + id, {
        nama: nama,
        kat: kat,
        hbeli: parseInt(hBeli),
        hjual: parseInt(hJual),
      })
      .then(function (response) {
        console.log(response.status);
        if (response.status !== 200) {
          alert("gagal mengedit data");
        } else {
          navigate("/");
        }
      });
  };
  return (
    <div
      className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow
    shadow-slate-300"
    >
      <form onSubmit={editProduct} className="my-10">
        <div className="flex flex-col">
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
