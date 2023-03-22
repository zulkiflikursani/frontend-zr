import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [nama, setNama] = useState("");
  const [hBeli, setHbeli] = useState("");
  const [hJual, setHjual] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/products", {
      nama: nama,
      hbeli: parseInt(hBeli),
      hjual: parseInt(hJual),
    });
    navigate("/data-barang");
  };
  return (
    <div
      className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow
    shadow-slate-300"
    >
      <form onSubmit={saveProduct} className="my-10">
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
