import React, { useState } from "react";
import axios from "axios";
import Penjualan from "./Penjualan";

const LaporanPenjualan = () => {
  const [mulai, setMulai] = useState("");
  const [sampai, setSampai] = useState("");
  const [dataPenjualan, setDataPenjualan] = useState([]);
  //   const [data, getData] = useState([]);

  const Tampilkan = async () => {
    const params = {
      mulai: mulai,
      sampai: sampai,
    };
    const response = await axios.get("http://localhost:5000/laporanpenjualan", {
      params,
    });
    // console.log(response.data);
    setDataPenjualan(response.data);
    // return response.data;
  };
  return (
    <div className="w-full ">
      <h1 className="text-center font-bold text-3xl">LAPORAN PENJUALAN</h1>
      <div className="flex flex-wrap mb-1">
        <div className="w-full md:w-1/4 px-3 mb-1 md:mb-0">
          <label
            className="block tracking-wide w-full text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Mulai
          </label>
          <input
            className="bg-white-100 text-gray-700 border w-full border-gray-200 rounded py-1 px-1 leading-tight focus:outline-none  focus:bg-white focus:border-gray-500"
            type="date"
            value={mulai}
            onChange={(e) => setMulai(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/4 px-3 mb-1 md:mb-0">
          <label
            className="block tracking-wide w-full text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Sampai
          </label>
          <input
            className="bg-white-100 text-gray-700 border w-full border-gray-200 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="date"
            value={sampai}
            onChange={(e) => setSampai(e.target.value)}
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
      <table className="w-full rounded-sm md:mx-1">
        <thead className="bg-red-300 border text-sm font-normal ">
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>kode transaksi</th>
            <th>Kode Barang</th>
            <th>Nama Barang</th>
            <th>Harga Beli</th>
            <th>Harga Jual</th>
          </tr>
        </thead>
        <tbody>
          {dataPenjualan.length ? (
            dataPenjualan.map((item) => {
              return (
                <tr className="border">
                  <td className="border border-gray-200">{item.tanggal}</td>
                  <td className="text-left">{item.kode_penjualan}</td>
                  <td className="border">{item.kode_barang}</td>
                  <td className="border">{item.nama_barang}</td>
                  <td className="border">{item.hbeli}</td>
                  <td className="border">{item.hjual}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Non Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanPenjualan;
