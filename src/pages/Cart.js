import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../store/actions";
import NumberFormat from "react-number-format";
import { Modal, Button, Table } from "react-bootstrap";

const Cart = () => {
  const dispatch = useDispatch();
  const chooseLists = useSelector((state) => state.auth.lists);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [infoName, setInfoName] = useState("");
  const [infoPhone, setInfoPhone] = useState("");
  const [infoAddress, setInfoAddress] = useState("");
  const [infoNote, setInfoNote] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // khi nào cần uef là khi mà nó render xong thì mới gọi uef
  useEffect(() => {
    //vì sao để setTotalCart trong uef là vì ta muốn nó tính từng giá tiền cho từng sản phẩm xong hết rồi (là render xong xuôi hết) mới bắt đầu việc tính tổng
    setTotalCart(sum());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TH chỉ sử dụng 1 lần thì ta truyền trực tiếp cái mảng vào trong hàm luôn
  function sum() {
    // trong 1 function chỉ có duy nhất 1 lệnh return
    let total = 0;
    for (let index = 0; index < chooseLists.length; index++) {
      let ele = chooseLists[index].price * chooseLists[index].quantity;
      total += ele;
    }
    return total;
  }

  const updateOneProductAction = (e, item) => {
    dispatch({
      type: ActionTypes.UPDATE_CART,
      detail: item,
      quantity: e.target.value,
      // e.target.value này là focus vào input để lấy giá trị, cách test là console.log(e.target.value) xem nó lấy dc đúng g.trị của input hay ko
    });
    // đầu tiên ta cho nó là false khi mà hành động update dc thực thi thì nó sẽ set lại cho mình là true và nó sẽ render lại thì nó sẽ hiển thị lại giá tiền đi kèm theo, tương tự cho hành động xoá cũng vậy
    setForceUpdate(!forceUpdate);
    // ta setTotalCart lại mục đích là khi có sự update hay delete thì nó render lại giá trị tổng
    setTotalCart(sum());
  };

  const deleteOneProductAction = (e, item) => {
    if (e) e.preventDefault();
    dispatch({
      type: ActionTypes.REMOVE_CART,
      detail: item,
    });
    setForceUpdate(!forceUpdate);
    setTotalCart(sum());
  };

  const removeAllProductAction = () => {
    dispatch({
      type: ActionTypes.CHECK_OUT,
    });
    handleClose();
    setTotalCart(0);
  };

  const getInfoName = (e) => {
    setInfoName(e.target.value);
  };
  const getInfoPhone = (e) => {
    setInfoPhone(e.target.value);
  };
  const getInfoAddress = (e) => {
    setInfoAddress(e.target.value);
  };
  const getInfoNote = (e) => {
    setInfoNote(e.target.value);
  };
  return (
    <>
      <main>
        <div className="container">
          <div className="body-bar mb-3">
            <Link to="/home">
              <i className="bi bi-house-fill" />
            </Link>
            <span> Thông tin giỏ hàng của bạn</span>
          </div>
          {/* if else */}
          <div className="row row-cols-md-2 gx-4">
            <div className="col-md mb-3 mb-lg-0">
              <h4>Chi tiết đơn hàng</h4>

              {chooseLists.map((item, idx) => (
                <div className="row border-top border-bottom py-3" key={idx}>
                  <div className="col-3 text-center">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="img-fluid d-block"
                    />
                    <a
                      href="/cart"
                      className="btn btn-outline-danger"
                      onClick={(e) => deleteOneProductAction(e, item)}
                    >
                      <i className="bi bi-trash" /> Xoá
                    </a>
                  </div>
                  <div className="col-9">
                    <div className="border-bottom mb-2">
                      <p>{item.nameProduct}</p>
                      <p>
                        {item.variant.color}, {item.variant.size}
                      </p>
                    </div>
                    <div>
                      <form>
                        <div className="d-flex my-3">
                          <input
                            className="form-control me-2"
                            defaultValue={item.quantity}
                            // onChange ta truyền hàm với tham số e để lấy cái this của input, item này bên trong nó sẽ có id và size, ko dc dùng gọi hàm khi nằm trong 1 map
                            onChange={(e) => updateOneProductAction(e, item)}
                          />
                        </div>
                        <span>
                          =
                          <NumberFormat
                            value={item.price * item.quantity}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" đ"}
                          />
                        </span>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
              <div className="offset-3 mt-1 mb-3">
                Tổng:{" "}
                <NumberFormat
                  value={totalCart}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" đ"}
                />
              </div>

              <a href="/new" className="btn btn-warning w-100">
                Cần sản phẩm khác? Tiếp tục mua hàng
              </a>
            </div>
            <div className="col-md">
              <h4>Người mua/nhận hàng</h4>
              <form>
                <Input
                  type="text"
                  id="txtName"
                  label="Tên: "
                  labelSize={12}
                  placeholder="Tên người nhận"
                  onChange={(e) => getInfoName(e)}
                />
                <Input
                  type="tel"
                  id="txtPhone"
                  label="Điện thoại liên lạc: "
                  labelSize={12}
                  placeholder="Số điện thoại"
                  onChange={(e) => getInfoPhone(e)}
                />
                <Input
                  type="text"
                  id="txtAddress"
                  label="Địa chỉ nhận hàng: "
                  labelSize={12}
                  placeholder="Nơi nhận hàng"
                  onChange={(e) => getInfoAddress(e)}
                />
                <Input
                  type="text"
                  id="Textarea"
                  label="Ghi chú: "
                  labelSize={12}
                  placeholder="Nội dung ghi chú"
                  rows={3}
                  onChange={(e) => getInfoNote(e)}
                />
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleShow}
                >
                  Đặt hàng
                </button>
              </form>
            </div>
          </div>
          {/* Modal */}
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Thông tin đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                - Cảm ơn
                <span>
                  {infoName ? " Anh/Chị: " : " quý khách "}
                  {infoName}{" "}
                </span>
                đã lựa chọn mua sản phẩm tại shop YATB,
                <span>
                  {infoName ? " Anh/Chị: " : " quý khách "}
                  {infoName}{" "}
                </span>
                vui lòng kiểm tra lại thông tin sản phẩm, địa chỉ giao hàng và
                ấn xác nhận để YATB giao hàng sớm nhất có thể. Xin cảm ơn và hẹn
                gặp lại.
                <div>
                  {infoPhone ? "- Số điện thoại: " : ""}
                  {infoPhone}
                </div>
                <div>
                  {infoAddress ? "- Địa chỉ nhận hàng: " : ""}
                  {infoAddress}
                </div>
                <div>
                  {infoNote ? "- Ghi chú: " : ""}
                  {infoNote}
                </div>
              </div>

              <Table bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>STT</th>
                    <th>Mô tả</th>
                    <th>Tên sản phẩm</th>
                    <th style={{ width: 100 }}>Size</th>
                    <th style={{ width: 100 }}>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {chooseLists.map((info, idx) => (
                    <tr className="text-center" key={info.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <img src={info.avatar} alt="" className="img-fluid" />
                      </td>
                      <td className="text-center">{info.nameProduct}</td>
                      <td>{info.size}</td>
                      <td>{info.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={removeAllProductAction}>
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </>
  );
};
export default Cart;
