import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ToTop = () => {
  return (
    <div className="begin">
      <a href="#top">
          <FontAwesomeIcon icon={faArrowUp} />
      </a>
    </div>
  )
}

export default ToTop;