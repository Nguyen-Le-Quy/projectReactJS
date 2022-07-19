import React from "react";
const ExchangePolicy = () => {
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
          <span> YATB về Chính sách đổi trả </span>
        </div>
        <h3 className="mt-3 p-3">Chính sách đổi trả</h3>
        <div className="text-center">
          <img
            src={images[2]}
            alt=" Chính sách đổi trả"
            className="img-fluid"
          />
        </div>
      </div>
    </main>
  );
};

export default ExchangePolicy;
