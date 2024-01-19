import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalItem, Overlay } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ close, item }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, []);

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalItem>
        <img src={item.largeImageURL} alt={item.tags} />
      </ModalItem>
    </Overlay>,
    modalRoot
  );
};
