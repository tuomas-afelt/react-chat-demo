import React from 'react';
import {Link} from 'react-router';

export default ({id, name}) => {
  const url = 'channels/' + id;

  return (
    <Link className="channels__link" to={url}>{name}</Link>
  );
}
