import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import useSWR from "swr";
// import DataTable from "react-data-table-component";
let API = "https://backend-zr.vercel.app/";

const Penjualan = () => {
  // const { mutate } = useSWRConfig();
  const [jumlah, setJumlah] = useState(0);
  const [hargajual, setHargajual] = useState(0);
  const [idbarang, setIdbarang] = useState("");
  const [nmBarang, setNmBarang] = useState("");
  const [totHarga, setTotHarga] = useState("");
  const [totTagihan, setTotTagihan] = useState(0);
  const [kembalian, setKembalian] = useState(0);

  const [dataPenjualan, setDataPenjualan] = useState([]);
  const [list, updateList] = useState(dataPenjualan);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let tempJumlah = 0;
    list.map((item) => {
      tempJumlah = parseFloat(tempJumlah) + parseFloat(item.total);
      return tempJumlah;
    });

    setTotTagihan(tempJumlah);
  }, [list]);

  const remove = (e) => {
    updateList(list.filter((item) => item.id !== e));
  };
  const fetcher = async () => {
    const response = await axios.get(API + "products");
    return response.data;
  };

  const hendleChange = (e) => {
    let tot = 1 * parseFloat(e.hjual);
    setSelectedOption(e.hjual);
    setHargajual(parseFloat(e.hjual));
    setIdbarang(e.value);
    setNmBarang(e.label);
    setJumlah(1);
    setTotHarga(tot);
  };
  const [selectedOption, setSelectedOption] = useState("");
  const { data } = useSWR("products", fetcher);
  if (!data) return <h2>Loading....</h2>;

  const options = data.map((item) => {
    const container = {};
    container.value = item.id;
    container.label = item.nama;
    container.hjual = item.hjual;
    return container;
  });

  const onChangeJumlahBarang = (e) => {
    if (e.target.value !== null || e.target.value !== 0) {
      setTotHarga(parseFloat(e.target.value) * parseFloat(hargajual));
    } else {
      setTotHarga(0);
    }
    setJumlah(e.target.value);
  };

  const onChangeHargajual = (e) => {
    if (e.target.value !== null || e.target.value !== 0) {
      setTotHarga(parseFloat(e.target.value) * parseFloat(jumlah));
    } else {
      setTotHarga(0);
    }
    setHargajual(e.target.value);
  };

  //   useEffect = () => {
  //     setDataKeranjang(dataKeranjang);
  //   };

  // when data is available, title is shown

  const AddToKeranjang = async () => {
    const tempData = {};
    tempData.id = idbarang;
    tempData.nama = nmBarang;
    tempData.qty = parseFloat(jumlah);
    tempData.hjual = hargajual;
    tempData.total = totHarga;
    setDataPenjualan((oldArray) => [...oldArray, tempData]);
    updateList((oldList) => [...oldList, tempData]);
    setIdbarang("");
    setNmBarang("");
    setJumlah("");
    setTotHarga("");
    setSelectedOption("");
    return tempData;
  };
  const hitKembalian = (e) => {
    let kembalian = parseFloat(e.target.value) - parseFloat(totTagihan);
    setKembalian(kembalian);
  };

  if (loading) return <span>Loading</span>;

  // data will be null when fetch call fails
  if (!data) return <span>Data not available</span>;
  const SimpanPenjualan = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(API + "penjualan", {
        data: list,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Data Berhasil Disimpan");
          updateList([]);
          setLoading(false);
        } else {
          alert("Data Gagal Disimpan");
          setLoading(false);
        }
      });
  };

  // alert(result);

  return (
    <div className="container p-2">
      <form className="w-full">
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Nama Barang
            </label>
            <Select
              options={options}
              onChange={(e) => hendleChange(e)}
              // value={idbarang}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Harga Jual
            </label>
            <input
              className="appearance-none block w-full bg-white-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              id="grid-last-name"
              value={hargajual}
              onChange={(e) => onChangeHargajual(e)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Jumlah Barang
            </label>
            <input
              className="appearance-none block w-full bg-white-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              required
              value={jumlah}
              placeholder="Jumlah"
              onChange={(e) => onChangeJumlahBarang(e)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Total Harga
            </label>
            <input
              className="appearance-none block w-full bg-white-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              required
              value={new Intl.NumberFormat("de-DE").format(
                parseFloat(totHarga)
              )}
              placeholder="Jumlah"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-2"></div>
          <div className="w-full md:w-1/2 px-3 my-2 text-right">
            <button
              type="button"
              onClick={AddToKeranjang}
              className="w-full md:w-1/3 py-2 text-sm font-normal text-white bg-red-600  rounded-lg hover:bg-red-500 hover:shadow "
            >
              Tambahkan
            </button>
          </div>
        </div>
      </form>
      <div>
        <h3 className="text-center font-bold">Daftar Pesanan</h3>

        {/* <DataTable data={list} columns={columns} /> */}
        <table className="w-full rounded-sm">
          <thead className="bg-red-300 border text-sm font-normal ">
            <tr>
              <th>Kode</th>
              <th className="text-left">Nama Barang</th>
              <th>Qty</th>
              <th>Harga</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {list.length ? (
              list.map((item) => {
                return (
                  <tr className="border">
                    <td className="border border-gray-200">{item.id}</td>
                    <td className="text-left">{item.nama}</td>
                    <td className="border">{item.qty}</td>
                    <td className="border">{item.hjual}</td>
                    <td className="border">{item.total}</td>
                    <td className="border border-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mx-auto"
                        kdbrng={item.id}
                        onClick={() => remove(item.id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
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
          </tbody>
        </table>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-9/12 px-3  text-right">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="grid-last-name"
            >
              Total Harga :
            </label>
          </div>
          <div className="w-full md:w-3/12 px-3 ">
            <label
              className="block uppercase text-right tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="grid-last-name"
            >
              {new Intl.NumberFormat("de-DE").format(parseFloat(totTagihan))}
            </label>
          </div>
          <div className="w-full md:w-9/12 px-3 my-2 text-right">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold my-1"
              htmlFor="grid-last-name"
            >
              Dibayar :
            </label>
          </div>
          <div className="w-full md:w-3/12 px-3  text-right">
            <input
              className="appearance-none block w-full bg-white-100 text-gray-700 border border-gray-200 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
              id="grid-last-name"
              type="number"
              required
              onChange={(e) => hitKembalian(e)}
              placeholder="Dibayar"
            />
          </div>
          <div className="w-full md:w-9/12 px-3  text-right">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold "
              htmlFor="grid-last-name"
            >
              Kembalian :
            </label>
          </div>
          <div className="w-full md:w-3/12 px-3  text-right">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold "
              htmlFor="grid-last-name"
            >
              {new Intl.NumberFormat("de-DE").format(parseFloat(kembalian))}
            </label>
          </div>
          <div className="w-full md:w-1/2 px-3 "></div>
          <div className="w-full md:w-1/2 px-3 my-2 text-right">
            <button
              type="button"
              onClick={(e) => SimpanPenjualan(e)}
              className="w-full md:w-1/3 py-2 text-sm font-normal text-white bg-red-600  rounded-lg hover:bg-red-500 hover:shadow  "
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Penjualan;
