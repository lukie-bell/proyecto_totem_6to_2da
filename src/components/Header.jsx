import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


const Header = () =>{

    //Reloj
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

    return(
            <div className="partedearriba">
                <div className="caja1">
                    <h1>E.P.E.T.Nº20</h1>
                </div>
                <div className="caja2">
                </div> 
                <div className="caja3">
                    <div className="header-right">
                        {currentTime}
                    </div>
                </div>
            </div>
    );
}

export default Header;