import React, { useState } from 'react';
import { Truck, RefreshCw, Lock, Smartphone, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        question: "What shipping methods are available?",
        answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and same-day delivery for orders within Johannesburg metro area. Free shipping is available on all orders over R200."
    },
    {
        question: "How do I place an order?",
        answer: "Simply browse our products, add items to your cart, and proceed to checkout. You can pay using credit/debit cards, EFT, or popular payment methods. Once your order is confirmed, you'll receive a confirmation email with tracking details."
    },
    {
        question: "How long will it take to get my package?",
        answer: "Delivery times depend on your location and chosen shipping method. Standard delivery takes 5-7 business days, while express delivery arrives in 2-3 business days. Orders placed before 2 PM are processed the same day."
    },
    {
        question: "Where are your products sent from?",
        answer: "All orders are dispatched from our warehouse in Johannesburg, South Africa. We ship nationwide and use reliable courier partners to ensure your skincare products arrive safely."
    },
    {
        question: "What is your return and refund policy?",
        answer: "We accept returns within 30 days of purchase for unopened products in their original packaging. If you're unsatisfied with a product, contact our customer service team for a refund or exchange. Damaged items will be replaced free of charge."
    },
    {
        question: "Are your products suitable for sensitive skin?",
        answer: "Yes! All Hygiene Hub products are dermatologist-tested, hypoallergenic, and free from harsh chemicals. We recommend doing a patch test before first use. Check individual product pages for specific ingredient information."
    },
    {
        question: "How do I track my order?",
        answer: "Once your order ships, you'll receive an email with a tracking number and link. You can also log into your account and view your order status under 'My Orders'. For any tracking issues, contact our support team."
    },
    {
        question: "Can I change or cancel my order?",
        answer: "Orders can be modified or cancelled within 2 hours of placement. After this window, orders enter processing and cannot be changed. Contact us immediately at hygienhub@gmail.com if you need to make changes."
    }
];

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="py-16 text-center bg-light-beige mb-8 border-b border-green-50">
                <h1 className="text-4xl font-serif font-bold mb-3 text-gray-900">Frequently Asked Questions</h1>
                <p className="text-sm text-gray-500">Find answers to common questions about our products and services</p>
            </div>

            <div className="container mx-auto px-6 pb-20">
                {/* Quick Links */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
                    {[
                        { icon: Truck, label: "Delivery Policy" },
                        { icon: RefreshCw, label: "Returns & Refunds" },
                        { icon: Lock, label: "Privacy Policy" },
                        { icon: Smartphone, label: "How To Order" },
                        { icon: FileText, label: "Payment & Taxes" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 p-8 rounded-lg flex flex-col items-center text-center hover:bg-light-beige transition-all cursor-pointer group hover:shadow-md"
                        >
                            <div className="mb-4 text-gray-600 group-hover:text-primary transition-colors">
                                <item.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h4 className="font-bold text-xs uppercase tracking-wide">{item.label}</h4>
                        </div>
                    ))}
                </div>

                {/* Introduction */}
                <div className="mb-12 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-gray-900">How Can We Help You?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        At Hygiene Hub Skincare, we're committed to providing you with the best shopping experience.
                        Below you'll find answers to our most commonly asked questions. If you can't find what you're
                        looking for, please don't hesitate to contact our friendly customer support team.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4 max-w-3xl mx-auto">
                    {faqData.map((faq, i) => (
                        <div
                            key={i}
                            className={`border rounded-lg overflow-hidden transition-all ${openIndex === i ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <button
                                onClick={() => toggleFaq(i)}
                                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                            >
                                <h4 className={`font-medium ${openIndex === i ? 'text-primary' : 'text-gray-900'}`}>
                                    {faq.question}
                                </h4>
                                {openIndex === i ? (
                                    <ChevronUp size={20} className="text-primary flex-shrink-0" />
                                ) : (
                                    <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            {openIndex === i && (
                                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed bg-gray-50 border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center bg-light-beige p-10 rounded-lg max-w-3xl mx-auto">
                    <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">Still Have Questions?</h3>
                    <p className="text-gray-600 mb-6">Our customer support team is here to help you with any queries.</p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-primary text-white font-bold uppercase tracking-wider hover:bg-dark-green transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Faq;