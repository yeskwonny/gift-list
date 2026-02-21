import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./pages/List";
import Items from "./pages/Items";
import GiftForm from "./pages/GiftForm";
import { Toaster } from "react-hot-toast";
import AppLayout from "./layouts/AppLayout";
import ItemsDetails from "./pages/ItemDetails";

function App() {
  return (
    // Should create Routes file??
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AppLayout />}>
          <Route path="/gifts/list" element={<List />} />
          <Route path="/gifts/list/:id" element={<Items />} />
          <Route path="/gifts/list/item/:id" element={<ItemsDetails />} />
          <Route path="/gifts/new" element={<GiftForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
