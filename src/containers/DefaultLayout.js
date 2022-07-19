import React from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import routes from "./../routes";
import Footer from "./Footer";

const DefaultLayout = () => {
  return (
    <>
      <Header />

      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.component} />
        ))}
      </Routes>

      <Footer />
    </>
  );
};

export default DefaultLayout;
