import './CharityBlurb.css';

function PartnerBlurb({ backgroundImage, logo, charityName, oneLiner, unlockLevel }) {
  return (
    <div className="charity-blurb" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` }}>
      <div className="charity-info">
        <img src={logo} alt={charityName + ' logo'} className="charity-logo" />
        <h2 className="charity-name">{charityName}</h2>
        <p className="charity-oneliner">{oneLiner}</p>
      </div>
      <div className="charity-amount">
        <span className="amount-raised">Unlocked at: {unlockLevel}</span>
      </div>
    </div>
  );
}

export default PartnerBlurb;
