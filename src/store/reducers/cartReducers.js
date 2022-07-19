import ActionTypes from "../actions";
const initialValue = {
  lists: JSON.parse(localStorage.getItem("lists")) || [],
  amount: 0,
};

const cartReducer = (state = initialValue, action) => {
  // tạo biến chung để vào trong dùng lại ko cần khai báo
  let newList = state.lists;
  let amountCart = state.amount;
  // phân loại hành động được thực thi
  switch (action.type) {
    case ActionTypes.ADD_CART:
      // kiểm tra sản phẩm giỏ hàng xem có trong danh sách hiện tại chưa.
      // nếu có thì cập nhập số lượng
      // nếu chưa có thì thêm mới phần tử vào danh sách với số lượng = 1
      const idx = newList.findIndex(
        // phải thoả cả 2 đk để tìm đúng CHỈ MỤC của sản phẩm ta cần id và size, dùng findIndex để tìm 1 chỉ mục( là 1 object) trong 1 mảng là hợp lý nhất
        (currentValue) =>
          currentValue.id === action.detail.id &&
          currentValue.size === action.size
      );
      // trong variant có rất nhiều size ta phải tìm đúng size mà action ta gửi qua, dùng find nó sẽ tìm BÊN TRONG 1 đối tượng
      const variantSize = action.detail.variant.find(
        (currentValue) => currentValue.size === action.size
      );
      // nếu mà idx < 0 thì thêm mới và dữ liệu thêm mới được lấy từ action qua, xong rồi ta push vào mảng newList
      // ngc lại thì update quantity để update dc ta phải tìm đúng cái chỉ mục cần update là th nào (gồm id và size)
      if (idx < 0) {
        const productCart = {
          id: action.detail.id,
          avatar: action.detail.avatar,
          name: action.detail.name,
          nameProduct: action.detail.nameProduct,
          variant: variantSize,
          price: action.detail.price,
          size: action.size,
          quantity: 1,
        };
        newList.push(productCart);
      } else {
        newList[idx].quantity++;
      }
      // set lại và lưu vào localStorage
      localStorage.setItem("lists", JSON.stringify(newList));
      // amountCart ta để bằng 0 trong mỗi hành động để + chính xác giá trị trong 1 sản phẩm, nếu ta ko để thì nó sẽ lấy cái amount trong cái trị khởi tạo để nó cộng dồn => hiện thị ko đúng
      amountCart = 0;
      // duyệt từng phần tử của tùng chỉ mục lấy ra cái quantity cứ như thế đến chỉ mục cuối cùng nó ra được tổng số quantity và gán cho amountCart để biết tổng số lượng đã chọn bao nhiêu sản phẩm
      newList.forEach((element) => {
        amountCart += element.quantity;
      });
      // thực hiện xong hành động nó sẽ dc truyền xuống để render lại giá trị mới
      return {
        ...state,
        lists: newList,
        amount: amountCart,
      };
    case ActionTypes.UPDATE_CART:
      // tìm sản phẩm trong danh sách cập nhập lại số lượng
      // tìm bên trong newList và tìm đúng cái id và size, phải thoả 2 đk là size và id trong newList có bằng với size và id từ action truyền vào ko nếu bằng thì tìm đc đối tượng cần update
      const updateItem = newList.find(
        (currentValue) =>
          currentValue.size === action.detail.size &&
          currentValue.id === action.detail.id
      );
      // sau khi tìm đúng rồi ta truy cập đến quantity để cập nhập lại số lượng
      // dùng toán tử bật 3 để k.tr xem có được truyền hay ko nếu có thì dc gán g.trị mới còn ko truyền thì bằng 0, khắc phục đc tình trạng người dùng ko nhập g.trị
      updateItem.quantity = action.quantity ? Number(action.quantity) : 0;
      // lưu lại giá trị mới vào localStorage
      localStorage.setItem("lists", JSON.stringify(newList));
      amountCart = 0;
      newList.forEach((element) => {
        amountCart += element.quantity;
      });
      return {
        ...state,
        lists: newList,
        amount: amountCart,
      };
    case ActionTypes.REMOVE_CART:
      // tìm sản phẩm đó trong danh sách và xoá nó ra khỏi danh sách
      // tìm đúng CHỈ MỤC có id và size cần xoá
      const deleteItemIndex = newList.findIndex(
        (currentValue) =>
          currentValue.id === action.detail.id &&
          currentValue.size === action.detail.size
      );
      // nếu có chỉ mục(có sản phẩm trong giỏ hàng) thì ta tiến hành cắt phần tử đó ra khỏi mảng
      if (deleteItemIndex >= 0) {
        newList.splice(deleteItemIndex, 1);
      }
      // lưu lại giá trị mới vào localStorage
      localStorage.setItem("lists", JSON.stringify(newList));
      // vì sao delete cũng phải cần forEach vì khi xoá nó đã mất đi 1 sản phẩm ta phải cần cập nhập lại tổng số quantity để render cho chính xác
      amountCart = 0;
      newList.forEach((element) => {
        amountCart += element.quantity;
      });
      return {
        ...state,
        lists: newList,
        amount: amountCart,
      };
    case ActionTypes.CHECK_OUT:
      // remove localStorage
      localStorage.removeItem("lists");
      // ta render lại như g.trị khởi tạo ban đầu
      return {
        ...state,
        lists: [],
        amount: 0,
      };
    default:
      return { ...state };
  }
};

export default cartReducer;
