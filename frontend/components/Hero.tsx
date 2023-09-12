import React from 'react';
import './Hero.css';

interface HeroProps {
    oneLiner: string;
    description: string;
    onCTAClick: () => void;
    ctaText: string;
}

const Hero: React.FC<HeroProps> = ({ oneLiner, description, onCTAClick, ctaText }) => {
    return (
        <>
            <div className="line" />
            <div className="hero-container">
                <h1 className="hero-one-liner">{oneLiner}</h1>
                <p className="hero-description">{description}</p>
                <button className="hero-cta" onClick={onCTAClick}>{ctaText}</button>
            </div>
        </>
    );
}

export default Hero;