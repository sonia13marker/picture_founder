import { useState } from "react";

const HomeIcon = () => {
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


    return <svg width="21" height="22" viewBox="0 0 21 22" fill={
        active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")
    } xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    >
    <path d="M9.42222 0.652601C9.72342 0.392655 10.1053 0.25 10.5 0.25C10.8947 0.25 11.2766 0.392655 11.5778 0.652601L19.9111 7.85803C20.0956 8.01747 20.2439 8.21593 20.3456 8.43964C20.4473 8.66335 20.5 8.90694 20.5 9.15349V19.8014C20.5 20.2519 20.3244 20.6839 20.0118 21.0025C19.6993 21.321 19.2754 21.5 18.8333 21.5H12.4444C12.2234 21.5 12.0115 21.4105 11.8552 21.2512C11.6989 21.092 11.6111 20.876 11.6111 20.6507V13.5732H9.38889V20.6507C9.38889 20.876 9.30109 21.092 9.14481 21.2512C8.98853 21.4105 8.77657 21.5 8.55556 21.5H2.16667C1.72464 21.5 1.30072 21.321 0.988155 21.0025C0.675595 20.6839 0.5 20.2519 0.5 19.8014V9.15349C0.5 8.65524 0.715556 8.18077 1.08889 7.85803L9.42222 0.652601ZM10.5 1.94806L2.16667 9.15349V19.8014H7.72222V12.7239C7.72222 12.4987 7.81002 12.2827 7.9663 12.1234C8.12258 11.9641 8.33454 11.8746 8.55556 11.8746H12.4444C12.6655 11.8746 12.8774 11.9641 13.0337 12.1234C13.19 12.2827 13.2778 12.4987 13.2778 12.7239V19.8014H18.8333V9.15349L10.5 1.94806Z" fill={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")} />
    </svg>
    
}

export default HomeIcon;