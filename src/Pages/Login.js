import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends Component {
  state = {
    name: '',
    isSaveButtonDisabled: true,
    loading: false,
    redirect: false,
  };

  ButtonIsDisabled = () => {
    const { name } = this.state;
    const a = 3;
    if (name.length >= a) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    this.setState({
      name: target.value,
    }, () => this.ButtonIsDisabled());
  };

  handleCLick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { name, isSaveButtonDisabled, loading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        {
          (redirect && <Redirect to="/search" />)
        }
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isSaveButtonDisabled }
          onClick={ this.handleCLick }
        >
          Entrar
        </button>
        {
          (loading && <Loading />)
        }
      </div>
    );
  }
}

export default Login;
