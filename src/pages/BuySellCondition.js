import React from "react";
const BuySellCondition = () => {
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
          <span> YATB về Điều khoản mua bán </span>
        </div>
        <h3 className="mt-3 p-3">Điều khoản mua bán</h3>
        <div className="text-center">
          <img
            src={images[3]}
            alt="Điều khoản mua bán 1"
            className="img-fluid"
          />
        </div>
        <div className="text-center">
          <img
            src={images[4]}
            alt="Điều khoản mua bán 2"
            className="img-fluid"
          />
        </div>
        <div className="text-center">
          <img
            src={images[5]}
            alt="Điều khoản mua bán 3"
            className="img-fluid"
          />
        </div>
        <div className="text-center">
          <img
            src={images[6]}
            alt="Điều khoản mua bán 4"
            className="img-fluid"
          />
        </div>
        <div className="text-center">
          <img
            src={images[7]}
            alt="Điều khoản mua bán 5"
            className="img-fluid"
          />
        </div>
      </div>
    </main>
  );
};

export default BuySellCondition;
