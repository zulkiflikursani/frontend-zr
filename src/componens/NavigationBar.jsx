import React, { useState } from "react";

const NavigationBar = () => {
  const [open, setOpen] = useState(false);

  const menu = [
    { id: 1, title: "Data Barang", link: "/data-barang" },
    { id: 2, title: "Penjualan", link: "/penjualan" },
    { id: 3, title: "Pembelian", link: "/pembelian" },
    { id: 4, title: "Laporan", link: "/laporan" },
    // {title:"Data Barang",link:"/data-barang"}
  ];
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-red-500 p-6">
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
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Download
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
