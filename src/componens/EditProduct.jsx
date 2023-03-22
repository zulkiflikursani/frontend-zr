import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [nama, setNama] = useState("");
  const [hBeli, setHbeli] = useState("");
  const [hJual, setHjual] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductByid = async () => {
      const response = await axios.get("http://localhost:5000/products/" + id);
      setNama(response.data.nama);
      setHbeli(response.data.hbeli);
      setHjual(response.data.hjual);
    };
    getProductByid();
  }, [id]);
  const editProduct = async (e) => {
    e.preventDefault();
    await axios.patch("http://localhost:5000/products/" + id, {
      nama: nama,
      hbeli: parseInt(hBeli),
      hjual: parseInt(hJual),
    });
    navigate("/");
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
            className="w-full py-3 font-bold text-white bg-indigo-600  rounded-lg hover:bg-indigo-500 hover:shadow "
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
