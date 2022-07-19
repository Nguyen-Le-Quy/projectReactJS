import React from "react";
const Transport = () => {
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("../image", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <main>
      <div className="container">
        <div className="body-bar">
          <a href="/home">
            <i className="bi bi-house-fill" />
          </a>
          <span> YATB về Vận chuyển </span>
        </div>
        <h3 className="mt-3 p-3">Vận chuyển</h3>
        <div className="text-center">
          <img src={images[18]} alt="Vận chuyển" className="img-fluid" />
        </div>
      </div>
    </main>
  );
};

export default Transport;
