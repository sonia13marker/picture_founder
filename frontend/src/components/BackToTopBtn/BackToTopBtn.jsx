import { useEffect, useState } from 'react';
import './BackToTopBtn.scss';
import ArrowTop from '../../icons/ArrowTop';

export default function BackToTopBtn ({sizeOfBtn}) { 
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
    
      useEffect(() => {
        const handleScrollVisibility = () => {
            const scrollY = window.scrollY;

            if (sizeOfBtn === "mobile") {
                if (scrollY < 450) {
                    setShowButton(true);
                  } else {
                    setShowButton(false);
                  }
            } else {
                if (scrollY < 250) {
                    setShowButton(true);
                  } else {
                    setShowButton(false);
                  }
            }
          };
      
          window.addEventListener('scroll', handleScrollVisibility);
      
          return () => {
            window.removeEventListener('scroll', handleScrollVisibility);
          };
      }, []);

    return (
        <button className={showButton ? 'button' : 'button active'} onClick={handleScroll}> 
            <ArrowTop value={sizeOfBtn}/>
        </button>
    )
}