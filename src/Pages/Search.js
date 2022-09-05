import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    isDisabled: true,
    search: '',
    album: [],
    text: false,
    notFound: false,
    name: '',
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

  searchAlbum = async () => {
    const { search } = this.state;
    const a = await searchAlbumsAPI(search);
    if (a.length === 0) {
      this.setState({
        notFound: true,
        text: false,
      });
    } else {
      this.setState({
        album: [...a],
        text: true,
        notFound: false,
        name: search,
        search: '',
      });
    }
  };

  render() {
    const { search, isDisabled, album, text, notFound, name } = this.state;
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
          onClick={ this.searchAlbum }
        >
          Pesquisar
        </button>
        {
          (
            text
            && (
              <h2>
                Resultado de álbuns de:
                {' '}
                { name }
              </h2>)
          )
        }
        {
          notFound ? <h1>Nenhum álbum foi encontrado</h1> : album.map((e) => (
            <div
              key={ e.collectionId }
            >
              {e.collectionName}
              <Link
                to={ `/album/${e.collectionId}` }
                data-testid={ `link-to-album-${e.collectionId}` }
              >
                Album
              </Link>
            </div>))
        }
      </div>
    );
  }
}
