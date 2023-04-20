import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import FilterComponen from "./FilterComponen";

const ProductList = () => {
  const [filterText, setFilterText] = React.useState("");

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponen
        onFilter={(e) => {
          setFilterText(e.target.value);
        }}
        onClear={handleClear}
        filtertext={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const config = {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  };
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    let API = "https://backend-zr.vercel.app/";

    const response = await axios.get(API + "products", config);
    console.log(data);
    return response.data;
  };

  const { data } = useSWR("products", fetcher);
  if (!data) return <h2>Loading.... </h2>;

  const deleteProdut = async (productId) => {
    if (window.confirm("Yakin Akan Menghapus Data ?")) {
      await axios
        .delete(process.env.API + "products/" + productId)
        .then(function (response) {
          if (response.status !== 200) {
            alert("Gagal Menghapus Data");
          } else {
            if (window.confirm("Berhasil menghapus data")) {
              mutate("products");
            }
          }
        });
    }
  };

  const columns = [
    {
      name: "Kode",
      selector: (row) => row.id,
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Kat",
      selector: (row) => row.kat,
    },
    {
      name: "Harga Beli",
      selector: (row) => row.hbeli,
    },
    {
      name: "Harga Jual",
      selector: (row) => row.hjual,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <Link
          to={"/edit/" + row.id}
          className="font-medium bg-blue-400 hover:to-blue-500 px-3 py-1 rounded text-white mr-1"
        >
          Edit
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      cell: (row) => (
        <button
          onClick={() => deleteProdut(row.id)}
          className="font-medium bg-red-400 hover:to-red-500 px-3 py-1 rounded text-white "
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredItems = data.filter(
    (item) =>
      (item.id && item.id.toString().includes(filterText)) ||
      (item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()))
  );

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <Link
          to="/add"
          className="bg-red-500 hover:bg-red-700 border border-slate-50 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add New
        </Link>
        <div className="relative shadow rounded-lg mt-3">
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
          />
          {/* <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6 ">Nama</th>
                <th className="py-3 px-3 ">Harga Beli</th>
                <th className="py-3 px-3 ">Harga Jual</th>
                <th className="py-3 px-1 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr className="bg-white border-b" key={product.id}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6 font-medium text-gray-900 ">
                    {product.nama}
                  </td>
                  <td className="py-3 px-6 ">{product.hbeli}</td>
                  <td className="py-3 px-6 ">{product.hjual}</td>
                  <td className="py-3 px-1 text-center">
                    <Link
                      to={"/edit/" + product.id}
                      className="font-medium bg-blue-400 hover:to-blue-500 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProdut(product.id)}
                      onSelectedRowsChange={handleRowSelected}
                      className="font-medium bg-red-400 hover:to-red-500 px-3 py-1 rounded text-white "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
