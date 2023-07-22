import { useState } from 'react';
import ModalBox from '../ModalBox';

export default function FromModal() {
    const [close, setClose] = useState(true);

    const onClose = () => setClose(prev => !prev);

    return (
        <ModalBox onClose={onClose}>

        </ModalBox>
    )
}
