import Blurb from "../components/Blurb";
import charities from '../../partners.json';
import "../components/DisplayComponent.css";
 
const About = () => {
    return (
      <div className="display-component">
        {charities.map(charity => (
          <Blurb
            key={charity.id}
            backgroundImage={charity.backgroundImage}
            logo={charity.logo}
            name={charity.name}
            oneLiner={charity.oneLiner}
            // unlockLevel={charity.unlockLevel}
          />
        ))}
      </div>

    );
};
 
export default About;
