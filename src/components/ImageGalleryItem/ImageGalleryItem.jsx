import { Component } from 'react';

import PropTypes from 'prop-types';

import { Modal } from '../Modal/Modal';

import { Item, Image } from '../ImageGalleryItem/ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  changeModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    return (
      <>
        <Item>
          <Image src={webformatURL} alt={tags} onClick={this.changeModal} />
        </Item>
        {this.state.showModal && (
          <Modal
            img={largeImageURL}
            alt={tags}
            onClose={() => this.changeModal()}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
