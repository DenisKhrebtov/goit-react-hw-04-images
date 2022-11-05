import PropTypes from 'prop-types';

import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <div>
      <ButtonLoadMore type="button" onClick={onLoadMore}>
        Load More
      </ButtonLoadMore>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
