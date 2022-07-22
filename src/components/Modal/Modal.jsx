import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string.isRequired,
    currentImageDescription: PropTypes.string.isRequired,
  };
    componentDidMount() {
         window.addEventListener('keydown', this.handleKeyDown);
        console.log('Modal componentDidMount');
    }

    componentWillUnmount() {
         window.removeEventListener('keydown', this.handleKeyDown);
        console.log('componentWillUnmount'); 
    }

    handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
    };
    
    handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

    render() {
        const { title, onClose, currentImageUrl, currentImageDescription } =
      this.props;
        return createPortal(
            <div className={css.Modal__backdrop} onClick ={this.handleClickBackdrop}>
                <div className={css.Modal__content}>{this.props.children}
                
                <div className={css.wrapper}>
                    {title && <h1 className={css.title}>{title}</h1>}
                        <button className={css.button} type="button" onClick={onClose}>
                        X
                    </button>
                    <img
                        src={currentImageUrl}
                        alt={currentImageDescription}
                        loading = "lazy"

                    />
                    </div>
                </div>
            </div>,
            modalRoot,
        );
    }
}

export default Modal;