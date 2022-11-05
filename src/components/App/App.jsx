import { Component } from 'react';

import { toast } from 'react-toastify';

import { fetch } from '../../api/api';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Toast } from '../ToastContainer/ToastContainer';

import { Wrapper } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    total: 0,
    loading: false,
  };

  handleFormSubmit = queryNew => {
    if (queryNew !== this.state.query) {
      this.setState({ images: [], total: 0, page: 1 });
      return this.setState({ query: queryNew });
    }
    return toast.info('You already have it 🥳');
  };

  createGallery = async (query, page) => {
    try {
      this.setState({ loading: true });
      const data = await fetch(query, page);
      if (!data.totalHits) {
        return toast.error(
          'Sorry, something went wrong, change your request 🧐'
        );
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          total: data.totalHits,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.createGallery(query, page);
    }
  }

  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.loading && <Loader />}
        <Toast />
        {this.state.total > this.state.images.length && (
          <Button onLoadMore={this.loadMore} />
        )}
      </Wrapper>
    );
  }
}
