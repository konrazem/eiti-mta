import React from 'react';
import ReactDOM from 'react-dom';
import Product from '../Product';


it("Test if Product component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");
  const match = {
    params: {
      id: "1oi23b1242j1b4"
    }
  };

  ReactDOM.render(<Product match={match} />, div);
  ReactDOM.unmountComponentAtNode(div);
});