import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    loading: false,
    user: {},
  };

  componentDidMount() {
    this.users();
  }

  users = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const userinfo = await getUser();
      this.setState({
        loading: false,
        user: userinfo,
      });
    });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {
          (loading ? <Loading />
            : (
              <>
                <p data-testid="header-user-name">{user.name}</p>
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>

              </>))
        }

      </header>
    );
  }
}
