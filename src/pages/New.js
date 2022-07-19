import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import detailService from "./../services/detailService";
import api from "./../services/api";
import NumberFormat from "react-number-format";

const New = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    // JSON.stringtify biến đối tượng thành chuỗi
    // JSON.parse biến chuỗi thành đối tượng
    //  và bản thân của productCategory nó là mảng do dữ liệu trên API là mảng nếu nó chưa lưu dữ liệu kịp thì nó chọn mảng trống xử lý
    const listArr = JSON.parse(localStorage.getItem("productCategory")) || [];
    // mục tiêu là lấy được danh sách items từ th listArr này ra (dùng map() trả về cho mình 1 cái danh sách mảng 2 chiều là mảng lồng mảng) (còn dùng flatMap() nó trả về cho mình mảng 1 chiều và chứa all các mục sản phẩm của children)
    const itemList = listArr.flatMap((item) => item.children);
    // lấy 10 phần tử trong cái itemList
    const topItem = itemList.slice(0, 10);
    // tạo 1 cái mảng để lưu giá trị mới (là danh sách các details)
    const apiArray = [];
    // ta duyệt từng phần tử mảng bằng forEach từ topItem và push vào mảng apiArray từ cái api
    topItem.forEach((element) => {
      apiArray.push(detailService.list(element.listId, element.id));
    });
    // console.log(topItem);

    api.promise(apiArray).then(
      api.spread((...res) => {
        let detailList = [];
        // const one = async () => {}
        // const two = async () => {}
        // const three = async () => {}
        // có nghĩa là thực hiện trình tự bất đồng bộ, làm async 1 trc xong rồi mới đến 2 xong 2 mới đến 3
        const one = async () => {
          // mục tiêu là lấy dc grandChildren
          // res.flatMap() là response từ cái apiArray và flatMap thành mảng 1 chiều
          // việc ta gán bằng detailList là gì nếu mà dữ liệu về chưa kịp thì nó sẽ lấy mảng trống để show tránh tình trang lỗi, ngược lại nếu mà dữ liệu về rồi thì nó sẽ dc gán lại giá trị mới, ta thấy gì dùng let nó có phạm vi khối nhưng đang dùng async cho nên là phạm vi khối lúc này ko có tác dụng
          detailList = res.flatMap((item) => {
            // duyệt 1 phần tử cha và chỉ lấy ra phần tử con và duyệt tiếp
            return item.grandChildren.map((x) => {
              // x đang nhận là 1 grandChildren (là 1 detail), do nó chưa có cái listId nên ko đủ tham số ko thể xô cái detail ra dc cho nên là ta thêm 1 thuộc tính mới là x.listId và dc gán bằng giá trị lấy từ res.flapMap (item) là chỉ lấy ra cái listId để gán
              x.listId = item.listId;
              return x;
            });
          });
          // console.log("1");
        };
        const two = async () => {
          // console.log("2");
          detailList.sort((a, b) => {
            // do nó là dạng chuỗi nên ko thể sắp xếp = cách b - a hay a - b, mà phải so sánh 2 chuỗi với nhau bằng localCompare
            return b.createdDate.localeCompare(a.createdDate);
          });
        };
        const three = async () => {
          // console.log("3");
          // lấy 20 sản phẩm đầu từ detailList để render
          setNewProducts(detailList.slice(0, 20));
          // console.log(detailList);
        };

        one().then(two).then(three);
      })
    );
  }, []);

  return (
    <>
      <main>
        <div className="container">
          <div className="body-bar d-flex align-content-center">
            <Link to="/home">
              <i className="bi bi-house-fill" />
            </Link>
            <span> NEW </span>
          </div>
          <div className="row row-cols-2 row-cols-lg-4 g-3 mt-5">
            {newProducts.map((newProduct, idx) => (
              <div className="col text-center" key={newProduct.id}>
                <Link
                  to={`/san-pham/${newProduct.listId}/${newProduct.itemId}/${newProduct.id}`}
                >
                  <div className="body-image">
                    <img
                      src={newProduct.avatar}
                      alt={newProduct.name}
                      className="image-visible img-fluid"
                    />
                    <img
                      src={newProduct.avatar1}
                      alt={newProduct.name}
                      className="image-hidden img-fluid"
                    />
                  </div>
                </Link>
                <div>
                  {" "}
                  <NumberFormat
                    value={newProduct.price}
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
export default New;
