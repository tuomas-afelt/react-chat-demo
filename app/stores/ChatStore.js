import uuid from 'node-uuid';
import alt from '../libs/alt';
import ChatActions from '../actions/ChatActions';

class ChatStore {
  constructor() {
    this.bindActions(ChatActions);

    this.user = {};
    this.channels = [
      {
        id: uuid.v4(),
        name: 'React',
        messages: [
          {
            id: uuid.v4(),
            user: 'Pekka',
            text: 'React is kind of awesome!'
          },
          {
            id: uuid.v4(),
            user: 'Jouni',
            text: 'You´re absolutely right about that Pekka'
          }
        ]
      },
      {
        id: uuid.v4(),
        name: 'Angular',
        messages: [
          {
            id: uuid.v4(),
            user: 'Ismo',
            text: 'I´m so excited about Angular 2.0 :)'
          },
          {
            id: uuid.v4(),
            user: 'Aapo',
            text: 'Ismo, you should check out the Angular 2.0 channel if there is any discussion going on.'
          },
          {
            id: uuid.v4(),
            user: 'Akseli',
            text: 'Nothing there yet :sob:'
          }
        ]
      },
      {
        id: uuid.v4(),
        name: 'Angular 2.0',
        messages: []
      },
      {
        id: uuid.v4(),
        name: 'Underscore.js',
        messages: []
      }
    ];
  }

  login(name) {
    this.setState({
      user: {
        id: uuid.v4(),
        username: name
      }
    });
  }

  logout() {
    this.setState({
      user: {}
    });
  }

  createMessage(data) {
    const channels = this.channels.map(channel => {
      if (channel.id === data.channel.id) {
        data.message.id = uuid.v4();
        channel.messages.push(data.message);
      }

      return channel;
    });

    this.setState({channels});
  }

  updateMessage(data) {
    const channels = this.channels.map(channel => {
      if (channel.id === data.channel.id) {
        const messages = channel.messages.map(message => {
          if (message.id === data.message.id) {
            return Object.assign(message, data.message);
          }

          return message;
        });
      }

      return channel;
    });

    this.setState({channels});
  }

  deleteMessage(data) {
    const channels = this.channels.map(channel => {
      if (channel.id === data.channel.id) {
        const messages = channel.messages.map((message, index, array) => {
          if (message.id === data.message.id) {
            return array.splice(index, 1);
          }

          return message;
        });
      }

      return channel;
    });

    this.setState({channels});
  }
}

export default alt.createStore(ChatStore, 'ChatStore');
