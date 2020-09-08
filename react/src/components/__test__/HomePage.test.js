import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from '../HomePage';


it("Test if HomePage component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");

  ReactDOM.render(<HomePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});