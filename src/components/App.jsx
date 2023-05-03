import { Component } from 'react';
import css from './App.module.css';
import fetchImages from 'api/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 0,
    isLoading: false,
    modalData: null,
  };

  componentDidUpdate = async (_, prevState) => {
    const { search, page } = this.state;

    if (prevState.page !== page || search !== prevState.search) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchImages(page, search);
        const images = response.hits.map(image => ({
          largeImageURL: image.largeImageURL,
          webformatURL: image.webformatURL,
          id: image.id,
          tags: image.tags,
        }));
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          total: response.totalHits,
        }));
        if (response.hits.length === 0) {
          return toast.error(
            'There is no images found with that search request'
          );
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  handleSubmit = search => {
    this.setState({ search, page: 1, images: [], total: 0 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = modalData => {
    this.setState({ modalData });
  };

  closeModal = () => {
    this.setState({ modalData: null });
  };

  render = () => {
    const { images, modalData, isLoading, total } = this.state;
    const showButton = images.length !== total && !isLoading;
    return (
      <>
        <div className={css.App}>
          <Searchbar search={this.handleSubmit} />
          {images.length > 0 && (
            <ImageGallery images={images} openModal={this.openModal} />
          )}
          {showButton && <Button title="Load more" handler={this.loadMore} />}
          {isLoading && <Loader />}
        </div>

        <ToastContainer autoClose={3000} />
        {modalData && <Modal image={modalData} onClose={this.closeModal} />}
      </>
    );
  };
}
