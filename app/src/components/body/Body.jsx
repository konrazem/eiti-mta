import React from 'react'
import Settings from './Settings';
import Products from './Products';


/**
 * Settings set data that are passed to Products
 * @param {Object} props 
 */
const Body = props => {
  const [settings, setSettings] = React.useState({ skip: 0, limit: 100 });

  return (
    <div className="eiti-body-wrapper">

      <Settings setSettings={setSettings} />
      <Products settings={settings} />

    </div>
  )
}


export default Body; 