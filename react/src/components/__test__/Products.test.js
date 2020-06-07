import React from 'react';
import ReactDOM from 'react-dom';
import Products from '../Products';


it("Test if Producs component render without crash", function() {
  // attach component to some element
  const div = document.createElement("div");
  const match = {
    params: {
      skip: 0,
      limit: 200
    }
  };

  ReactDOM.render(<Products match={match} />, div);
  ReactDOM.unmountComponentAtNode(div);
});