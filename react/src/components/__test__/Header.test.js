import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header';

it("Test if Header component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");

  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});
