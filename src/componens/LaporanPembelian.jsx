import React, { useState } from "react";
import axios from "axios";
const convert = (dateString) => new Date(dateString).toISOString();

// const totaljual = 0;
// const totalbeli = 0;
const format = (inputDate) => {
  let date, month, year;
  inputDate = new Date(inputDate);
  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  var h = inputDate.getHours();
  var m = inputDate.getMinutes();
  var s = inputDate.getSeconds();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year} ${h}:${m}:${s}`;
};
const LaporanPenjualan = () => {
  const [mulai, setMulai] = useState("");
  const [sampai, setSampai] = useState("");
  const [dataPenjualan, setDataPenjualan] = useState([]);
  const [totaljual, setTotaljual] = useState(0);
  const [totalbeli, setTotalbeli] = useState(0);
  let temptotaljual = 0;
  let temptotalbeli = 0;
  //   const [data, getData] = useState([]);
  let API = "https://backend-zr.vercel.app/";

  const Tampilkan = async () => {
    const params = {
      mulai: mulai,
      sampai: sampai,
    };
    const response = await axios.get(API + "laporanpenjualan", {
      params,
    });
    console.log(response.data);
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
            dataPenjualan.map((item, index) => {
              temptotaljual = temptotaljual + item.hjual;
              temptotalbeli = temptotalbeli + item.hbeli;
              // setTotaljual(temptotaljual);
              // setTotalbeli(temptotalbeli);
              return (
                <tr className="border">
                  <td className="border border-gray-200">{index + 1}</td>
                  <td className="border border-gray-200">
                    {format(convert(item.tanggal))}
                  </td>
                  <td className="text-left">{item.kode_penjualan}</td>
                  <td className="border">{item.kode_barang}</td>
                  <td className="border">{item.nama_barang}</td>
                  <td className="border text-right">
                    {new Intl.NumberFormat("de-DE").format(item.hbeli)}
                  </td>
                  <td className="border text-right">
                    {new Intl.NumberFormat("de-DE").format(item.hjual)}
                  </td>
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

          <tr>
            <td className="border text-center font-bold bg-red-200" colspan="5">
              TOTAL
            </td>
            <td className="border font-bold bg-red-200 text-right">
              {new Intl.NumberFormat("de-DE").format(temptotalbeli)}
            </td>
            <td className="border font-bold bg-red-200 text-right">
              {new Intl.NumberFormat("de-DE").format(temptotaljual)}
            </td>
          </tr>
          <tr>
            <td className="border text-center font-bold bg-red-200" colspan="5">
              MARGIN
            </td>
            <td className="border font-bold bg-red-200"></td>
            <td className="border font-bold bg-red-200 text-right">
              {new Intl.NumberFormat("de-DE").format(
                temptotaljual - temptotalbeli
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LaporanPenjualan;
