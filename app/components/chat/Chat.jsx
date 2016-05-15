import React from 'react';
import {Link} from 'react-router';
import ChatActions from '../../actions/ChatActions';
import ChatStore from '../../stores/ChatStore';
import Messages from './Messages.jsx';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = ChatStore.getState();
    this.onChange = this.onChange.bind(this);

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
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

  handleChangeMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmitMessage(e) {
    e.preventDefault();

    const credentials = this.state.user;
    const channelId = this.props.params.channelId;

    if (!this.state.message) {
      return;
    }

    ChatActions.createMessage({
      channel: {
        id: channelId
      },
      message: {
        user: credentials.username,
        text: this.state.message
      }
    });

    this.refs.chat__form.reset();

    this.setState({
      message: null
    });
  }

  editMessage(id, text) {
    const credentials = this.state.user;
    const channelId = this.props.params.channelId;

    if (!text.trim()) {
      return;
    }

    ChatActions.updateMessage({
      channel: {
        id: channelId
      },
      message: {
        id: id,
        user: credentials.username,
        text: text
      }
    });
  }

  deleteMessage(id, e) {
    e.stopPropagation();

    const channelId = this.props.params.channelId;

    ChatActions.deleteMessage({
      channel: {
        id: channelId
      },
      message: {
        id: id
      }
    });
  }

  render() {
    const credentials = this.state.user;
    const channel = this.state.channels.filter(channel => channel.id === this.props.params.channelId);
    const messages = channel[0].messages;
    
    if (!credentials.username) {
      this.context.router.push('/');
      return null;
    }

    return (
      <div className="chat">
        <Link className="chat__previous" to="/channels">Back to channels</Link>
        <Messages
          credentials={credentials}
          messages={messages}
          onEdit={this.editMessage}
          onDelete={this.deleteMessage} />
        <form className="chat__form" ref="chat__form">
          <input
            type="text"
            className="chat__new-message"
            autoFocus={true}
            placeholder="Say something..."
            onKeyPress={this.handleChangeMessage} />
          <button className="chat__create" onClick={this.handleSubmitMessage}>New message</button>
        </form>
      </div>
    );
  }

}

Chat.contextTypes = {
  router: React.PropTypes.object
};

export default Chat;
