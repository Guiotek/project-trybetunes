import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';

export default class Album extends Component {
  state = {
    songs: [],
    artist: {},
    loading: false,
    favoritemusic: [],
  };

  async componentDidMount() {
    this.music();
    this.setState({
      loading: true,
    });
    this.onLoad();
    this.setState({
      loading: false,
    });
  }

  music = async () => {
    const { match: { params: { id } } } = this.props;
    const a = await getMusics(id);
    this.setState({
      songs: [...a],
    }, () => {
      const { songs } = this.state;
      this.setState({
        artist: songs[0],
      });
    });
  };

  onLoad = async () => {
    const a = await getFavoriteSongs();
    this.setState({
      favoritemusic: a,
    });
  };

  render() {
    const { songs, artist, loading, favoritemusic } = this.state;
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
                favoritemusic={ favoritemusic }
                onLoad={ this.onLoad }
              />
            );
          }
          return null;
        })}
        {loading && <Loading />}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object.isRequired,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
