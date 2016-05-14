import React from 'react';
import ReactEmoji from 'react-emoji';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.renderEditInput = this.renderEditInput.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }

  render() {
    if (this.state.editing && this.props.credentials.username === this.props.user) {
      return this.renderEditInput();
    }

    return this.renderMessage();
  }

  renderEditInput() {
    return (
      <div className="chat__message">
        <span className="chat__info">Press 'Enter' to save your message.</span>
        <input
          type="text"
          ref="chat__update"
          className="chat__update"
          autoFocus={true}
          defaultValue={this.props.text}
          onKeyPress={this.handleKeyPress} />
        <button className="chat__cancel" onClick={this.handleCancel}>Cancel</button>
      </div>
    );
  }

  renderEditButton() {
    if (this.props.credentials.username === this.props.user) {
      return (
        <button className="chat__edit" onClick={this.handleEdit}>Edit</button>
      );
    }

    return null;
  }

  renderDeleteButton() {
    if (this.props.credentials.username === this.props.user) {
      return (
        <button className="chat__delete" onClick={this.props.onDelete}>Delete</button>
      );
    }

    return null;
  }

  renderMessage() {
    const isUser = this.props.credentials.username === this.props.user ? 'chat__user chat__user--right' : 'chat__user';
    const onEdit = this.props.onEdit;
    const onDelete = this.props.onDelete;

    return (
      <div className="chat__message">
        <span className={isUser}>{this.props.user}</span>
        <div className="chat__bubble">
          <span className="chat__text">{ReactEmoji.emojify(this.props.text)}</span>
        </div>
        <div className="chat__controllers">
          {onEdit ? this.renderEditButton() : null}
          {onDelete ? this.renderDeleteButton() : null}
        </div>
      </div>
    );
  }

  handleEdit() {
    this.setState({
      editing: true
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  handleCancel() {
    this.setState({
      editing: false
    });
  }

  finishEdit(e) {
    const value = e.target.value || this.refs.chat__update.value;

    if (this.props.onEdit) {
      this.props.onEdit(value);

      this.setState({
        editing: false
      });
    }
  }
}

export default Message;
