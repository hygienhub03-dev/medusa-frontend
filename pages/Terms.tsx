import React from 'react';
import { Gavel, Info, AlertCircle, RefreshCw } from 'lucide-react';

const Terms: React.FC = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Terms of Service</h1>
                    <p className="text-gray-500">Last updated: February 5, 2026</p>
                    <div className="w-20 h-1 bg-secondary mx-auto mt-6"></div>
                </div>

                <div className="prose prose-gray max-w-none text-gray-600 space-y-8">
                    <section>
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <Gavel className="text-secondary" />
                            <h2 className="text-2xl font-serif font-bold m-0">1. Terms</h2>
                        </div>
                        <p>
                            By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <Info className="text-secondary" />
                            <h2 className="text-2xl font-serif font-bold m-0">2. Use License</h2>
                        </div>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on Hygiene Hub Skincare's website for personal, non-commercial transitory viewing only.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <AlertCircle className="text-secondary" />
                            <h2 className="text-2xl font-serif font-bold m-0">3. Disclaimer</h2>
                        </div>
                        <p>
                            The materials on Hygiene Hub Skincare's website are provided on an 'as is' basis. Hygiene Hub Skincare makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-sm">
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <RefreshCw className="text-secondary" />
                            <h2 className="text-2xl font-serif font-bold m-0">4. Modifications</h2>
                        </div>
                        <p>
                            Hygiene Hub Skincare may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
