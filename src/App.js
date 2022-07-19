import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./containers/DefaultLayout";
function App() {
  return (
    <Routes>
      <Route path="/*" element={<DefaultLayout />} />
    </Routes>
  );
}

export default App;
