import React from 'react';
import ChatStore from '../../stores/ChatStore';
import Channel from './Channel.jsx';

class Channels extends React.Component {
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
    const channels = this.state.channels;

    if (!credentials.username) {
      this.context.router.push('/');
      return null;
    }

    return (
      <div className="channels">
        <h2 className="channels__title">Channels</h2>
        <p className="channels__info">Join one of the following channels.</p>
        <ul className="channels__list">{channels.map(channel =>
          <li className="channels__item" key={channel.id}>
            <Channel
              id={channel.id}
              name={channel.name} />
          </li>
        )}</ul>
      </div>
    );
  }
}

Channels.contextTypes = {
  router: React.PropTypes.object
};

export default Channels;
