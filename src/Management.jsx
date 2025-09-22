import React from "react";
import { useNavigate } from "react-router-dom";



import "./Management.css";

function Management() {
    const navigate = useNavigate();
    // Back button
    const handleBack = () => {
        navigate(-1);
    };

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
            <div className="mains">
                <div className="layers">
                    <div className="texts1" style={{ cursor: 'pointer' }} onClick={() => navigate('/Expenditure')}>
                        {/* Navigate to Members */}
                        <img src="./rupee.png" alt="MemberDetails" />
                        <p style={{ color: "black" }}>ಖರ್ಚು ವಿಭಾಗ</p>
                    </div>

                    <div className="texts2" style={{ cursor: 'pointer' }} onClick={() => navigate('/Treasure')}>
                        <img
                            src="./Layer_2.png"
                            alt="help"
                        />
                        <p style={{ color: "black" }}>ಸಹಾಯ ಧನ</p>

                    </div>

                    <div className="texts3" style={{ cursor: 'pointer' }} onClick={() => navigate('/BookSalesType')}>
                        <img src="./Layer_3.png" alt="book" />
                        <p style={{ color: "black" }}>ನಿರ್ವಾಹಕ ಹಂತ <br />ಪುಸ್ತಕ ಮಾರಾಟದ ಪ್ರಕಾರ</p>
                    </div>

                    <div className="texts4" style={{ cursor: 'pointer' }} onClick={() => navigate('/StoreManager')}>
                        <img
                            src="./home.png"
                            alt="home"
                        />
                        <p style={{ color: "black" }}>ಅಂಗಡಿಯ <br />ನಿರ್ವಾಹಕರ ಹೆಸರು</p>
                    </div>

                    <div className="texts5" style={{ cursor: 'pointer' }} onClick={() => navigate('/SalesType')}>
                        <img
                            src="./Layer_3.png"
                            alt="home"
                        />
                        <p style={{ color: "black" }}>ಪುಸ್ತಕ ಮಾರಾಟ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Management;

