import React from 'react';
import ReactDOM from 'react-dom';
import Settings from '../Settings';


it("Test if Settings component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");

  ReactDOM.render(<Settings skip={0} limit={100} count={1200} />, div);
  ReactDOM.unmountComponentAtNode(div);
});