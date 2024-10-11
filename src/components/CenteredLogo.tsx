import React, { useState } from 'react';
import logoImage from '../assets/saints-logo.png';

const CenteredLogo: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = () => {
    console.error('Failed to load logo image');
    setLogoError(true);
  };

  return (
    <div className="flex justify-center items-center py-8 bg-white">
      {logoError ? (
        <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-bold">
          Saints Valet & Detailing
        </div>
      ) : (
        <img 
          src={logoImage} 
          alt="Saints Valet & Detailing Logo" 
          className="w-48 h-48 object-contain" 
          onError={handleLogoError}
        />
      )}
    </div>
  );
};

export default CenteredLogo;