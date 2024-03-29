import Overlay from 'react-bootstrap/Overlay';

const Tooltip = ({ target, show, text }) => (
  <Overlay target={target} show={show} placement="bottom-start">
    {({
      placement, arrowProps, show: _show, popper, ...props
    }) => (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(255, 100, 100, 0.85)',
          padding: '0px 5px',
          color: 'white',
          borderRadius: 3,
          ...props.style,
        }}
      >
        {text}
      </div>
    )}
  </Overlay>
);

export default Tooltip;
