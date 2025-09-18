import React, { useState, useEffect } from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { useNavigate } from "react-router-dom";

function AddDonation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    donorName: "",
    amount: "",
    donationType: "",
    cheque: "",
    receipt: "",
    deposit: "",
    plan: "",
    paymentMethod: "",
    date: "",
    note: ""
  });

  const [editIndex, setEditIndex] = useState(null);

  // Load data if editing
  useEffect(() => {
    const index = localStorage.getItem("editDonationIndex");
    if (index !== null) {
      const donationsList =
        JSON.parse(localStorage.getItem("donationsList")) || [];
      const donation = donationsList[index];

      if (donation) {
        setFormData(donation);
        setEditIndex(Number(index));
      }

      localStorage.removeItem("editDonationIndex");
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save donation
  const handleSubmit = (e) => {
    e.preventDefault();

    let existingDonations =
      JSON.parse(localStorage.getItem("donationsList")) || [];

    if (editIndex !== null) {
      existingDonations[editIndex] = formData;
    } else {
      existingDonations.push(formData);
    }

    localStorage.setItem("donationsList", JSON.stringify(existingDonations));
    navigate("/DonationTable");
  };

  // Cancel reset
  const handleCancel = () => {
    if (window.confirm("ನೀವು ಖಚಿತವಾಗಿ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?")) {
      setFormData({
        donorName: "",
        amount: "",
        donationType: "",
        cheque: "",
        receipt: "",
        deposit: "",
        plan: "",
        paymentMethod: "",
        date: "",
        note: ""
      });
      setEditIndex(null);
    }
  };

  return (
    <div className="members-wrapper">
      {/* Header */}
      <div className="members-header">
        <p>ಬ್ರಹ್ಮಶ್ರೀ ಮಿತ್ತೂರು ಪುರೋಹಿತ ತಿಮ್ಮಯ್ಯ ಭಟ್ಟ ಸಂಪ್ರತಿಷ್ಠಾನ (ರಿ.)</p>
        <div className="members-header-icon1">
          <img src="./bell.png" alt="bell" />
        </div>
        <div className="members-header-icon2">
          <img src="./message.png" alt="message" />
        </div>
        <div className="members-header-icon3">
          <img src="./Ellipse 40.png" alt="profile" />
        </div>
      </div>

      {/* Back Button */}
      <div className="members-back-btn" onClick={() => navigate("/DonationTable")}>
        <span>←</span> Back
      </div>

      {/* Donation Form */}
      <div className="members-form-card">
        <div className="members-form-header">
          <h2>{editIndex !== null ? "ಸಹಾಯ ಧನ ತಿದ್ದುಪಡಿ" : "ಹೊಸ ಸಹಾಯ ಧನ"}</h2>
          {editIndex === null && (
            <span>Donation ID: {Math.floor(Math.random() * 100000)}</span>
          )}
        </div>

        <form className="members-main-form" onSubmit={handleSubmit}>
          {/* Donor Info */}
          <div className="members-row members-row-2">
            <ReactTransliterate
              value={formData.donorName}
              onChangeText={(txt) =>
                setFormData({ ...formData, donorName: txt })
              }
              lang="kn"
              placeholder="ದಾನಿದಾರರ ಹೆಸರು"
              className="members-input-name"
            />

            <input
              type="number"
              name="amount"
              placeholder="ಮೊತ್ತ"
              value={formData.amount}
              onChange={handleChange}
              className="members-input-mobile"
            />
          </div>

          {/* Donation Type + Cheque */}
          <div className="members-row members-row-3">
            <input
              type="text"
              name="donationType"
              placeholder="ದಾನ ಪ್ರಕಾರ (ನಗದು/ಚೆಕ್/ಆನ್‌ಲೈನ್)"
              value={formData.donationType}
              onChange={handleChange}
              className="members-input-pan"
            />

            {formData.donationType === "Cheque/DD" && (
              <input
                type="text"
                name="cheque"
                placeholder="Cheque/DD ಸಂಖ್ಯೆ"
                value={formData.cheque}
                onChange={handleChange}
                className="members-input-aadhaar"
              />
            )}
          </div>

          {/* Receipt + Deposit */}
          <div className="members-row members-row-3">
            <input
              type="text"
              name="receipt"
              placeholder="ರಸೀದಿ ಸಂಖ್ಯೆ"
              value={formData.receipt}
              onChange={handleChange}
              className="members-input-pan"
            />

            <input
              type="text"
              name="deposit"
              placeholder="ಜಮಾ ವಿವರ"
              value={formData.deposit}
              onChange={handleChange}
              className="members-input-aadhaar"
            />
          </div>

          {/* 🔹 Cash Details Section */}
          <h3 className="members-section-title">ನಗದು ಮತ್ತು ವಿವರ</h3>

          <div className="members-row members-row-3">
            {/* ಯೋಜನೆ ಆಯ್ಕೆ */}
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="members-input-pan"
            >
              <option value="">ಯೋಜನೆ ಆಯ್ಕೆ</option>
              <option value="ಮಿತ್ತೂರು ಶ್ರದ್ಧಾ ನಿಧಿ">ಮಿತ್ತೂರು ಶ್ರದ್ಧಾ ನಿಧಿ</option>
              <option value="ಜನಸೇವಾ ಯೋಜನೆ">ಜನಸೇವಾ ಯೋಜನೆ</option>
              <option value="ಶಿಕ್ಷಣ ನಿಧಿ">ಶಿಕ್ಷಣ ನಿಧಿ</option>
            </select>

            {/* ಪಾವತಿ ವಿಧಾನ */}
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="members-input-aadhaar"
            >
              <option value="">ಪಾವತಿ ವಿಧಾನ</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
              <option value="Online">Online</option>
            </select>

            {/* ಮೊತ್ತ */}
            <input
              type="number"
              name="amount"
              placeholder="₹ ಮೊತ್ತ"
              value={formData.amount}
              onChange={handleChange}
              className="members-input-mobile"
            />
          </div>

          <div className="members-row members-row-3">
            <input
              type="text"
              name="cheque"
              placeholder="Cheque/DD ಸಂಖ್ಯೆ"
              value={formData.cheque}
              onChange={handleChange}
              className="members-input-pan"
            />

            <input
              type="text"
              name="receipt"
              placeholder="ರಸೀದಿ ಸಂಖ್ಯೆ"
              value={formData.receipt}
              onChange={handleChange}
              className="members-input-aadhaar"
            />

            <input
              type="text"
              name="deposit"
              placeholder="ಜಮಾ ವಿವರ"
              value={formData.deposit}
              onChange={handleChange}
              className="members-input-aadhaar"
            />
          </div>

          {/* Date + Note */}
          <div className="members-row members-row-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="members-input-dob"
            />
            <ReactTransliterate
              value={formData.note}
              onChangeText={(txt) => setFormData({ ...formData, note: txt })}
              lang="kn"
              placeholder="ಟಿಪ್ಪಣಿ"
              className="members-input-address"
            />
          </div>

          {/* Buttons */}
          <div className="members-form-actions">
            <button
              type="button"
              className="members-cancel-btn"
              onClick={handleCancel}
            >
              ರದ್ದು ಮಾಡಿ
            </button>
            <button type="submit" className="members-save-btn">
              {editIndex !== null ? "ತಿದ್ದುಪಡಿ ಉಳಿಸಿ" : "ಉಳಿಸಿ 🔒"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDonation;