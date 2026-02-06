import React from 'react';
import * as Sentry from '@sentry/react';

// Test button component to verify Sentry error tracking
function SentryTestButton() {
    return (
        <button
            onClick={() => {
                // Send a log before throwing the error
                Sentry.logger.info('User triggered test error', {
                    action: 'test_error_button_click',
                });
                // Send a test metric before throwing the error
                Sentry.metrics.count('test_counter', 1);
                throw new Error('This is your first error!');
            }}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
        >
            Break the world 🔥
        </button>
    );
}

export default SentryTestButton;
