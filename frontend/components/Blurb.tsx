import './Blurb.css';

interface BlurbProps {
    backgroundImage: string;
    logo: string;
    name: string;
    oneLiner: string;
    onCTAClick?: () => void;
}

const Blurb: React.FC<BlurbProps> = ({
    backgroundImage,
    logo,
    name,
    oneLiner,
    onCTAClick
}) => {
    return (
        <div className="blurb" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` }}>
            <div className="info">
                <img src={logo} alt={name + ' logo'} className="blurb-logo" />
                <h2 className="name">{name}</h2>
                <p className="oneliner">{oneLiner}</p>
            </div>
            <div className="amount">
                <button className="btn-cta" onClick={onCTAClick}>Donate</button>
            </div>
        </div>
    );
}

export default Blurb;
