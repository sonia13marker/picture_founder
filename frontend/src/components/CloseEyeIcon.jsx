import { useState } from "react";

const CloseEyeIcon = () => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseOn = () => {
        setIsHover(true);
    }

    const handleMouseDown = () => {
        setIsHover(false);
    }

    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={handleMouseOn}
    onMouseLeave={handleMouseDown}
    >
    <path d="M19.5 16L17.025 12.604M12 17.5V14M4.5 16L6.969 12.612M3 8C6.6 16 17.4 16 21 8" stroke={isHover ? "#765BAB" : "#B0AFAF" } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}

export default CloseEyeIcon;