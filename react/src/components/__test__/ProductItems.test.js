import React from 'react';
import ReactDOM from 'react-dom';
import ProductItems from '../ProductItems';


it("Test if ProductItems component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");

  ReactDOM.render(<ProductItems />, div);
  ReactDOM.unmountComponentAtNode(div);
});