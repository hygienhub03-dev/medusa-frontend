import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Home, User, LogOut } from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { medusa } from '../lib/medusa';
import Login from '../components/account/Login';
import Register from '../components/account/Register';
import AddressBook from '../components/account/AddressBook';

const Account: React.FC = () => {
    const { customer, isLoading, logout, updateCustomer } = useAccount();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoginView, setIsLoginView] = useState(true);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        if (customer && activeTab === 'orders') {
            fetchOrders();
        }
    }, [customer, activeTab]);

    const fetchOrders = async () => {
        try {
            const { orders } = await medusa.customers.listOrders();
            setOrders(orders);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-beige">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Guest View: Login or Register
    if (!customer) {
        return (
            <div className="min-h-screen bg-light-beige pt-32 pb-20 px-4">
                {isLoginView ? (
                    <Login toggleView={() => setIsLoginView(false)} />
                ) : (
                    <Register toggleView={() => setIsLoginView(true)} />
                )}
            </div>
        );
    }

    // Authenticated View: Dashboard
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'addresses', label: 'Addresses', icon: Home },
        { id: 'details', label: 'Account Details', icon: User },
    ];

    return (
        <div className="bg-[#f9f9f9] min-h-screen pt-24">
            <div className="py-16 text-center bg-white shadow-sm border-b border-gray-100 mb-12">
                <h1 className="text-4xl font-serif font-bold mb-2">My Account</h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Radiance Dashboard • Est. 2026</p>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                                        {customer.first_name?.[0] || customer.email[0].toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-gray-900 leading-tight truncate">
                                            {customer.first_name} {customer.last_name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2">
                                {menuItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full text-left flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-xl transition-all
                                            ${activeTab === item.id ? 'text-primary bg-primary/5 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}
                                        `}
                                    >
                                        <item.icon size={18} className={activeTab === item.id ? 'text-primary' : 'text-gray-400'} />
                                        {item.label}
                                    </button>
                                ))}
                                <button
                                    onClick={logout}
                                    className="w-full text-left flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all mt-4"
                                >
                                    <LogOut size={18} />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-3/4">
                        {activeTab === 'dashboard' && (
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                                <h2 className="text-2xl font-serif font-bold mb-6">Welcome Back, {customer.first_name || 'Guest'}!</h2>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    From your dashboard, you can seamlessly manage your skincare journey. Track your
                                    <span className="text-primary font-bold cursor-pointer hover:underline mx-1" onClick={() => setActiveTab('orders')}>recent orders</span>,
                                    update your <span className="text-primary font-bold cursor-pointer hover:underline mx-1" onClick={() => setActiveTab('addresses')}>shipping details</span>,
                                    and personalize your <span className="text-primary font-bold cursor-pointer hover:underline mx-1" onClick={() => setActiveTab('details')}>account security</span>.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div onClick={() => setActiveTab('orders')} className="p-6 bg-light-beige/50 rounded-2xl border border-gray-100 flex items-center gap-4 group cursor-pointer hover:bg-light-beige transition-colors">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <ShoppingBag size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Recent Activity</p>
                                            <p className="font-bold text-gray-900">View Orders</p>
                                        </div>
                                    </div>
                                    <div onClick={() => setActiveTab('details')} className="p-6 bg-light-beige/50 rounded-2xl border border-gray-100 flex items-center gap-4 group cursor-pointer hover:bg-light-beige transition-colors">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">My Profile</p>
                                            <p className="font-bold text-gray-900">Edit Details</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 min-h-[400px] animate-fade-in">
                                <h2 className="text-2xl font-serif font-bold mb-8">Order History</h2>
                                {orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.map(order => (
                                            <div key={order.id} className="border border-gray-100 p-4 rounded-xl flex justify-between items-center bg-white hover:shadow-sm transition-shadow">
                                                <div>
                                                    <p className="font-bold text-sm">Order #{order.display_id}</p>
                                                    <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">R {(order.total / 100).toFixed(2)}</p>
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-200">
                                            <ShoppingBag size={40} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                                        <p className="text-gray-500 text-sm mb-8">It seems you haven't started your skincare journey with us yet.</p>
                                        <a href="/shop" className="inline-block bg-primary text-white px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-dark-green transition-all shadow-lg shadow-primary/20">
                                            Start Shopping
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="animate-fade-in">
                                <AddressBook />
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                                <h2 className="text-2xl font-serif font-bold mb-6">Account Details</h2>
                                <p className="text-gray-500 text-sm mb-8">Update your personal information and security settings below.</p>

                                <AccountDetailsForm customer={customer} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AccountDetailsForm: React.FC<{ customer: any }> = ({ customer }) => {
    const { updateCustomer } = useAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        phone: customer.phone || '',
        password: '',
        password_confirm: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        if (formData.password && formData.password !== formData.password_confirm) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            setIsLoading(false);
            return;
        }

        try {
            const updatePayload: any = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone
            };

            if (formData.password) {
                updatePayload.password = formData.password;
            }

            await updateCustomer(updatePayload);
            setMessage({ type: 'success', text: 'Account details updated successfully.' });
            setFormData(prev => ({ ...prev, password: '', password_confirm: '' }));
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update account details. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {message && (
                <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-xs font-bold uppercase text-gray-600 block mb-2">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-gray-600 block mb-2">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs font-bold uppercase text-gray-600 block mb-2">Email</label>
                <input
                    type="email"
                    disabled
                    value={customer.email}
                    className="w-full border border-gray-100 bg-gray-50 text-gray-500 p-3.5 rounded-xl cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-400 mt-1.5 italic">Email address cannot be changed directly.</p>
            </div>

            <div>
                <label className="text-xs font-bold uppercase text-gray-600 block mb-2">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
            </div>

            <div className="border-t border-gray-100 pt-8 mt-8">
                <h3 className="text-lg font-bold font-serif mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-600 block mb-2">New Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current"
                            className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-600 block mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="password_confirm"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="w-full border border-gray-200 bg-white p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-dark-green transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Updating...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>
        </form>
    );
};

export default Account;

