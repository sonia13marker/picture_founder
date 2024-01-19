import { useState } from "react";


const LoginIcon = () => {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
  
    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
  
    const handleMouseDown = () => {
      setActive(true);
    };
  
    const handleMouseUp = () => {
      setActive(false);
    };

    return <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    >
    <path d="M4.16699 18.75C4.16699 17.645 4.60598 16.5852 5.38738 15.8038C6.16878 15.0224 7.22859 14.5834 8.33366 14.5834H16.667C17.7721 14.5834 18.8319 15.0224 19.6133 15.8038C20.3947 16.5852 20.8337 17.645 20.8337 18.75C20.8337 19.3026 20.6142 19.8325 20.2235 20.2232C19.8328 20.6139 19.3029 20.8334 18.7503 20.8334H6.25033C5.69779 20.8334 5.16789 20.6139 4.77719 20.2232C4.38649 19.8325 4.16699 19.3026 4.16699 18.75Z" stroke={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")}  strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M12.5 10.4167C14.2259 10.4167 15.625 9.01758 15.625 7.29169C15.625 5.5658 14.2259 4.16669 12.5 4.16669C10.7741 4.16669 9.375 5.5658 9.375 7.29169C9.375 9.01758 10.7741 10.4167 12.5 10.4167Z" stroke={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")}  strokeWidth="1.8"/>
    </svg>
    
}

export default LoginIcon;