import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./componens/AddProduct";
import EditProduct from "./componens/EditProduct";
import NavigationBar from "./componens/NavigationBar";
import Penjualan from "./componens/Penjualan";
import ProductList from "./componens/ProductList";

function App() {
  return (
    <div className="container">
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/data-barang" element={<ProductList />} />
          <Route path="/penjualan" element={<Penjualan />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
