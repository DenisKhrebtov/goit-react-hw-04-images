import { Component } from 'react';

import PropTypes from 'prop-types';

import { Wrapper, ModalOpen } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClickEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClickEscape);
  }

  onClickEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Wrapper onClick={this.onBackdropClick}>
        <ModalOpen>
          <img src={this.props.img} alt={this.props.alt} />
        </ModalOpen>
      </Wrapper>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
