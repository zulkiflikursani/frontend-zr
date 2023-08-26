import React from "react";

const Laporan = () => {
  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold my-4">LAPORAN</h1>
      <a href="/LaporanPenjualan">
        <button className="w-full bg-red-700 border-gray-500 rounded-lg text-white p-2 font-bold shadow-sm text-lg my-2">
          Laporan Penjualan
        </button>
      </a>
      <a href="/LaporanPembelian">
        <button className="w-full bg-red-700 border-gray-500 rounded-lg text-white p-2 font-bold shadow-sm text-lg my-2">
          Laporan Pembelian
        </button>
      </a>
      <button className="w-full bg-red-700 border-gray-500 rounded-lg text-white p-2 font-bold shadow-sm text-lg my-2">
        Laporan Keuangan
      </button>
    </div>
  );
};

export default Laporan;
