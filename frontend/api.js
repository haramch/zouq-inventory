const API_CONFIG = {
    BASE_URL: 'http://localhost:5000/api',
    
    // Endpoints
    endpoints: {
        // Auth
        register: '/auth/register',
        login: '/auth/login',
        getUser: '/auth/me',
        verifyEmail: '/auth/verify-email',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',

        // Categories
        categories: '/categories',

        // Colors
        colors: '/colors',

        // Inventory
        inventory: '/inventory',

        // Orders
        orders: '/orders',
        orderStatus: (id) => `/orders/${id}/status`
    }
};

// API Helper Functions
const API = {
    // Get auth token
    getToken() {
        return localStorage.getItem('token');
    },
    
    // Set auth token
    setToken(token) {
        localStorage.setItem('token', token);
    },
    
    // Remove token
    removeToken() {
        localStorage.removeItem('token');
    },
    
    // Make API request
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    // Auth APIs
    async register(userData) {
        return this.request(API_CONFIG.endpoints.register, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },
    
    async login(credentials) {
        return this.request(API_CONFIG.endpoints.login, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },
    
    async getCurrentUser() {
        return this.request(API_CONFIG.endpoints.getUser);
    },
    
    // Categories APIs
    async getCategories() {
        return this.request(API_CONFIG.endpoints.categories);
    },
    
    async createCategory(categoryData) {
        return this.request(API_CONFIG.endpoints.categories, {
            method: 'POST',
            body: JSON.stringify(categoryData)
        });
    },
    
    async updateCategory(id, categoryData) {
        return this.request(`${API_CONFIG.endpoints.categories}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData)
        });
    },
    
    async deleteCategory(id) {
        return this.request(`${API_CONFIG.endpoints.categories}/${id}`, {
            method: 'DELETE'
        });
    },
    
    // Colors APIs
    async getColors() {
        return this.request(API_CONFIG.endpoints.colors);
    },
    
    async createColor(colorData) {
        return this.request(API_CONFIG.endpoints.colors, {
            method: 'POST',
            body: JSON.stringify(colorData)
        });
    },
    
    async deleteColor(id) {
        return this.request(`${API_CONFIG.endpoints.colors}/${id}`, {
            method: 'DELETE'
        });
    },
    
    // Inventory APIs
    async getInventory() {
        return this.request(API_CONFIG.endpoints.inventory);
    },
    
    async createOrUpdateInventory(inventoryData) {
        return this.request(API_CONFIG.endpoints.inventory, {
            method: 'POST',
            body: JSON.stringify(inventoryData)
        });
    },
    
    async updateInventory(id, inventoryData) {
        return this.request(`${API_CONFIG.endpoints.inventory}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(inventoryData)
        });
    },
    
    async deleteInventory(id) {
        return this.request(`${API_CONFIG.endpoints.inventory}/${id}`, {
            method: 'DELETE'
        });
    },
    
    // Orders APIs
    async getOrders() {
        return this.request(API_CONFIG.endpoints.orders);
    },
    
    async getOrder(id) {
        return this.request(`${API_CONFIG.endpoints.orders}/${id}`);
    },
    
    async createOrder(orderData) {
        return this.request(API_CONFIG.endpoints.orders, {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    },
    
    async updateOrder(id, orderData) {
        return this.request(`${API_CONFIG.endpoints.orders}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(orderData)
        });
    },
    
    async updateOrderStatus(id, status) {
        return this.request(API_CONFIG.endpoints.orderStatus(id), {
            method: 'PATCH',
            body: JSON.stringify({ status })
        });
    },
    
    async deleteOrder(id) {
        return this.request(`${API_CONFIG.endpoints.orders}/${id}`, {
            method: 'DELETE'
        });
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, API };
}
