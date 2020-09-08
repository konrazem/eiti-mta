import React from 'react';
import ReactDOM from 'react-dom';
import InfoPage from '../InfoPage';


it("Test if InfoPage component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");

  ReactDOM.render(<InfoPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});