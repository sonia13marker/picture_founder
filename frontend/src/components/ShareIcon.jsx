import { useState } from "react";

const ShareIcon = () => {

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

    return <>
    <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")}
    xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
<path d="M13.5 14.0161C12.8667 14.0161 12.3 14.2721 11.8667 14.6732L5.925 11.1315C5.96667 10.9352 6 10.739 6 10.5341C6 10.3293 5.96667 10.133 5.925 9.93675L11.8 6.42922C12.25 6.85592 12.8417 7.12048 13.5 7.12048C14.8833 7.12048 16 5.97691 16 4.56024C16 3.14357 14.8833 2 13.5 2C12.1167 2 11 3.14357 11 4.56024C11 4.76506 11.0333 4.96135 11.075 5.15763L5.2 8.66516C4.75 8.23845 4.15833 7.9739 3.5 7.9739C2.11667 7.9739 1 9.11747 1 10.5341C1 11.9508 2.11667 13.0944 3.5 13.0944C4.15833 13.0944 4.75 12.8298 5.2 12.4031L11.1333 15.9533C11.0917 16.1325 11.0667 16.3203 11.0667 16.508C11.0667 17.882 12.1583 19 13.5 19C14.8417 19 15.9333 17.882 15.9333 16.508C15.9333 15.134 14.8417 14.0161 13.5 14.0161Z" />
</svg>
    </>
};

export default ShareIcon;