import React from "react";
const Introduce = () => {
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
          <span> Giới thiệu về YATB </span>
        </div>
        <h3 className="mt-3 p-3">Giới thiệu về YATB</h3>
        <p>
          YATB là một thường hiệu thời trang Việt Nam dành cho giới trẻ. YATB
          mang ý nghĩa You are the best. <br />
          ĐA DẠNG CÁC GU THỜI TRANG chính là phong cách hiện tại của YATB.vn.
          <br />
          Đến với YaMe, sẽ đáp ứng mọi nhu cầu thời trang hàng ngày cho bạn: ĐI
          HỌC, ĐI CHƠI, ĐI LÀM, DU LỊCH, DẠO PHỐ, TIỆC TÙNG, THỂ THAO.
        </p>
        <strong>
          <u>
            YATB.vn - <em> Vẫn giữ những giá trị vốn có</em>
          </u>
        </strong>
        <p>
          YATB luôn nghiên cứu, phát triển mỗi ngày để mang đến những sản phẩm
          đa dạng về chất liệu, nhiều tính năng, đa dạng giá thành... mang lại
          nhiều sự lựa chọn hơn cho khách hàng.
        </p>
        <div className="text-center mb-5">
          <img src={images[0]} alt="Chất liệu vải" />
        </div>
        <p>Luôn duy trì chế độ bảo hành 365 ngày đối với mọi sản phẩm.</p>
        <div className="text-center mb-5">
          <img src={images[16]} alt="Thời hạn bảo hành" />
        </div>
        <p>
          Thiết kế trưng bày cửa hàng theo phong cách FACTORY STORE gần gũi,
          không quá kiểu cách. Cùng với nhân viên phục vụ thân thiện, tận tình
          như đang đi mua sắm cùng bạn bè của chính bạn vậy.
        </p>
        <div className="text-center mb-5">
          <img src={images[17]} alt="Mô tả cửa hàng" />
        </div>
        <h4 className="text-info">
          YATB <small>có nghĩa là</small> You are the best
        </h4>
      </div>
    </main>
  );
};

export default Introduce;
