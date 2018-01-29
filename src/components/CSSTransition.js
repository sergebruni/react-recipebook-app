import { CSSTransition } from 'react-transition-group'

export const Fade = ({ children, ...props }) => (
  <CSSTransition
    classNames='fade'
    timeout={1500}
    {...props}>
    <div>
      {children}
    </div>
  </CSSTransition>
);
