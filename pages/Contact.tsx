import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string | null }>({
        type: 'idle',
        message: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: null });

        // Simulate contact submission for now until backend endpoint is ready
        setTimeout(() => {
            setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="bg-white">
            {/* Header Section */}
            <section className="bg-light-beige py-20 border-b border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Connect With Us</span>
                    <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have a question about our products or your routine? We're here to help you achieve your best skin yet.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Contact Information */}
                    <div className="lg:w-1/3 space-y-12">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-100 pb-2">Get In Touch</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Visit Our Hub</h4>
                                        <p className="text-sm text-gray-600">Ethiopia Cres, Cosmo City, Roodepoort, 2188, South Africa</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Email Support</h4>
                                        <p className="text-sm text-gray-600">hygienhub@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                                        <p className="text-sm text-gray-600">+(27) - 479 - 7830</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Hours</h4>
                                        <p className="text-sm text-gray-600">Mon - Fri: 11am - 7pm</p>
                                        <p className="text-sm text-gray-600">Sat - Sun: 10am - 4pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Follow Us</h4>
                            <div className="flex gap-3">
                                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3 bg-gray-50 p-8 md:p-12 rounded-sm shadow-sm border border-gray-100">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Send a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {status.message && (
                                <div className={`p-4 rounded-sm text-sm font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {status.message}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-300"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-300"
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-300"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-300"
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {status.type === 'loading' ? 'Sending...' : (
                                    <>Send Message <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <section className="w-full h-[500px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.3570558843544!2d27.923444999999997!3d-26.0218709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e959d89be5b0e25%3A0x36e8c8e22370922b!2sEthiopia%20Cres%2C%20Cosmo%20City%2C%20Roodepoort%2C%202188!5e0!3m2!1sen!2sza!4v1770148987215!5m2!1sen!2sza"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Hygiene Hub Location"
                ></iframe>
            </section>
        </div>
    );
};

export default Contact;
