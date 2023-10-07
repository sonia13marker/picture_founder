import EmptyTextComponent from '../../components/EmptyTextComponent/EmptyTextComponent';
import './FavoritePage.scss';
import empty from '../../images/empty_favorite.svg';

export default function FavoritePage () {
    return (
        <EmptyTextComponent image={empty} />
    )
}