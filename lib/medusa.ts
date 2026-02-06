import Medusa from "@medusajs/js-sdk"

// Environment variables for Vite
const MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || ""

// Create Medusa v2 SDK client
export const medusa = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    publishableKey: PUBLISHABLE_KEY,
    debug: import.meta.env.DEV
})

// Export configuration for direct API calls if needed
export const config = {
    baseUrl: MEDUSA_BACKEND_URL,
    publishableKey: PUBLISHABLE_KEY
}

// Helper function for making authenticated API requests
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers)
    headers.set('x-publishable-api-key', PUBLISHABLE_KEY)
    headers.set('Content-Type', 'application/json')

    const response = await fetch(`${MEDUSA_BACKEND_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include'
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
}
