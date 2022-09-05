import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favoritemusic: [],
  };

  async componentDidMount() {
    await this.onLoad();
  }

  handleClick = async ({ target }) => {
    const { trackName, previewUrl, trackId } = this.props;
    this.setState({
      loading: true,
    });
    if (!target.checked) {
      await removeSong({
        trackName,
        trackId,
        previewUrl,
      });
    } else {
      await addSong({
        trackName,
        trackId,
        previewUrl,
      });
    }
    await this.onLoad();
    this.setState({
      loading: false,
    });
  };

  onLoad = async () => {
    const a = await getFavoriteSongs();
    this.setState({
      favoritemusic: a,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoritemusic } = this.state;
    return (
      <div>
        <p>
          {trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          <input
            type="checkbox"
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleClick }
            checked={ favoritemusic.some((e) => e.trackId === trackId) }
          />
          Favorita
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
