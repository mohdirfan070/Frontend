import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Scanner from "./pages/Scanner.jsx";
import Login from "./pages/Login.jsx";
import BottomNavContext from "./context/BottomNavContext.jsx";
import Barcode from "../src/components/QrcodeScanner/Barcode.jsx";
import ChatWithAi from "./pages/ChatWithAi.jsx";
import ProductContextComponent from "./context/ProductContext.jsx";
import ScanIngredients from "./pages/ScanIngredients.jsx";

function App() {
  return (
    <>
      <BottomNavContext>
        <ProductContextComponent>
          <Routes>
            {/* <Route path='/'  element={ <>  <Home/> </>  }  /> */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/scan" element={<Scanner />} />
              <Route path="/barcode" element={<Barcode />} />
              <Route path="/scanitem" element={<ScanIngredients/>}/>
            </Route>
            <Route path="/chatwithai" element={<ChatWithAi />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ProductContextComponent>
      </BottomNavContext>
    </>
  );
}

export default App;
