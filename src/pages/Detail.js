import React, { useEffect, useState } from "react";
import detailService from "./../services/detailService";
import { Link, useParams } from "react-router-dom";
import parser from "html-react-parser";
import { useDispatch } from "react-redux";
import ActionTypes from "./../store/actions";
import NumberFormat from "react-number-format";

const Detail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [returnList, setReturnList] = useState({});
  const [product, setProduct] = useState({});
  const [variants, setVariants] = useState([]);
  useEffect(() => {
    detailService
      .list(param.listid, param.itemid)
      .then((res) => setReturnList(res));

    detailService.get(param.listid, param.itemid, param.id).then((res) => {
      setVariants(res.variant);
      setProduct(res);
    });
  }, [param.listid, param.itemid, param.id]);

  const handleAddProductAction = (e, detail, size) => {
    e.preventDefault();
    dispatch({
      type: ActionTypes.ADD_CART,
      detail: detail,
      size: size,
    });
  };
  return (
    <>
      <main>
        <div className="container">
          <div className="body-bar d-flex align-content-center">
            <Link to={`/lists/${returnList.listId}/${returnList.id}`}>
              <i className="bi bi-chevron-left" />
            </Link>
            <span>{product.nameProduct}</span>
          </div>
          <div className="row mt-3 gx-2">
            <div className="col-md-3 col-lg-4">
              <img
                src={product.avatar}
                alt={product.name}
                className="img-fluid"
              />
            </div>
            <div className="col-md-9 col-lg-8">
              <div className="row">
                <div className="col-md-8 child-detail">
                  <h5>{product.nameProduct}</h5>
                  <div>
                    {product.material} <span>{product.valueMaterial}</span>
                  </div>
                  <p>{product.classify}</p>
                  <p>
                    <NumberFormat
                      value={product.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" đ"}
                    />
                  </p>
                  <table>
                    <tbody>
                      {variants.map((variant, idx) => (
                        <tr key={idx}>
                          <td>
                            {variant.color}, {variant.size}
                          </td>
                          <td>
                            <span>{variant.stock}</span> {product.status}
                          </td>
                          <td>
                            <a
                              href="/#"
                              onClick={(e) =>
                                handleAddProductAction(e, product, variant.size)
                              }
                            >
                              {parser(product.iconBuy ?? "")}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="row mt-5">
                    <p>Hướng dẫn chọn size</p>
                    <div className="col">
                      <div className="row gx-2">
                        <div className="col-lg-5 col-xl-4 mb-2 mb-lg-0">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Cân nặng"
                              aria-label="Cân nặng khách"
                              aria-describedby="kg"
                            />
                            <span className="input-group-text" id="kg">
                              Kg
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-5 col-xl-4 mb-2 mb-lg-0">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Chiều cao"
                              aria-label="Chiều cao khách"
                              aria-describedby="cm"
                            />
                            <span className="input-group-text" id="cm">
                              Cm
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-2 col-xl-4 text-center text-lg-start">
                          <button className="btn btn-secondary ms-md-2">
                            Tìm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mt-5 mt-md-0">
                  {parser(product.description ?? "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Detail;
