import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  onChange = event => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          onSubmit={event => {
            event.preventDefault();
            this.props.search(event.target[1].value);
          }}
        >
          <button type="submit" className={css.button}>
            <FiSearch />
          </button>

          <input
            className={css.inputSearch}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  search: PropTypes.func.isRequired,
};
