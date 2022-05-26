import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import Wallets from "./Wallets";
import {Home} from "@mui/icons-material";


function App() {
  return (
      <div>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="wallets" element={<Wallets />} />
          </Routes>
      </div>
  );
}

export default App;
