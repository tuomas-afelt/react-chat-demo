import React from 'react';
import Logout from '../../components/logout/Logout.jsx';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="top">
          <div className="top__content">
            <Logout />
          </div>
        </div>
        <div className="main">
          <div className="main__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default MainLayout;
