import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { fetch } from '../../api/api';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Toast } from '../ToastContainer/ToastContainer';

import { Wrapper } from './App.styled';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = queryNew => {
    if (queryNew !== query) {
      setQuery(queryNew);
      setImages([]);
      setTotal(0);
      setPage(1);
      return;
    }
    return toast.info('You have already loaded it 🥳');
  };

  const createGallery = async (query, page) => {
    try {
      setLoading(true);
      const data = await fetch(query, page);
      if (!data.totalHits) {
        return toast.error(
          'Sorry, something went wrong, change your request 🧐'
        );
      } else {
        setTotal(data.totalHits);
        setImages(prevState => [...prevState, ...data.hits]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    createGallery(query, page);
  }, [query, page]);

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      <Toast />
      {total > images.length && <Button onLoadMore={loadMore} />}
    </Wrapper>
  );
}
