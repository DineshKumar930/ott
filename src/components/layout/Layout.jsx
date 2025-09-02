import Footer from "./Footer";
import Header from "./Header";
import React from "react";
import { Outlet } from "react-router-dom";

// src/components/Layout.jsx

function Layout() {
  return (
    <>
      <Header />
      <main className="app-content">
        <Outlet /> {/* yahan routes ke child render honge */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
