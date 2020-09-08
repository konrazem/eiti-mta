import React from 'react';
import ReactDOM from 'react-dom';
import Profile from '../Profile';


it("Test if Profile component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");

  ReactDOM.render(<Profile />, div);
  ReactDOM.unmountComponentAtNode(div);
});