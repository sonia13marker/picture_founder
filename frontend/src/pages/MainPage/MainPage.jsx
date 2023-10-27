import './MainPage.scss';
import empty_icon from '../../images/empty_main.svg';
import EmptyTextComponent from '../../components/EmptyTextComponent/EmptyTextComponent';
import AllImagesLayout from '../../components/AllImagesLayout/AllImagesLayout';

/*тут мы отображаем либо компонент с сеткой из всех картинок,
либо пустой компонент, если картинок еще нет */
export default function MainPage ({images = []}) {
    if(!images.length) return <EmptyTextComponent image={empty_icon} text="Тут ещё нет картинок. Пора бы их добавить" />;
    return (
        <> {
       images.map(image => <AllImagesLayout key={image.id} {...image}/>)
        
}
        </>
    )
}