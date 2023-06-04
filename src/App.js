import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./componens/AddProduct";
import EditProduct from "./componens/EditProduct";
import NavigationBar from "./componens/NavigationBar";
import Penjualan from "./componens/Penjualan";
import Pembelian from "./componens/Pembelian";
import ProductList from "./componens/ProductList";
import Laporan from "./componens/Laporan";
import LaporanPenjualan from "./componens/LaporanPenjualan";

function App() {
  return (
    <div className="container">
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Penjualan />} />
          <Route path="/data-barang" element={<ProductList />} />
          <Route path="/penjualan" element={<Penjualan />} />
          <Route path="/pembelian" element={<Pembelian />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/Laporan" element={<Laporan />} />
          <Route path="/LaporanPenjualan" element={<LaporanPenjualan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
