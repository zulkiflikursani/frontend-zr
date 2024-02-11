import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./componens/AddProduct";
import EditProduct from "./componens/EditProduct";

import Penjualan from "./componens/Penjualan";
import Pembelian from "./componens/Pembelian";
import ProductList from "./componens/ProductList";
import Laporan from "./componens/Laporan";
import LaporanPenjualan from "./componens/LaporanPenjualan";
import LaporanPembelian from "./componens/LaporanPembelian";
import DaftarPembelian from "./componens/DaftarPembelian";
import Dahsboard from "./componens/Dashboard";
import Login from "./componens/Login";
import Register from "./componens/Register";
import EditPenjualan from "./componens/EditPenjualan";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<Dahsboard children={<Penjualan />} />}
          ></Route>
          <Route
            path="/register"
            element={<Dahsboard children={<Register />} />}
          ></Route>
          <Route
            path="/data-barang"
            element={<Dahsboard children={<ProductList />} />}
          />
          <Route
            path="/penjualan"
            element={<Dahsboard children={<Penjualan />} />}
          />
          <Route
            path="/daftarpenjualan"
            element={<Dahsboard children={<LaporanPenjualan />} />}
          />
          <Route
            path="/pembelian"
            element={<Dahsboard children={<Pembelian />} />}
          />
          <Route
            path="/add"
            element={<Dahsboard children={<AddProduct />} />}
          />
          <Route
            path="/edit/:id"
            element={<Dahsboard children={<EditProduct />} />}
          />
          <Route
            path="/Laporan"
            element={<Dahsboard children={<Laporan />} />}
          />
          <Route
            path="/LaporanPenjualan"
            element={<Dahsboard children={<LaporanPenjualan />} />}
          />
          <Route
            path="/LaporanPembelian"
            element={<Dahsboard children={<LaporanPembelian />} />}
          />
          <Route
            path="/Daftarpembelian"
            element={<Dahsboard children={<DaftarPembelian />} />}
          />
          <Route
            path="/edit-penjualan/:id"
            element={<Dahsboard children={<EditPenjualan />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
