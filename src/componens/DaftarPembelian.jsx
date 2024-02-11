import React, { useState } from "react";
import axios from "axios";

const DaftarPembelian = () => {
  const [tanggal, setTanggal] = useState("");

  const Tampilkan = async () => {};

  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-3xl">DAFTAR PEMBELIAN</h1>
      <div className="flex flex-wrap mb-1">
        <div className="w-full md:w-1/4 px-3 mb-1 md:mb-0">
          <label
            className="block tracking-wide w-full text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Tanggal
          </label>
          <input
            className="bg-white-100 text-gray-700 border w-full border-gray-200 rounded py-1 px-1 leading-tight focus:outline-none  focus:bg-white focus:border-gray-500"
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/4 px-1 mb-1 md:mb-0">
          <button
            onClick={Tampilkan}
            className="w-full bg-red-700 border-gray-500 rounded-lg hover:bg-red-400 text-white p-2 font-bold shadow-sm text-sm my-2"
          >
            Tampilkan
          </button>
        </div>
      </div>
      <div className="isi">
        <table className="w-full rounded-sm md:mx-1">
          <thead className="bg-red-300 border text-sm font-normal">
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Qty</th>
              <th>Harga</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default DaftarPembelian;
