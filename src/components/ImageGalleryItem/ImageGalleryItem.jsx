import { useState } from 'react';

import PropTypes from 'prop-types';

import { Modal } from '../Modal/Modal';

import { Item, Image } from '../ImageGalleryItem/ImageGalleryItem.styled';

export function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);

  const changeModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { webformatURL, largeImageURL, tags } = image;
  return (
    <>
      <Item>
        <Image src={webformatURL} alt={tags} onClick={changeModal} />
      </Item>
      {showModal && (
        <Modal img={largeImageURL} alt={tags} onClose={() => changeModal()} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
