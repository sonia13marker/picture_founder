import { useState } from "react";

const DevelopersIcon = () => {
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

    return <svg width="29" height="19" viewBox="0 0 29 19" fill={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")} xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    >
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.042 0.0477351C17.658 0.23472 18.0147 0.916834 17.8387 1.57128L13.392 18.1059C13.216 18.7603 12.574 19.1392 11.958 18.9523C11.342 18.7653 10.9853 18.0832 11.1613 17.4287L15.608 0.894149C15.784 0.239703 16.426 -0.13925 17.042 0.0477351ZM22.6687 2.63246C23.1689 2.20727 23.8989 2.29344 24.2991 2.82492L28.7458 8.73013C29.0847 9.18022 29.0847 9.81978 28.7458 10.2699L24.2991 16.1751C23.8989 16.7066 23.1689 16.7927 22.6687 16.3675C22.1684 15.9424 22.0873 15.1668 22.4875 14.6353L26.3545 9.5L22.4875 4.36467C22.0873 3.83318 22.1684 3.05764 22.6687 2.63246ZM6.33132 2.63246C6.83159 3.05764 6.9127 3.83318 6.51248 4.36467L2.64554 9.5L6.51248 14.6353C6.9127 15.1668 6.83159 15.9424 6.33132 16.3675C5.83105 16.7927 5.10107 16.7066 4.70086 16.1751L0.254193 10.2699C-0.0847312 9.81978 -0.0847312 9.18022 0.254193 8.73013L4.70086 2.82492C5.10107 2.29344 5.83105 2.20727 6.33132 2.63246Z" fill={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")} />
    </svg>
    
}

export default DevelopersIcon;