import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  smallImage,
  largeImageURL,
  tags,
  openModal,
  id,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryImg}
        src={smallImage}
        alt={tags}
        onClick={() => openModal({ largeImageURL, tags })}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
