import React from 'react';

import { CSSTransition } from 'react-transition-group'

const Fade = ({ children, ...props }) => (
  <CSSTransition
    classNames='fade'
    timeout={1500}
    {...props}>
    <div>
      {children}
    </div>
  </CSSTransition>
);

export {
	Fade
};