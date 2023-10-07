import './EmptyTextComponent.scss';

export default function EmptyTextComponent ({image, text}) {
    return <span className='main_empty'>
    <img src={image} alt="тут ничего нет"/>
    <p className='main_empty__text'>
        {text}
    </p>
</span>
}