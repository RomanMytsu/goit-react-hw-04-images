import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalItem, Overlay } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ close, item }) => {
  const backdropCloseHandler = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const closeEscapeHandler = ({ code }) => {
      if (code === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', closeEscapeHandler);

    return () => document.removeEventListener('keydown', closeEscapeHandler);
  }, [close]);

  return createPortal(
    <Overlay onClick={backdropCloseHandler}>
      <ModalItem>
        <img src={item.largeImageURL} alt={item.tags} />
      </ModalItem>
    </Overlay>,
    modalRoot
  );
};
