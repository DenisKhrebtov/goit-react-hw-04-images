import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { Wrapper, ModalOpen } from './Modal.styled';

export function Modal({ img, alt, onClose }) {
  useEffect(() => {
    const onClickEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onClickEscape);
    return () => {
      window.removeEventListener('keydown', onClickEscape);
    };
  }, [onClose]);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <Wrapper onClick={onBackdropClick}>
      <ModalOpen>
        <img src={img} alt={alt} />
      </ModalOpen>
    </Wrapper>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
