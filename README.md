# 🛍️ Inventory Management System

Complete inventory management system with authentication and MongoDB Atlas integration.

## 🌟 Features

- ✅ **User Authentication** - Secure login/signup with JWT
- ✅ **Category Management** - Organize products by categories with custom sizes
- ✅ **Color Management** - Track inventory by colors with hex codes
- ✅ **Inventory Tracking** - Real-time stock management
- ✅ **Order Management** - Create, edit, and track orders
- ✅ **Financial Tracking** - Cost, selling price, profit calculations
- ✅ **COD Tax Calculation** - Automatic 4% tax on COD orders
- ✅ **Status Management** - Pending → Dispatched → Completed → Returned
- ✅ **Reports & Analytics** - Sales insights and inventory reports
- ✅ **MongoDB Atlas** - Cloud database integration

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- **Git** - [Download here](https://git-scm.com/)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/inventory-system.git
cd inventory-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4. Start Backend Server

```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
```

### 5. Open Frontend

Open `frontend/index.html` in your browser or use a local server:

```bash
# Option 1: Direct open
open frontend/index.html

# Option 2: Using Python
cd frontend
python -m http.server 3000

# Option 3: Using Node.js http-server
npx http-server frontend -p 3000
```

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Build a Database"
3. Choose **FREE** tier (M0)
4. Select **Mumbai (asia-south1)** region (best for Pakistan)
5. Click "Create Cluster"

### Step 2: Create Database User

1. Go to **Database Access**
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Username: `inventoryuser`
5. Password: Create a strong password
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

### Step 3: Whitelist IP Address

1. Go to **Network Access**
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add your specific IP
5. Click "Confirm"

### Step 4: Get Connection String

1. Go to **Database** → Click "Connect"
2. Choose "Connect your application"
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `inventory`

Example:
```
mongodb+srv://inventoryuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
```

---

## 📁 Project Structure

```
inventory-system/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Category.js        # Category model
│   │   ├── Color.js           # Color model
│   │   ├── Inventory.js       # Inventory model
│   │   └── Order.js           # Order model
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   ├── categories.js      # Category endpoints
│   │   ├── colors.js          # Color endpoints
│   │   ├── inventory.js       # Inventory endpoints
│   │   └── orders.js          # Order endpoints
│   ├── .env.example           # Environment template
│   ├── package.json           # Dependencies
│   └── server.js              # Express server
│
└── frontend/
    └── index.html             # Complete UI with auth
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Colors
- `GET /api/colors` - Get all colors
- `POST /api/colors` - Create color
- `DELETE /api/colors/:id` - Delete color

### Inventory
- `GET /api/inventory` - Get all inventory
- `POST /api/inventory` - Create/update inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

---

## 🔐 Default Login Credentials

**Username:** `admin`  
**Password:** `admin123`

> ⚠️ Change default credentials after first login!

---

## 🌐 Deployment

### Deploy Backend (Render.com)

1. Create account on [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:** Add your `.env` values
5. Click "Create Web Service"

### Deploy Frontend (Vercel/Netlify)

**Vercel:**
```bash
cd frontend
npx vercel
```

**Netlify:**
```bash
cd frontend
npx netlify deploy
```

---

## 🛠️ Development

### Backend Development Mode

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Testing API

Use Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","username":"testuser","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

---

## 📊 Database Collections

```javascript
// users
{
  _id, name, username, password(hashed), email, role, createdAt
}

// categories
{
  _id, name, sizes[], defaultCost, defaultSell, userId
}

// colors
{
  _id, name, code, userId
}

// inventory
{
  _id, category, size, color, stock, costPrice, sellingPrice, userId
}

// orders
{
  _id, orderId, customerName, customerPhone, customerAddress,
  date, items[], actualCost, sellPrice, codTax, deliveryCharges,
  paymentMethod, total, profit, status, userId
}
```

---

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if MongoDB URI is correct in .env
# Check if port 5000 is available
# Check Node.js version
node --version  # Should be v14+
```

### Can't connect to MongoDB

1. Check Network Access whitelist
2. Verify database user credentials
3. Test connection string in MongoDB Compass

### Frontend can't connect to backend

1. Check backend is running on correct port
2. Update API URL in frontend if needed
3. Check CORS settings in backend

---

## 📝 License

MIT License - feel free to use for personal or commercial projects

---

## 👨‍💻 Author

**Iftikhar**  
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

## 📞 Support

For issues and questions:
- Open an [Issue](https://github.com/YOUR_USERNAME/inventory-system/issues)
- Email: your.email@example.com
