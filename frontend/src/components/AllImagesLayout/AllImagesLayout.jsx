import { useState } from 'react';
import ActionCircle from '../ActionCircle/ActionCircle';
import './AllImagesLayout.scss';


export default function AllImagesLayout({name, tags, image}) {
    /*функция для преобразования тегов */
    let newTagList = tags.split(", ").map(tag => "#" + tag).join(" ");

    // let newPathToImg = `${process.env.PUBLIC_URL}/assets/${image}`;

    /*для проверки наведения на карточку */
    const [isHover, setIsHover] = useState(false);

    const handleMouseHover = () => {
        setIsHover(true);
    }
    const handleMouseDown = () => {
        setIsHover(false);
    }


    return (
        <section className="layout">
            <span className='layout__card__wrapper'
            onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseDown}
            >
                    <div className='layout__card__wrapper__actions'>
                        <ActionCircle isHover={isHover} setIsHover={setIsHover}/>
                    </div>
                <div 
                className='layout__card'
                >
                    <span className='layout__card__titleWrap'>
                        <h3 className='layout__card__titleWrap__title'>{name}</h3>
                        {/*тут будет звездочка для добавления в
                        избранное */}
                    </span>
                    
                    <img src={image} 
                    alt={name} 
                    className='layout__card__image'/>
                    <p className='layout__card__tagList'>{newTagList}</p>
                </div>
            </span>
            
            
            
        </section>
    )
}