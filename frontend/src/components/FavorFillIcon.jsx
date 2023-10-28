import { useState } from "react"

const FavorFillIcon = () => {

    const [isHover, setIsHover] = useState(false);

    const handleMouseOn = () => {
        setIsHover(true);
    }

    const handleMouseDown = () => {
        setIsHover(false);
    }
    return <svg width="25" height="24" viewBox="0 0 25 24" fill={isHover ? "#765BAB"  : "#9E76E9"} 
    onMouseEnter={handleMouseOn}
    onMouseLeave={handleMouseDown}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 18.7494L17.5923 21.8186C18.5249 22.3811 19.6661 21.5496 19.4207 20.498L18.0709 14.7264L22.5743 10.8378C23.3964 10.1286 22.9546 8.78352 21.8748 8.69792L15.9481 8.19657L13.6289 2.74286C13.2117 1.75238 11.7883 1.75238 11.3711 2.74286L9.05193 8.18435L3.12517 8.6857C2.04535 8.77129 1.6036 10.1164 2.42574 10.8256L6.92909 14.7141L5.57932 20.4858C5.3339 21.5374 6.47508 22.3689 7.40765 21.8064L12.5 18.7494Z" />
    </svg>
}

export default FavorFillIcon;

