import React, { useState } from 'react';
import { useAccount } from '../../context/AccountContext';
import { MapPin, Plus, Trash2, Edit2, X } from 'lucide-react';
import RadarAddressInput from '../RadarAddressInput';

const AddressBook: React.FC = () => {
    const { customer, addAddress, deleteAddress, updateAddress } = useAccount();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address_1: '',
        address_2: '',
        city: '',
        province: '',
        postal_code: '',
        country_code: 'za',
        phone: ''
    });

    const resetForm = () => {
        setFormData({
            first_name: customer?.first_name || '',
            last_name: customer?.last_name || '',
            address_1: '',
            address_2: '',
            city: '',
            province: '',
            postal_code: '',
            country_code: 'za',
            phone: customer?.phone || ''
        });
        setError('');
        setIsAdding(false);
        setEditingId(null);
    };

    const handleRadarSelection = (verifiedAddress: any) => {
        setFormData(prev => ({
            ...prev,
            ...verifiedAddress,
            // Preserve manual overrides if needed, but usually we take Radar's
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (editingId) {
                await updateAddress(editingId, formData);
            } else {
                await addAddress(formData);
            }
            resetForm();
        } catch (err: any) {
            setError(err.message || 'Failed to save address');
        } finally {
            setIsLoading(false);
        }
    };

    const startEdit = (address: any) => {
        setFormData({
            first_name: address.first_name || '',
            last_name: address.last_name || '',
            address_1: address.address_1 || '',
            address_2: address.address_2 || '',
            city: address.city || '',
            province: address.province || '',
            postal_code: address.postal_code || '',
            country_code: address.country_code || 'za',
            phone: address.phone || ''
        });
        setEditingId(address.id);
        setIsAdding(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            await deleteAddress(id);
        } catch (err) {
            console.error(err);
        }
    };

    const radarKey = import.meta.env.NEXT_PUBLIC_RADAR_PUBLISHABLE_KEY;

    return (
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-bold">Address Book</h2>
                {!isAdding && (
                    <button
                        onClick={() => { resetForm(); setIsAdding(true); }}
                        className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:underline"
                    >
                        <Plus size={16} /> Add New
                    </button>
                )}
            </div>

            {isAdding ? (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold">{editingId ? 'Edit Address' : 'New Address'}</h3>
                        <button onClick={resetForm}><X size={20} className="text-gray-400 hover:text-red-500" /></button>
                    </div>

                    {radarKey && (
                        <div className="mb-4">
                            <label className="text-xs font-bold uppercase text-gray-600 block mb-1">Auto-fill Address</label>
                            <RadarAddressInput onAddressSelect={handleRadarSelection} publishableKey={radarKey} />
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                placeholder="First Name" required
                                className="border p-3 rounded-lg w-full"
                                value={formData.first_name}
                                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                            />
                            <input
                                placeholder="Last Name" required
                                className="border p-3 rounded-lg w-full"
                                value={formData.last_name}
                                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                            />
                        </div>
                        <input
                            placeholder="Address Line 1" required
                            className="border p-3 rounded-lg w-full"
                            value={formData.address_1}
                            onChange={e => setFormData({ ...formData, address_1: e.target.value })}
                        />
                        <input
                            placeholder="Address Line 2 (Optional)"
                            className="border p-3 rounded-lg w-full"
                            value={formData.address_2}
                            onChange={e => setFormData({ ...formData, address_2: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                placeholder="City" required
                                className="border p-3 rounded-lg w-full"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                            />
                            <input
                                placeholder="Postal Code" required
                                className="border p-3 rounded-lg w-full"
                                value={formData.postal_code}
                                onChange={e => setFormData({ ...formData, postal_code: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                placeholder="Province"
                                className="border p-3 rounded-lg w-full"
                                value={formData.province}
                                onChange={e => setFormData({ ...formData, province: e.target.value })}
                            />
                            <input
                                placeholder="Phone"
                                className="border p-3 rounded-lg w-full"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50"
                            >
                                {isLoading ? 'Saving...' : 'Save Address'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 rounded-lg font-bold text-gray-500 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {customer?.shipping_addresses?.map((addr: any) => (
                        <div key={addr.id} className="border border-gray-100 rounded-xl p-6 relative group hover:shadow-md transition-all bg-white">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(addr)} className="p-1 hover:text-blue-500"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(addr.id)} className="p-1 hover:text-red-500"><Trash2 size={16} /></button>
                            </div>

                            <div className="flex items-start gap-4">
                                <MapPin className="text-primary mt-1" size={20} />
                                <div>
                                    <p className="font-bold text-gray-900">{addr.first_name} {addr.last_name}</p>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {addr.address_1}<br />
                                        {addr.address_2 && <>{addr.address_2}<br /></>}
                                        {addr.city}, {addr.province} {addr.postal_code}<br />
                                        {addr.country_code?.toUpperCase()}
                                    </p>
                                    {addr.phone && <p className="text-gray-500 text-xs mt-2">{addr.phone}</p>}
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!customer?.shipping_addresses || customer.shipping_addresses.length === 0) && (
                        <div className="col-span-full text-center py-8 text-gray-500 italic">
                            No addresses saved yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddressBook;
