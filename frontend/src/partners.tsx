import React from "react";
import PartnerBlurb from "../components/PartnerBlurb";
import charities from '../../partners.json';
import Modal from 'react-modal';
 
const About = () => {
    return (
      <div className="center-container">
        {charities.map(charity => (
          <PartnerBlurb
            key={charity.id}
            backgroundImage={charity.backgroundImage}
            logo={charity.logo}
            charityName={charity.name}
            oneLiner={charity.oneLiner}
            unlockLevel={charity.unlockLevel}
          />
        ))}
      </div>

    );
};
 
export default About;
