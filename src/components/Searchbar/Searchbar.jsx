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

  onSubmit = event => {
    event.preventDefault();
    const search = this.state.search.toLowerCase().trim();
    if (!search) return;
    this.props.search(search);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
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
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  search: PropTypes.func.isRequired,
};
