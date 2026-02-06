import React, { createContext, useContext, useState, useEffect } from 'react';
import { medusa, fetchWithAuth, config } from '../lib/medusa';

interface AccountContextType {
    customer: any | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    refetchCustomer: () => Promise<void>;
    updateCustomer: (data: any) => Promise<void>;
    addAddress: (address: any) => Promise<void>;
    updateAddress: (addressId: string, address: any) => Promise<void>;
    deleteAddress: (addressId: string) => Promise<void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Token storage key
const AUTH_TOKEN_KEY = 'medusa_auth_token';

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customer, setCustomer] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refetchCustomer = async () => {
        try {
            // Medusa v2: Get current customer using store API
            const { customer } = await medusa.store.customer.retrieve();
            setCustomer(customer);
        } catch (error) {
            // Not authenticated or session expired
            setCustomer(null);
            localStorage.removeItem(AUTH_TOKEN_KEY);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refetchCustomer();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Medusa v2: Authenticate customer using auth API
            // The v2 auth flow uses /auth/customer/emailpass endpoint
            const authResponse = await fetchWithAuth('/auth/customer/emailpass', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            // Store the token if returned
            if (authResponse.token) {
                localStorage.setItem(AUTH_TOKEN_KEY, authResponse.token);
            }

            await refetchCustomer();
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any) => {
        setIsLoading(true);
        try {
            // Medusa v2: Register customer
            // First create the customer account
            await fetchWithAuth('/auth/customer/emailpass/register', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            // Then authenticate to get session
            const authResponse = await fetchWithAuth('/auth/customer/emailpass', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            if (authResponse.token) {
                localStorage.setItem(AUTH_TOKEN_KEY, authResponse.token);
            }

            // Update customer profile with additional data
            if (data.first_name || data.last_name || data.phone) {
                await medusa.store.customer.update({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone: data.phone
                });
            }

            await refetchCustomer();
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            // Medusa v2: Delete session/logout
            await fetchWithAuth('/auth/session', {
                method: 'DELETE'
            });
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setCustomer(null);
        } catch (error) {
            console.error('Logout failed:', error);
            // Clear local state anyway
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setCustomer(null);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCustomer = async (data: any) => {
        setIsLoading(true);
        try {
            // Medusa v2: Update customer profile
            await medusa.store.customer.update(data);
            await refetchCustomer();
        } catch (error) {
            console.error('Update customer failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const addAddress = async (address: any) => {
        setIsLoading(true);
        try {
            // Medusa v2: Add customer address
            await medusa.store.customer.createAddress(address);
            await refetchCustomer();
        } catch (error) {
            console.error('Add address failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateAddress = async (addressId: string, address: any) => {
        setIsLoading(true);
        try {
            // Medusa v2: Update customer address
            await medusa.store.customer.updateAddress(addressId, address);
            await refetchCustomer();
        } catch (error) {
            console.error('Update address failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAddress = async (addressId: string) => {
        setIsLoading(true);
        try {
            // Medusa v2: Delete customer address
            await medusa.store.customer.deleteAddress(addressId);
            await refetchCustomer();
        } catch (error) {
            console.error('Delete address failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AccountContext.Provider value={{
            customer,
            isLoading,
            login,
            register,
            logout,
            refetchCustomer,
            updateCustomer,
            addAddress,
            updateAddress,
            deleteAddress
        }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (context === undefined) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
};
