import Html from "../ui/hero-future";
import React, { useState } from "react";


const Hero = () => {
    const [showSplash, setShowSplash] = React.useState(false);

    const handleShowSplash = () => {
        setShowSplash(true);
    };

    return (
        <div className="relative">
           
            { <Html />}
                
        </div>
    );
};

export default Hero;