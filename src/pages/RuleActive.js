import React from "react";
const RuleActive = () => {
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
          <span> YATB về Quy chế hoạt động </span>
        </div>
        <h3 className="mt-3 p-3">Quy chế hoạt động</h3>
        <div className="text-center">
          <img
            className="img-fluid"
            src={images[10]}
            alt="Quy chế hoạt động 1"
          />
        </div>
        <div className="text-center">
          <img
            className="img-fluid"
            src={images[11]}
            alt="Quy chế hoạt động 2"
          />
        </div>
        <div className="text-center">
          <img
            className="img-fluid"
            src={images[12]}
            alt="Quy chế hoạt động 3"
          />
        </div>
        <div className="text-center">
          <img
            className="img-fluid"
            src={images[13]}
            alt="Quy chế hoạt động 4"
          />
        </div>
        <div className="text-center">
          <img
            className="img-fluid"
            src={images[14]}
            alt="Quy chế hoạt động 5"
          />
        </div>
      </div>
    </main>
  );
};

export default RuleActive;
