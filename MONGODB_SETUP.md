# 🗄️ MongoDB Atlas Setup Guide

Complete step-by-step guide to connect your inventory system with MongoDB Atlas.

---

## 📌 Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with:
   - Google account (easiest), OR
   - Email + Password
3. Verify your email

---

## 📌 Step 2: Create a Cluster (Database)

1. After login, click **"Build a Database"**
2. Choose **FREE** tier (M0 Sandbox)
   - ✅ 512MB Storage
   - ✅ Shared RAM
   - ✅ Perfect for testing
3. Select Cloud Provider & Region:
   - Provider: **AWS** (recommended)
   - Region: **Mumbai (ap-south-1)** (best for Pakistan)
4. Cluster Name: Keep default or name it `Cluster0`
5. Click **"Create Cluster"**
6. Wait 3-5 minutes for cluster creation

---

## 📌 Step 3: Create Database User

1. On the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Fill in:
   - Username: `inventoryuser` (or your choice)
   - Password: Click "Autogenerate Secure Password" OR create your own
   - **IMPORTANT:** Save this password somewhere safe!
5. Database User Privileges: 
   - Select **"Read and write to any database"**
6. Click **"Add User"**

---

## 📌 Step 4: Whitelist IP Address

1. On the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Choose one:
   - **Option A (Easy):** Click **"Allow Access from Anywhere"**
     - This adds `0.0.0.0/0`
     - ✅ Works from anywhere
     - ⚠️ Less secure (fine for development)
   
   - **Option B (Secure):** Click **"Add Current IP Address"**
     - Adds only your current IP
     - ✅ More secure
     - ⚠️ Need to update if IP changes
4. Click **"Confirm"**

---

## 📌 Step 5: Get Connection String

1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button next to your cluster
3. Choose **"Connect your application"**
4. Select:
   - Driver: **Node.js**
   - Version: **5.5 or later**
5. Copy the connection string (looks like this):

```
mongodb+srv://inventoryuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. **IMPORTANT MODIFICATIONS:**
   - Replace `<password>` with your actual database user password
   - Add database name `/inventory` before the `?`
   
   **Final format:**
   ```
   mongodb+srv://inventoryuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
   ```

---

## 📌 Step 6: Add to Your Project

1. Open `backend/.env` file
2. Replace the `MONGODB_URI` value with your connection string:

```env
MONGODB_URI=mongodb+srv://inventoryuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/inventory?retryWrites=true&w=majority
```

3. Save the file

---

## 📌 Step 7: Test Connection

1. Open terminal in `backend` folder
2. Run:
   ```bash
   npm start
   ```

3. You should see:
   ```
   ✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
   📊 Database: inventory
   🚀 Server running on port 5000
   ```

4. If you see this ✅ **SUCCESS!**

---

## 🐛 Common Issues & Solutions

### Issue 1: "MongoServerError: bad auth"
**Solution:** Password is wrong
- Go to Database Access
- Edit user → Reset password
- Update in `.env` file

### Issue 2: "MongooseError: Operation timed out"
**Solution:** IP not whitelisted
- Go to Network Access
- Add "Allow Access from Anywhere" (0.0.0.0/0)

### Issue 3: "Cannot connect to cluster"
**Solution:** Connection string format wrong
- Make sure format is:
  ```
  mongodb+srv://username:password@cluster.xxxxx.mongodb.net/inventory?...
  ```
- Check database name `/inventory` is included

### Issue 4: "Database not created"
**Solution:** Database creates automatically
- MongoDB Atlas creates database on first data insert
- Just start using the app, it will create automatically

---

## 🔍 View Your Data

1. Go to **"Database"** in MongoDB Atlas
2. Click **"Browse Collections"**
3. Select your database: `inventory`
4. You'll see collections:
   - `users`
   - `categories`
   - `colors`
   - `inventory`
   - `orders`

---

## 📊 Database Structure

After first use, you'll see these collections:

### users
```javascript
{
  _id: ObjectId("..."),
  name: "Admin",
  username: "admin",
  password: "$2a$10$...", // Hashed
  role: "admin",
  createdAt: ISODate("...")
}
```

### categories
```javascript
{
  _id: ObjectId("..."),
  name: "Cotton Fabric",
  sizes: [14, 16, 18, 20, 22, 24],
  defaultCost: 300,
  defaultSell: 450,
  userId: ObjectId("..."),
  createdAt: ISODate("...")
}
```

### inventory
```javascript
{
  _id: ObjectId("..."),
  category: "Cotton Fabric",
  size: "18",
  color: "Red",
  stock: 50,
  costPrice: 300,
  sellingPrice: 450,
  userId: ObjectId("..."),
  createdAt: ISODate("...")
}
```

### orders
```javascript
{
  _id: ObjectId("..."),
  orderId: 1,
  customerName: "Ali Khan",
  customerPhone: "03001234567",
  customerAddress: "Lahore, Pakistan",
  items: [
    {
      category: "Cotton Fabric",
      size: "18",
      color: "Red",
      quantity: 2,
      costPrice: 300,
      sellingPrice: 450
    }
  ],
  actualCost: 600,
  sellPrice: 900,
  codTax: 36,
  deliveryCharges: 250,
  paymentMethod: "COD",
  total: 1186,
  profit: 14,
  status: "Pending",
  userId: ObjectId("..."),
  createdAt: ISODate("...")
}
```

---

## 💰 Pricing (Free Tier Limits)

**MongoDB Atlas Free Tier (M0):**
- ✅ 512MB Storage
- ✅ Shared RAM (1GB)
- ✅ 100 connections max
- ✅ Perfect for small business
- ✅ No credit card required

**When to Upgrade:**
- If you exceed 512MB storage
- Need more than 100 concurrent connections
- Want dedicated RAM
- Upgrade starts at **$9/month** (M2 tier)

**Your estimated usage:**
- 1000 products = ~1MB
- 10,000 orders = ~10MB
- You can easily manage **50,000+ orders** on free tier

---

## 🔒 Security Best Practices

1. **Never share your password**
2. **Don't commit .env file to GitHub**
3. **Use strong passwords** (min 12 characters)
4. **Enable 2FA** on MongoDB Atlas account
5. **Whitelist specific IPs** for production

---

## 📞 Need Help?

**MongoDB Atlas Support:**
- Documentation: https://docs.atlas.mongodb.com/
- Community: https://www.mongodb.com/community/forums/
- Status: https://status.mongodb.com/

**Quick Test:**
```bash
# In backend folder
node -e "require('mongoose').connect('YOUR_CONNECTION_STRING').then(() => console.log('✅ Connected!')).catch(e => console.error('❌', e.message))"
```

---

✅ **Setup Complete!** Your inventory system is now connected to MongoDB Atlas!
