import React, { useEffect, useRef } from 'react';
import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';

interface RadarAddressInputProps {
    onAddressSelect: (address: any) => void;
    publishableKey: string;
}

const RadarAddressInput: React.FC<RadarAddressInputProps> = ({ onAddressSelect, publishableKey }) => {
    const containerId = 'radar-autocomplete-container';

    useEffect(() => {
        if (!publishableKey) {
            console.error("Radar publishable key is missing");
            return;
        }

        try {
            Radar.initialize(publishableKey);

            Radar.ui.autocomplete({
                container: containerId,
                placeholder: 'Search for your address...',
                limit: 5,
                onSelection: (result: any) => {
                    if (result && result.address) {
                        const addressData = {
                            address_1: `${result.address.number || ''} ${result.address.street || ''}`.trim() || result.address.formattedAddress,
                            city: result.address.city,
                            province: result.address.stateCode,
                            postal_code: result.address.postalCode,
                            country_code: result.address.countryCode?.toLowerCase(),
                        };
                        onAddressSelect(addressData);
                    }
                },
            });
        } catch (error) {
            console.error("Error initializing Radar:", error);
        }
    }, [publishableKey, onAddressSelect]);

    return (
        <div id={containerId} style={{ width: '100%', marginBottom: '1rem' }} />
    );
};

export default RadarAddressInput;
