import React from 'react';
import ChatActions from '../../actions/ChatActions';
import ChatStore from '../../stores/ChatStore';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = ChatStore.getState();
    this.onChange = this.onChange.bind(this);

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }

  componentWillMount() {
    ChatActions.logout();
  }

  componentDidMount() {
    ChatStore.listen(this.onChange);
  }

  componentWillUnMount() {
    ChatStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className="login">
        <h1 className="login__title">ChatApp</h1>
        <p className="login__info">Sign in to continue to ChatApp.</p>
        <form className="login__form" ref="login__form">
          <input
            type="text"
            className="login__input"
            autoFocus={true}
            placeholder="Username"
            onChange={this.handleChangeLogin} />
          <button className="login__submit" onClick={this.handleSubmitLogin}>Login</button>
        </form>
      </div>
    );
  }

  handleChangeLogin(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleSubmitLogin(e) {
    e.preventDefault();

    if (!this.state.username) {
      return;
    }

    ChatActions.login(this.state.username);

    this.refs.login__form.reset();

    this.setState({
      username: null
    });

    this.context.router.push('/channels');
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};

export default Login;
