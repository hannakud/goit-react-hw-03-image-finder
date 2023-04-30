import { Component } from 'react';
import css from './App.module.css';
import fetchImages from 'api/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
// import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 0,
    isLoading: false,
    error: null,
    showModal: false,
    empty: false,
  };

  load = async search => {
    this.setState({ page: 1, search, isLoading: true });
    try {
      const response = await fetchImages(1, search.trim());
      this.setState({
        images: response.hits,
        total: response.totalHits,
      });
      if (response.hits.length === 0) {
        return toast.error('There is no images found with that search request');
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = async () => {
    const nextPage = this.state.page + 1;
    this.setState({
      page: nextPage,
      isLoading: true,
    });
    try {
      const response = await fetchImages(nextPage, this.state.search);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        total: response.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = url => {
    console.log('openModal', url);
  };

  isShowLoadMoreButton = () => {
    const amount = this.state.images.length;
    return amount > 0 && amount < this.state.total && !this.state.isLoading;
  };

  render = () => {
    return (
      <>
        <div className={css.App}>
          <Searchbar search={this.load} />
          <ImageGallery images={this.state.images} openModal={this.openModal} />
          {this.isShowLoadMoreButton() && (
            <Button title="Load more" handler={this.loadMore} />
          )}
          {this.state.isLoading && <Loader />}
        </div>
        <ToastContainer autoClose={3000} />
      </>
    );
  };
}
