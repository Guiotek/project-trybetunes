import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

export default class Album extends Component {
  state = {
    songs: [],
    artist: {},
  };

  componentDidMount() {
    this.onload();
  }

  music = async () => {
    const { match: { params: { id } } } = this.props;
    const a = await getMusics(id);
    console.log(a);
    this.setState({
      songs: [...a],
    }, () => {
      const { songs } = this.state;
      this.setState({
        artist: songs[0],
      });
    });
  };

  onload = () => {
    this.music();
  };

  render() {
    const { songs, artist } = this.state;
    return (
      <div
        data-testid="page-album"
      >
        <Header />
        <p
          data-testid="artist-name"
        >
          { artist.artistName }
        </p>
        <p
          data-testid="album-name"
        >
          { artist.collectionName }
        </p>
        {songs.map((e, i) => {
          if (i !== 0) {
            return (
              <MusicCard
                key={ e.trackId }
                trackId={ e.trackId }
                trackName={ e.trackName }
                previewUrl={ e.previewUrl }
                eid={ e }
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object.isRequired,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
