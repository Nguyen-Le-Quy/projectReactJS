import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import detailService from "./../services/detailService";
import NumberFormat from "react-number-format";

const List = () => {
  const [details, setDetails] = useState([]); // grandChildren
  const [info, setInfo] = useState({}); // * lists into api
  const param = useParams();

  useEffect(() => {
    detailService.list(param.listid, param.id).then((res) => {
      setDetails(res.grandChildren);
      setInfo(res);
    });
  }, [param.listid, param.id]);

  return (
    <>
      <main>
        <div className="container">
          <div className="body-bar">
            <Link to="/home">
              <i className="bi bi-house-fill" />
            </Link>
            <span>{info.name}</span>
          </div>
          <div className="body-bar-sub">
            <a
              href="parent-Áo-khoác-có-nón-Nổi-Bật.html"
              style={{ fontWeight: "bold" }}
            >
              Nổi bật
            </a>
            <span />
            <a href="parent-Áo-khoác-có-nón-Bán-Chạy.html"> Bán chạy </a>
          </div>
          <div className="row row-cols-2 row-cols-lg-4 g-3">
            {details.map((gchild) => (
              <div className="col text-center" key={gchild.id}>
                <Link to={`/san-pham/${info.listId}/${info.id}/${gchild.id}`}>
                  <div className="body-image">
                    <img
                      src={gchild.avatar}
                      alt={gchild.name}
                      className="image-visible img-fluid"
                    />
                    <img
                      src={gchild.avatar1}
                      alt={gchild.name}
                      className="image-hidden img-fluid"
                    />
                  </div>
                </Link>
                <div>
                  <NumberFormat
                    value={gchild.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
export default List;
