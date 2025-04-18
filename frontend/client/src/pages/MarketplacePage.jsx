// frontend/client/src/pages/MarketplacePage.jsx
import React from 'react';

const MarketplacePage = () => {
  const handleNotifyClick = () => { alert("We'll let you know!"); };
  return ( <div className="page-container marketplace-page coming-soon"> <div className="coming-soon-content"> <h1>Marketplace</h1> <p className="coming-soon-text">Coming Soon!</p> <p>NFT Upgrades, Skins, Accessories & More!</p> <button className="notify-button" onClick={handleNotifyClick}> Notify Me! </button> </div> </div> );
};
export default MarketplacePage;
