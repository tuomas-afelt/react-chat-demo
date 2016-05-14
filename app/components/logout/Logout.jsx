import React from 'react';
import {Link} from 'react-router';
import ChatStore from '../../stores/ChatStore';

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = ChatStore.getState();
    this.onChange = this.onChange.bind(this);
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
    const credentials = this.state.user;

    if (credentials.username) {
      return (
        <Link className="logout__link" to="/">Logout</Link>
      );
    }

    return null;
  }
}

export default Logout;
