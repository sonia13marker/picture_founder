import EmptyTextComponent from '../../components/EmptyTextComponent/EmptyTextComponent';
import './FavoritePage.scss';
import empty from '../../images/empty_favorite.svg';

export default function FavoritePage ({favoriteArray, name, tags, image}) {
    if (!favoriteArray) return  <EmptyTextComponent image={empty} />
    return (
        <section className="layout">
            {/* <span className='layout__card__wrapper'
            onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseDown}
            >
                <div className='layout__card__wrapper__actions'>
                        <ActionCircle isHover={isHover} setIsHover={setIsHover}/>
                    </div>
            </span>
            <div>

            </div> */}
        </section>
    )
}