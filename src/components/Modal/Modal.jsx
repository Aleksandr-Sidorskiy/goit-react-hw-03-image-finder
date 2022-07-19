import css from './Modal.module.css';

function Modal() {
    return (
        <div className={css.Overlay}>
            <div className={css.Modal}>
                <img src='' alt=''/>
            </div>
        </div>
    )
};

export default Modal;