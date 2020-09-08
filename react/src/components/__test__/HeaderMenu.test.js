import React from 'react';
import ReactDOM from 'react-dom';
import HeaderMenu from '../HeaderMenu';


it("Test if HeaderMenu component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");

  ReactDOM.render(<HeaderMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});