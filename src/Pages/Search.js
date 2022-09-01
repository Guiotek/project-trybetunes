import { Component } from 'react';
import Header from '../Components/Header';

export default class Search extends Component {
  state = {
    isDisabled: true,
    search: '',
  };

  onInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    }, () => this.disableButton());
  };

  disableButton = () => {
    const a = 2;
    const { search } = this.state;
    if (search.length >= a) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { search, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
