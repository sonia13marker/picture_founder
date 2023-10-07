import './AddImgBtn.scss';
import { useState } from 'react';
import AddImageModal from '../AddImageModal/AddImageModal';

export default function AddImgBtn () {
    /* for modal */
    const [modalActive, setModalActive] = useState(false);
    return (<>
        <button className='add_btn' onClick={() => setModalActive(true)}>
            Добавить
        </button>

        <AddImageModal active={modalActive} setActive={setModalActive}/>
        </>
    )
}