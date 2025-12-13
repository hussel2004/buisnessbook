# 🚀 START HERE - Launch Instructions

## ✅ Prerequisites Check
- ✓ PostgreSQL database `businessdirectory` created
- ✓ Database credentials configured in `backend/.env`
- ✓ Frontend packages installed (334 packages)
- ✓ Java 24 installed
- ✓ Maven wrapper downloaded

---

## 📋 Step-by-Step Launch Guide

### **Step 1: Start the Backend (Spring Boot)**

#### Option A: Using Command Prompt (Recommended)
1. Open **Command Prompt** (not PowerShell or Git Bash)
2. Navigate to backend folder:
   ```cmd
   cd C:\Users\J-STORE\Desktop\buisnessbook\backend
   ```

3. Set JAVA_HOME:
   ```cmd
   set JAVA_HOME=C:\Program Files\Java\jdk-24
   ```

4. Run Spring Boot:
   ```cmd
   mvnw.cmd spring-boot:run
   ```

5. **Wait for this message:**
   ```
   Started BusinessDirectoryApplication in X.XXX seconds
   ```

#### Option B: Using the run script
1. Open Command Prompt
2. Navigate to backend:
   ```cmd
   cd C:\Users\J-STORE\Desktop\buisnessbook\backend
   ```

3. Run:
   ```cmd
   run-backend.cmd
   ```

---

### **Step 2: Verify Backend is Running**

Open your browser and go to:
```
http://localhost:8080/api/businesses
```

You should see: `{"content":[],"pageable":{...}}`

---

### **Step 3: Start the Frontend (Next.js)**

1. Open a **NEW** Command Prompt or Terminal
2. Navigate to frontend folder:
   ```cmd
   cd C:\Users\J-STORE\Desktop\buisnessbook\frontend
   ```

3. Start Next.js:
   ```cmd
   npm run dev
   ```

4. **Wait for:**
   ```
   ▲ Next.js 15.x.x
   - Local: http://localhost:3000
   ```

---

### **Step 4: Open the Application**

Open your browser and go to:
```
http://localhost:3000
```

You should see the **Business Directory homepage** with a search bar!

---

## 🎯 Quick Test

### Test 1: Create an Account
1. Click "Sign Up" in the top right
2. Fill in:
   - Email: `test@example.com`
   - Password: `password123`
   - First Name: `Test`
   - Last Name: `User`
   - Account Type: **Business Owner**
3. Click "Create account"

### Test 2: Create a Business
1. After login, click "My Businesses" in navbar
2. Click "Add Business"
3. Fill in business details:
   - Name: `My Test Business`
   - Category: Select one
   - Description, address, phone, etc.
4. Click "Create Business"

### Test 3: View Your Business
1. Go to "Directory" from navbar
2. Find your business in the list
3. Click on it to see the detail page with tabs

---

## 🔧 Troubleshooting

### Backend Issues:

**Error: "JAVA_HOME not found"**
```cmd
set JAVA_HOME=C:\Program Files\Java\jdk-24
echo %JAVA_HOME%
```

**Error: "mvnw.cmd not found"**
- Make sure you're in the `backend` directory
- Check that `mvnw.cmd` file exists

**Error: "Connection refused" or database errors**
1. Check PostgreSQL is running (Windows Services)
2. Verify database exists:
   ```sql
   psql -U postgres
   \l
   -- Should show "businessdirectory"
   ```
3. Check credentials in `backend/.env`:
   ```
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=hussel
   ```

**Error: "Port 8080 already in use"**
```cmd
netstat -ano | findstr :8080
taskkill /PID <process_id> /F
```

### Frontend Issues:

**Error: "Port 3000 in use"**
- Next.js will automatically offer port 3001
- Or kill the process using 3000

**Error: "Cannot connect to API"**
- Make sure backend is running on http://localhost:8080
- Check console in browser dev tools (F12)

---

## 📊 What Should You See?

### Backend Console (when running):
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (vX.X.X)

...
Started BusinessDirectoryApplication in X.XXX seconds
```

### Frontend Console:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in Xms
```

### Browser (http://localhost:3000):
- Blue gradient header
- "Discover Local Businesses" title
- Search bar
- Business listings

---

## 🎨 Application Structure

```
Your App Running:

┌─────────────────────────────────────┐
│  Frontend (Next.js)                 │
│  http://localhost:3000              │
│  - Homepage with search             │
│  - Business directory               │
│  - Login/Register                   │
│  - Business detail pages            │
└─────────────────────────────────────┘
            ↓ API Calls
┌─────────────────────────────────────┐
│  Backend (Spring Boot)              │
│  http://localhost:8080/api          │
│  - REST API endpoints               │
│  - JWT Authentication               │
│  - Business logic                   │
└─────────────────────────────────────┘
            ↓ Database Queries
┌─────────────────────────────────────┐
│  PostgreSQL Database                │
│  localhost:5432/businessdirectory   │
│  - User, Business, Post tables      │
│  - Comments, Promotions, Likes      │
└─────────────────────────────────────┘
```

---

## ✅ Success Checklist

- [ ] Backend started on port 8080
- [ ] Can access http://localhost:8080/api/businesses
- [ ] Frontend started on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can click "Sign Up" button
- [ ] Can see the homepage properly

---

## 🆘 Still Having Issues?

If you're still having trouble, please:

1. **Check the backend logs** for any error messages
2. **Check browser console** (F12) for frontend errors
3. **Verify PostgreSQL is running**
4. **Make sure ports 3000 and 8080 are free**

---

## 🎉 Once Everything is Running...

You have a full-stack application with:
- ✅ User authentication (JWT)
- ✅ Business directory with search
- ✅ Business CRUD operations
- ✅ Comments system
- ✅ Post likes
- ✅ Promotions
- ✅ Role-based access control

**Next steps:**
1. Create a business owner account
2. Add your first business
3. Create some posts
4. Add promotions
5. Test commenting
6. Explore all features!

---

**Need the detailed documentation?**
- Main README: `README.md`
- Backend API: `backend/README.md`
- Frontend: `frontend/README.md`
- Quick Start: `QUICKSTART_GUIDE.md`
