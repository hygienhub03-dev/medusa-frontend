import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const Privacy: React.FC = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-gray-500">Last updated: February 5, 2026</p>
                    <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
                </div>

                <div className="prose prose-green max-w-none text-gray-600 space-y-8">
                    <section>
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <ShieldCheck className="text-primary" />
                            <h2 className="text-2xl font-serif font-bold m-0">Information We Collect</h2>
                        </div>
                        <p>
                            At Hygiene Hub Skincare, we collect information to provide better services to all our users. This includes information you provide (like your name, email, and shipping address) and information we get from your use of our services (like device information and location).
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <Lock className="text-primary" />
                            <h2 className="text-2xl font-serif font-bold m-0">How We Use Information</h2>
                        </div>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Hygiene Hub and our users. We also use this information to offer you tailored content—like giving you more relevant search results and ads.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <Eye className="text-primary" />
                            <h2 className="text-2xl font-serif font-bold m-0">Information Security</h2>
                        </div>
                        <p>
                            We work hard to protect Hygiene Hub and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. In particular:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>We encrypt many of our services using SSL.</li>
                            <li>We review our information collection, storage, and processing practices.</li>
                            <li>We restrict access to personal information to Hygiene Hub employees.</li>
                        </ul>
                    </section>

                    <section className="bg-light-beige p-8 rounded-sm">
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <FileText className="text-primary" />
                            <h2 className="text-2xl font-serif font-bold m-0">Contact Us</h2>
                        </div>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                            <br />
                            <strong>Email:</strong> hygienhub@gmail.com
                            <br />
                            <strong>Address:</strong> Ethiopia Cres, Cosmo City, Roodepoort, 2188, South Africa
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
