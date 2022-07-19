import NotFound from "./pages/NotFound";
import NoInternet from "./pages/NoInterner";
import Home from "./pages/Home";
import New from "./pages/New";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Introduce from "./pages/Introduce";
import RuleActive from "./pages/RuleActive";
import BuySellCondition from "./pages/BuySellCondition";
import Transport from "./pages/Transport";
import ExchangePolicy from "./pages/ExchangePolicy";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import ClientVIP from "./pages/ClientVIP";
import PartnerSupply from "./pages/PartnerSupply";

const routes = [
  { path: "", component: <Home /> },
  { path: "home", component: <Home /> },
  { path: "new", component: <New /> },
  { path: "cart", component: <Cart /> },
  { path: "lists/:listid/:id", component: <List /> },
  { path: "san-pham/:listid/:itemid/:id", component: <Detail /> },
  { path: "gioi-thieu", component: <Introduce /> },
  { path: "quy-che-hoat-dong", component: <RuleActive /> },
  { path: "dieu-kien-mua-ban", component: <BuySellCondition /> },
  { path: "van-chuyen", component: <Transport /> },
  { path: "chinh-sach-doi-tra", component: <ExchangePolicy /> },
  { path: "chinh-sach-bao-hanh", component: <WarrantyPolicy /> },
  { path: "khach-hang-VIP", component: <ClientVIP /> },
  { path: "doi-tac-cung-cap", component: <PartnerSupply /> },
  { path: "no-internet", component: <NoInternet /> },
  { path: "*", component: <NotFound /> },
];
export default routes;
