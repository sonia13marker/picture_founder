import { useState } from "react";

const EditIcon = () => {
    
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
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")}
    xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
    <path d="M2.69502 14.763L1.43302 17.917C1.39665 18.0078 1.38775 18.1074 1.40742 18.2033C1.42708 18.2991 1.47446 18.3871 1.54366 18.4563C1.61287 18.5255 1.70087 18.5729 1.79674 18.5926C1.89262 18.6123 1.99216 18.6034 2.08302 18.567L5.23802 17.305C5.74099 17.104 6.19789 16.8029 6.58102 16.42L17.5 5.49998C17.8978 5.10216 18.1213 4.56259 18.1213 3.99998C18.1213 3.43737 17.8978 2.89781 17.5 2.49998C17.1022 2.10216 16.5626 1.87866 16 1.87866C15.4374 1.87866 14.8978 2.10216 14.5 2.49998L3.58002 13.42C3.19714 13.8031 2.89605 14.26 2.69502 14.763Z" />
    </svg>
}

export default EditIcon;