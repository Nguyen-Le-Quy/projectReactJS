import React, { useState, useEffect } from "react";
import settingService from "../services/settingService";
import detailService from "./../services/detailService";
import { Link } from "react-router-dom";
import api from "./../services/api";
import NumberFormat from "react-number-format";

const Home = () => {
  const [carousels, setCarousels] = useState([]);
  const [posters, setPosters] = useState([]);
  // hotProducts lúc mình đi ấy nó chỉ trả về cái items và details ko có dc cái lists
  const [hotProducts, setHotProducts] = useState([]);
  // thêm hotProductsId làm 1 cái mảng song song với th hotProducts thì mình sẽ lấy dc listId
  const [hotProductsId, setHotProductsId] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const [homeProductsId, setHomeProductsId] = useState([]);

  useEffect(() => {
    // get(1) là chỉ lấy đúng api có id là 1, res.value.items (cho carousel)có nghĩa là lúc tạo value là 1 object trong đó có items là 1 cái mảng chuỗi cho nên là mảng phải dùng usf dạng mảng để giữ giá trị, nếu mục ko có id thì ta dùng key={idx} thay cho key={lorem.id}, vd như TH này
    settingService.get(1).then((res) => setCarousels(res.value.items));

    // get(2) là chỉ lấy đúng api có id là 2 res.value.items (cho Poster)
    settingService.get(2).then((res) => setPosters(res.value.items));

    // get(3) là chỉ lấy đúng api có id là 3 res.value.items (cho hotProduct)
    // nếu chỉ có settingService.get(3) này thôi thì nó chỉ mới có 3 g.trị là listId, itemId, detailId thôi cho nên là ko thể setProducts liền dc, vậy làm thế nào để tham chiếu 3 g.trị này đến đc 1 trang hình detail dc? mà chỉ nằm trong nội bộ settingService.get(3) này thôi
    settingService.get(3).then((res) => {
      // do th hotProducts trên đường đi nó chỉ lấy dc itemId và detailId, thôi nên ta phải dùng HotProductsId để làm gì, nó ko phải trên đường đi nên nó luôn có 3 g.trị là listId, itemId, detailId, vì thế ta dùng thằng này để dẫn tới trang detail, vì sao gọi là mảng song song thì có nghĩa là thằng hotProduct có listId là 1 thì thằng hotProductsId này có listId cũng là 1
      setHotProductsId(res.value.items);
      // tạo trc 1 cái mảng
      const apiHotArray = [];
      // lặp từng phần tử và thêm vào mảng, element có thể hiểu là res.value.items. forEach chỉ dc dùng để duyệt mảng or tập hợp (đa số là mảng), và số lần lặp = với số p.tử có trong mảng, có thể dùng for of
      res.value.items.forEach((element) => {
        apiHotArray.push(
          // thêm nguyên cái api này vào mảng, và cái api này nó chính là địa chỉ dẫn tới trang detail
          detailService.get(element.listId, element.itemId, element.detailId)
        );
      });
      // sau khi có đủ hết phần tử rồi mới đưa vào promise, để chờ đủ hết rồi mới setHotProducts để nó render cùng 1 lúc.
      api.promise(apiHotArray).then(
        api.spread((...res) => {
          setHotProducts(res);
        })
      );
    });

    // get(4) là chỉ lấy đúng api có id là 4 res.value.items (cho homeProduct)
    settingService.get(4).then((res) => {
      setHomeProductsId(res.value.items);
      const apiHomeArray = [];
      res.value.items.forEach((element) => {
        apiHomeArray.push(
          detailService.get(element.listId, element.itemId, element.detailId)
        );
      });

      api.promise(apiHomeArray).then(
        api.spread((...res) => {
          setHomeProducts(res);
        })
      );
    });
  }, []);

  return (
    <main>
      <div className="container">
        {/*Loop Poster */}
        {posters.map((poster, idx) => (
          <div className="text-center mb-4 mb-xl-5" key={idx}>
            {/* nếu mà có poster.title thì thêm thẻ h3 ko thì để trống */}
            {poster.title ? <h3>{poster.title}</h3> : ""}
            <div>
              <img
                className="img-fluid"
                src={poster.image}
                alt={poster.description}
              />
            </div>
          </div>
        ))}

        {/* Loop Carousel*/}
        <div className="text-center mb-4 mb-xl-5">
          <h3>GU thời trang cá tính, độc đáo</h3>
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {carousels.map((carousel, idx) => (
                <div
                  // active chỉ áp dụng đúng th có idx = 0
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  data-bs-interval={2000}
                  key={idx}
                >
                  {/* bên trong carosels nó là 1 chuỗi gồm các hình ảnh */}
                  <img className="d-block img-fluid" src={carousel} alt={""} />
                </div>
              ))}

              <button
                className="carousel-control-prev opacity-0"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next opacity-0"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        {/* demo sản phẩm hot*/}
        <div className="text-center mb-4 mb-xl-5">
          <h3>Top sản phẩm hot</h3>
          <p>Những sản phẩm thời trang mới nhất/Hot nhất</p>
          <div className="row row-cols-2 row-cols-lg-4 g-3">
            {hotProducts.map((hotProduct, idx) => (
              <div className="col text-center" key={hotProduct.id}>
                {/* vấn đề khó ở đây là làm thế nào để lấy dc cái listId để nó đi đến trang detail, đã giải thích ở trên vì sao phải dùng hotProductsId và lúc này phải thêm idx vào vì sao vì th hotProducts nó có id nên ko cần idx nhưng trên đường đi nó ko lấy dc listId, nên buộc phải dùng hotProductsId mà thằng này lại ko có id, mà nó có listId cho nên là phải dùng idx để làm dữ liệu song song */}
                <Link
                  to={`/san-pham/${hotProductsId[idx].listId}/${hotProductsId[idx].itemId}/${hotProductsId[idx].detailId}`}
                >
                  <div className="body-image">
                    <img
                      src={hotProduct.avatar}
                      alt={hotProduct.name}
                      className="image-visible img-fluid"
                    />
                    <img
                      src={hotProduct.avatar1}
                      alt={hotProduct.name}
                      className="image-hidden img-fluid"
                    />
                  </div>
                </Link>
                <div>
                  <NumberFormat
                    value={hotProduct.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* demo sản phẩm tại nhà */}
        <div className="text-center">
          <h3>GU thời trang ở nhà</h3>
          <p>Những sản phẩm thời trang phổ biến tại nhà</p>
          <div className="row row-cols-2 row-cols-lg-4 g-3">
            {homeProducts.map((homeProduct, idx) => (
              <div className="col text-center" key={homeProduct.id}>
                <Link
                  to={`/san-pham/${homeProductsId[idx].listId}/${homeProductsId[idx].itemId}/${homeProductsId[idx].detailId}`}
                >
                  <div className="body-image">
                    <img
                      src={homeProduct.avatar}
                      alt={homeProduct.name}
                      className="image-visible img-fluid"
                    />
                    <img
                      src={homeProduct.avatar1}
                      alt={homeProduct.name}
                      className="image-hidden img-fluid"
                    />
                  </div>
                </Link>
                <div>
                  <NumberFormat
                    value={homeProduct.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                  />{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
