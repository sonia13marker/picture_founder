import './MainPage.scss';
import empty_icon from '../../images/empty_main.svg';
import EmptyTextComponent from '../../components/EmptyTextComponent/EmptyTextComponent';

export default function MainPage () {
    return (
        <>
        <EmptyTextComponent image={empty_icon} text="Тут ещё нет картинок. Пора бы их добавить" />
        </>
    )
}