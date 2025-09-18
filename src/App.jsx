
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Members from "./Members";
import MemberDetails from "./MemberDetails";
import "./App.css";
import Booklist from "./Booklist";
import DonationTable from "./DonationTable";
import AddDonation from "./add-donation";
import FullDetails from "./FullDetails";
import MemberFullDetails from "./MemberFullDetails";
import BookSales from "./BookSales";
import DonationFullDetails from "./DonationFullDetails";
import Management from "./Management";
import BookSalesType from "./BookSalesType";
import SalesType from "./SalesType";
import StoreManager from "./StoreManager";
import Treasure from "./Treasure";
import Expenditure from "./Expenditure";

function HomePage() {
  return (
    <div className="parent">
      {/* Header */}
      <div className="heder">
        <p>ಬ್ರಹ್ಮಶ್ರೀ ಮಿತ್ತೂರು ಪುರೋಹಿತ ತಿಮ್ಮಯ್ಯ ಭಟ್ಟ ಸಂಪ್ರತಿಷ್ಠಾನ (ರಿ.)</p>
        <div className="image1">
          <img src="./bell.png" alt="bell" />
        </div>
        <div className="image2">
          <img src="./message.png" alt="message" />
        </div>
        <div className="image3">
          <img src="./Ellipse 40.png" alt="profile" />
        </div>
      </div>

      {/* Main Home Page */}
      <div className="main">
        <div className="layer">
          <div className="text1">
            {/* Navigate to Members */}
            <Link to="/MemberDetails">
              <img src="./Layer_1.png" alt="MemberDetails" />
              <p style={{ color: "black" }}>ಸದಸ್ಯರು</p>
            </Link>
          </div>

          <div className="text2">
            <Link to="/DonationTable">
              <img
                src="./Layer_2.png"
                alt="help"
              />
              <p style={{ color: "black" }}>ಸಹಾಯ ಧನ</p>
            </Link>
          </div>

          <div className="text3">
            <Link to="/Booklist">
              <img src="./Layer_3.png" alt="book" />
              <p style={{ color: "black" }}>ಪುಸ್ತಕ ಮಾರಾಟ</p>
            </Link>
          </div>
        </div>

        <div className="layer1">
          <div className="text4">
            <Link to="/FullDetails">
              <img
                src="./Layer_4.png"
                alt="report"
              />
              <p style={{ color: "black" }}>ಪೂರ್ಣವರದಿ</p>
            </Link>
          </div>
          <div className="text5">
            <Link to="/Management">
              <img
                src="./Layer_5.png"
                alt="settings"
              />
              <p style={{ color: "black" }}>ನಿರ್ವಹಣೆ</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Members" element={<Members />} />
        <Route path="/MemberDetails" element={<MemberDetails />} />
        <Route path="/Booklist" element={<Booklist />} />
        <Route path="/DonationTable" element={<DonationTable />} />
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/FullDetails" element={<FullDetails />} />
        <Route path="/MemberFullDetails/:id" element={<MemberFullDetails />} />
        <Route path="/BookSales" element={<BookSales />} />
        <Route path="/DonationFullDetails/:id" element={<DonationFullDetails />} />
        <Route path="/Management" element={<Management />} />
        <Route path="/BookSalesType" element={<BookSalesType />} />
        <Route path="/SalesType" element={<SalesType />} />
        <Route path="/StoreManager" element={<StoreManager />} />
        <Route path="/Treasure" element={<Treasure />} />
        <Route path="/Expenditure" element={<Expenditure />} />


      </Routes>
    </Router>
  );
}

export default App;
