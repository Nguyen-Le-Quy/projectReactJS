import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import listService from "./../services/listService";
const Header = (props) => {
  const [lists, setLists] = useState([]);
  const acceptQuantity = useSelector((state) => state.auth.amount);

  useEffect(() => {
    listService.list().then((res) => {
      setLists(res);
      // bởi vì mock api bị hạn chế nên ta dùng mẹo là lưu cái danh sách lấy dc từ lists bỏ vào localStorage để dùng cho trang new
      localStorage.setItem("productCategory", JSON.stringify(res));
    });
  }, []);
  return (
    <>
      <header>
        <div className="container">
          <div className="d-none d-lg-block">
            <div className="header-main">
              <div className="header-icon">
                <a href="/#" title="Tìm kiếm">
                  <i className="bi bi-search fs-5 me-2" />
                  Search
                </a>
              </div>
              <h1>
                <Link to="/home">YATB</Link>
              </h1>
              <div className="header-icon ">
                <a href="/#" title="Khách hàng">
                  <i className="bi bi-person-circle" />
                </a>
                <Link to="/cart" title="Giỏ hàng">
                  <div className="position-relative">
                    <i className="bi bi-cart-plus" />
                    <div className="position-absolute top-0 start-100 translate-middle rounded-circle bg-danger badge">
                      {acceptQuantity ? acceptQuantity : ""}
                    </div>
                  </div>
                </Link>
                <a href="/#" title="Thông báo">
                  <i className="bi bi-bell" />
                </a>
              </div>
            </div>
            <nav className="header-sub">
              <ul>
                <li className="header-menu">
                  <span /> <span /> <span /> <span />
                  <Link to="/new"> NEW </Link>
                </li>
                {lists.map((list) => {
                  return (
                    <li className="header-menu" key={list.id}>
                      <span /> <span /> <span /> <span />
                      <Link to="/new">
                        {list.name} <i className="bi bi-chevron-down" />
                      </Link>
                      <ul className="header-menu-item">
                        {list.children.map((child) => (
                          <li key={`t${child.id}`}>
                            <Link to={`/lists/${list.id}/${child.id}`}>
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Response */}
          <div className="d-block d-lg-none">
            <div className="header-main">
              <h1>
                <Link to="/home">YATB</Link>
              </h1>
              <div className="header-icon">
                <a href="/#">
                  <i className="bi bi-person-circle" />
                </a>
                <Link to="/cart">
                  <div className="position-relative">
                    <i className="bi bi-cart-plus" />
                    <div className="position-absolute top-0 start-100 translate-middle rounded-circle bg-danger badge">
                      {acceptQuantity ? acceptQuantity : ""}
                    </div>
                  </div>
                </Link>
                <a href="/#">
                  <i className="bi bi-bell" />
                </a>

                <a
                  href="/#offcanvasRight"
                  className="btn bg-black"
                  role="button"
                  data-bs-toggle="offcanvas"
                  aria-controls="offcanvasRight"
                >
                  <i className="bi bi-list" />
                </a>
                <div
                  style={{ width: "19rem" }}
                  className="offcanvas offcanvas-end"
                  tabIndex={-1}
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                      Danh mục sản phẩm
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    />
                  </div>
                  <div className="offcanvas-body">
                    <div
                      className="accordion accordion-flush bg-secondary"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            SẢN PHẨM MỚI
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            <div>
                              <Link
                                to="/new"
                                style={{
                                  fontSize: 17,
                                  paddingLeft: 20,
                                  color: "black",
                                }}
                              >
                                New
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      {lists.map((list) => {
                        return (
                          <div className="accordion-item" key={list.id}>
                            <h2
                              className="accordion-header"
                              id="flush-headingOne"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne"
                              >
                                {list.name}
                              </button>
                            </h2>
                            <div
                              id="flush-collapseOne"
                              className="accordion-collapse collapse"
                              aria-labelledby="flush-headingOne"
                              data-bs-parent="#accordionFlushExample"
                            >
                              <div className="accordion-body">
                                {list.children.map((child) => (
                                  <div key={`t${child.id}`}>
                                    <Link
                                      to={`/lists/${list.id}/${child.id}`}
                                      style={{
                                        fontSize: 17,
                                        paddingLeft: 20,
                                        color: "black",
                                      }}
                                    >
                                      {child.name}
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
