import './CharityBlurb.css';

function CharityBlurb({ backgroundImage, logo, charityName, address, oneLiner, amountRaised, onCTAClick }) {
  return (
    <div className="charity-blurb" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` }}>
      <div className="charity-info">
        <img src={logo} alt={charityName + ' logo'} className="charity-logo" />
        <h2 className="charity-name">{charityName}</h2>
        <p className="charity-address">Created by: {address}</p>
        <p className="charity-oneliner">{oneLiner}</p>
      </div>
      <div className="charity-amount">
        <span className="amount-raised">${amountRaised} raised so far</span>
        <button onClick={onCTAClick}>→</button>
      </div>
    </div>
  );
}

export default CharityBlurb;
