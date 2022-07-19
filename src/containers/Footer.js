import React from "react";
const Footer = (props) => {
  return (
    <footer>
      <div className="container">
        <div id="footer-top">
          <h3>YATB</h3>
          <div>Đặt hàng và thu tiền tận nơi trên toàn quốc</div>
          <h5>(028) 7307 1441</h5>
        </div>
        <div className="row">
          <div className="col-md mb-3 mb-md-0">
            <h5>Thông tin</h5>
            <div className="addHyphen">
              <a href="/gioi-thieu">Giới thiệu về yatb.vn</a>
            </div>
            <div className="addHyphen">
              <a href="/quy-che-hoat-dong">Quy chế hoạt động</a>
            </div>
            <div className="addHyphen">
              <a href="/dieu-kien-mua-ban">Điều khoản mua bán</a>
            </div>
          </div>
          <div className="col-md mb-3 mb-md-0">
            <h5>FAQ</h5>
            <div className="addHyphen">
              <a href="/van-chuyen">Vận chuyển</a>
            </div>
            <div className="addHyphen">
              <a href="/chinh-sach-doi-tra">Chính sách đổi trả</a>
            </div>
            <div className="addHyphen">
              <a href="/chinh-sach-bao-hanh">Chính sách bảo hành</a>
            </div>
            <div className="addHyphen">
              <a href="/khach-hang-VIP">Khách hàng VIP</a>
            </div>
            <div className="addHyphen">
              <a href="/doi-tac-cung-cap">Đối tác cung cấp</a>
            </div>
          </div>
          <div className="col-md-5">
            <h5>Chi nhánh HCM</h5>
            <div>» YATB Thủ đức: 336, Võ Văn Ngân</div>
            <div>» YATB Gò Vấp: 417, Quang Trung</div>
            <div>» YATB Gò Vấp 2: 1096, Quang Trung</div>
            <div>» YATB Q5: 190, Nguyễn Trãi</div>
            <div>» YATB Q6: 102, Hậu Giang</div>
            <div>» YATB Q7: 323, Huỳnh Tấn Phát</div>
            <div>» YATB Q9: 200, Lê Văn Việt</div>
            <div>» YATB Q9: 114, Đỗ Xuân Hợp</div>
            <div>» YATB Q10: 770F, Sư Vạn Hạnh (nd)</div>
            <div>» YATB Q12: 209, Phan Văn Hớn</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
