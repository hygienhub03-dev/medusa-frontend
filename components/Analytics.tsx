import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

// Initialize GA4
export const initGA = () => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
        ReactGA.initialize(measurementId);
        console.log('GA4 Initialized');
    } else {
        console.log('GA4 Measurement ID not found (skipping init)');
    }
};

// Track page views
export const AnalyticsTracker: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Only track in production or if explicitly enabled
        if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        }
    }, [location]);

    return null;
};
