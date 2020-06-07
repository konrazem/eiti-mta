import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../Footer';


it("Test if Footer component renders without crash", function() {
  // attach component to some element
  const div = document.createElement("div");

  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
