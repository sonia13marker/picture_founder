import { useState } from "react";

const DownloadIcon = () => {
    
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

    return <svg 
    width="21" 
    height="21" 
    viewBox="0 0 20 20" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
    <path d="M5 17.5H15M10 2.5V14.1667M10 14.1667L14.1667 10M10 14.1667L5.83333 10" strokeWidth="2" strokeLinecap="round" 
    stroke={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")}
    strokeLinejoin="round"/>
    </svg>


    
}

export default DownloadIcon;