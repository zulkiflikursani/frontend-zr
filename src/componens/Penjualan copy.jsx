import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import useSWR, { useSWRConfig } from "swr";
import DataTable from "react-data-table-component";

const Penjualan_copy = () => {
  const { mutate } = useSWRConfig();
  const [jumlah, setJumlah] = useState(0);
  const [hargajual, setHargajual] = useState(0);
  const [idbarang, setIdbarang] = useState("");
  const [nmBarang, setNmBarang] = useState("");
  const [totHarga, setTotHarga] = useState("");
  const [totTagihan, setTotTagihan] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const [getAlert, setAlert] = useState("");

  const [dataPenjualan, setDataPenjualan] = useState([]);
  const [list, updateList] = useState(dataPenjualan);

  useEffect(() => {
    let tempJumlah = 0;
    list.map((item) => {
      tempJumlah = parseFloat(tempJumlah) + parseFloat(item.total);
      // console.log(item.total);
    });

    setTotTagihan(tempJumlah);
  }, [list]);

  const columns = [
    {
      name: "Kode",
      selector: (row) => row.id,
    },
    {
      name: "Nama Barang",
      selector: (row) => row.nama,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Harga",
      selector: (row) => row.hjual,
    },
    {
      name: "Total",
      selector: (row) => row.total,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          kdbrng={row.id}
          onClick={() => remove(row.id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const remove = (e) => {
    console.log(e);
    updateList(list.filter((item) => item.id !== e));
  };
  const fetcher = async () => {
    const response = await axios.get("http://192.168.8.104:5000/products");
    return response.data;
  };

  const hendleChange = (e) => {
    console.log(e);
    setSelectedOption(e.hjual);
    setHargajual(parseFloat(e.hjual));
    setIdbarang(e.value);
    setNmBarang(e.label);
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
    if (e.target.value != null || e.target.value != 0) {
      setTotHarga(parseFloat(e.target.value) * parseFloat(hargajual));
    } else {
      setTotHarga(0);
    }
    setJumlah(e.target.value);
  };

  //   useEffect = () => {
  //     setDataKeranjang(dataKeranjang);
  //   };
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
    let kembalian = parseFloat(totTagihan) - parseFloat(e.target.value);
    setKembalian(kembalian);
  };

  const makeid = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const SimpanPenjualan = async (e) => {
    e.preventDefault();
    let kode_penjualan = makeid(5);
    list.map(async (item) => {
      await axios
        .post("http://192.168.8.104:5000/penjualan", {
          kode_penjualan: kode_penjualan,
          kode_barang: item.id + "",
          nama: item.nama,
          hjual: parseInt(item.hjual),
          qty: parseInt(item.qty),
        })
        .then((response) => {
          if (response.status === 201) {
            setAlert("Data Berhasil Disimpan");
          } else {
            setAlert("Data gagal disimpan");
          }
          // return dataalert;
        });
    });
    if (getAlert === "") {
      alert("Data Gagal Disimpan");
    } else if (getAlert === "Data Berhasil Disimpan") {
      alert(getAlert);
      setIdbarang("");
      setNmBarang("");
      setJumlah("");
      setTotHarga("");
      setSelectedOption("");
      updateList([]);
    } else {
      alert(getAlert);
    }
  };
  return (
    <div className="container p-2">
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Nama Barang
            </label>
            <Select options={options} onChange={(e) => hendleChange(e)} />
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
              id="grid-last-name"
              value={selectedOption}
              readOnly
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
              value={totHarga}
              placeholder="Jumlah"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 my-2"></div>
          <div className="w-full md:w-1/2 px-3 my-2 text-right">
            <button
              type="button"
              onClick={AddToKeranjang}
              className="w-full md:w-1/3 py-3 font-bold text-white bg-indigo-600  rounded-lg hover:bg-indigo-500 hover:shadow "
            >
              Tambahkan
            </button>
          </div>
        </div>
      </form>
      <div>
        <DataTable data={list} columns={columns} />
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-9/12 px-3 my-2 text-right">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Total Harga :
          </label>
        </div>
        <div className="w-full md:w-3/12 px-3 my-2">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            {totTagihan}
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
        <div className="w-full md:w-3/12 px-3 my-2">
          <input
            className="appearance-none block w-full bg-white-100 text-gray-700 border border-gray-200 rounded py-1 px-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
            id="grid-last-name"
            type="number"
            required
            onChange={(e) => hitKembalian(e)}
            placeholder="Dibayar"
          />
        </div>
        <div className="w-full md:w-9/12 px-3 my-2 text-right">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Kembalian :
          </label>
        </div>
        <div className="w-full md:w-3/12 px-3 my-2">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            {kembalian}
          </label>
        </div>
        <div className="w-full md:w-1/2 px-3 my-2"></div>
        <div className="w-full md:w-1/2 px-3 my-2 text-right">
          <button
            type="button"
            onClick={(e) => SimpanPenjualan(e)}
            className="w-full md:w-1/3 py-3 font-bold text-white bg-indigo-600  rounded-lg hover:bg-indigo-500 hover:shadow "
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Penjualan_copy;