import { useState } from "react";

const FavoriteIcon = () => {
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


    return <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    >
    <path d="M18.1088 20.9623L18.1086 20.9622L13.0677 17.924C12.719 17.7138 12.2828 17.7134 11.9337 17.923L11.9337 17.923L6.89296 20.949L6.89117 20.9501C6.71157 21.0584 6.51011 20.8984 6.55309 20.7133C6.55311 20.7132 6.55313 20.7131 6.55315 20.713L7.88904 15.0008L6.91532 14.7731L7.88904 15.0008C7.98222 14.6023 7.84655 14.1851 7.53683 13.9177L3.07929 10.0687L3.07894 10.0684C2.92964 9.93963 3.00949 9.698 3.20419 9.68257L3.20419 9.68258L3.20946 9.68214L9.07625 9.18586L9.07626 9.18586C9.48209 9.15153 9.83576 8.89576 9.99546 8.52106C9.99546 8.52106 9.99546 8.52105 9.99546 8.52105L12.291 3.13493L12.291 3.13493L12.2927 3.13104C12.3152 3.07767 12.3432 3.05117 12.3702 3.03436C12.402 3.01454 12.4471 3 12.5 3C12.5529 3 12.598 3.01454 12.6298 3.03436C12.6568 3.05117 12.6848 3.07767 12.7073 3.13104L12.7087 3.13419L15.0042 8.53247L15.9245 8.14114L15.0042 8.53247C15.1638 8.90758 15.5176 9.16374 15.9238 9.19809L21.7905 9.69438L21.7958 9.6948C21.9905 9.71023 22.0704 9.95186 21.9211 10.0807L21.9207 10.081L17.4632 13.9299C17.1534 14.1973 17.0178 14.6146 17.111 15.013L18.4468 20.7253C18.4901 20.9105 18.2885 21.0707 18.1088 20.9623Z" stroke={active ? "#9E76E9" : (hovered ? "#765BAB" : "#C5C5C5")} strokeWidth="2"/>
    </svg>


}

export default FavoriteIcon;