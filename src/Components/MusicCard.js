import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  };

  handleClick = async (param) => {
    this.setState({
      loading: true,
      check: true,
    });
    await addSong(param);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, eid } = this.props;
    const { loading, check } = this.state;
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
            onClick={ () => this.handleClick(eid) }
            checked={ !!check }
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
