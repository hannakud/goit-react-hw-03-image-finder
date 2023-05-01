import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL, tags, id }) => {
        return (
          <ImageGalleryItem
            key={id}
            smallImage={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            id={id}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
