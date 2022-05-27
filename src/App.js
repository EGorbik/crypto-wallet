import './App.css';
import Header from "./Components/Header";
import {Route, Routes} from "react-router-dom";
import Wallets from "./Components/Wallets";
import {Home} from "@mui/icons-material";
import Wallet from "./Components/Wallet";
import WalletProvider from "./Context/WalletsContext/WalletProvider";

function App() {
  return (
      <div>
          <WalletProvider>
              <Header />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="wallets" element={<Wallets />} />
                  <Route path="wallets/:id" element={<Wallet />} />
              </Routes>
          </WalletProvider>
      </div>
  );
}

export default App;
