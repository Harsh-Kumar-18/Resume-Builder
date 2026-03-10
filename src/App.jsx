import React from "react";
import GlobalContext from "./context/GlobalContext";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Builder from "./pages/Builder";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <GlobalContext>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/builder" element={<Builder />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
    </GlobalContext>
  );
};

export default App;
