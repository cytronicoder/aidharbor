import Blurb from './Blurb';
import "./DisplayComponent.css";
import Marquee from 'react-fast-marquee';

interface Item {
    id: number;
    backgroundImage: string;
    logo: string;
    name: string;
    oneLiner: string;
    description?: string;
    detail?: string;
    amountRaised?: number;
}

interface DisplayComponentProps {
    jsonToBeDisplayed: Item[];
}

const DisplayComponent: React.FC<DisplayComponentProps> = ({ jsonToBeDisplayed }) => {
    const onCTAClick = () => {
        alert('CTA clicked');
    }

    return (
        <div className="container">
            <div className="display-component">
                <Marquee className='marquee' direction="left" pauseOnHover={true}>
                    {jsonToBeDisplayed.map(item => (
                        <div className="marquee-item" key={item.id}>
                            <Blurb
                                backgroundImage={item.backgroundImage}
                                logo={item.logo}
                                name={item.name}
                                oneLiner={item.oneLiner}
                                amountRaised={item.amountRaised}
                                onCTAClick={() => onCTAClick()}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default DisplayComponent;
