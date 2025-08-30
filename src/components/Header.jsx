import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import epet20 from "../assets/epet20.png";

const Header = () => {
    const navigate = useNavigate();
    void navigate;

    const [currentTime, setCurrentTime] = useState("");
    
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div 
            className="partedearriba" 
            style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "0 80px",
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "#4b81a7" // <-- Nuevo estilo de fondo
            }}
        >
            <div className="caja1" style={{ display: "flex", alignItems: "center", gap: "80px" }}>
                <h1 style={{ color: "white", margin: 0 }}>E.P.E.T.Nº20</h1>
                <img 
                    src={epet20} 
                    alt="Logo E.P.E.T 20" 
                    style={{ height: "80px", width: "auto", objectFit: "contain", position: "relative", top: "-5px" }}
                />
            </div>
            
            <div className="caja3">
                <div className="header-right" style={{ color: "white", fontSize: "1.8em" }}>
                    {currentTime}
                </div>
            </div>
        </div>
    );
}

export default Header;