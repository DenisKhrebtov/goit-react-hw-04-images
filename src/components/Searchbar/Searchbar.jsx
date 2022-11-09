import { useState } from 'react';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

import { Header, Form, Button, Input, SpanSearch } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [queryNew, setQueryNew] = useState('');

  const handleNameChange = event => {
    setQueryNew(event.currentTarget.value.toLowerCase());
  };
  const reset = () => {
    setQueryNew('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!queryNew) {
      return toast.error('Write keyword for search 🧐');
    }
    onSubmit(queryNew);
    reset();
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <SpanSearch>
            <ImSearch />
          </SpanSearch>
        </Button>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={queryNew}
          onChange={handleNameChange}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
