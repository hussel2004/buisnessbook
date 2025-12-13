# 🚀 Quick Start Guide - Business Directory Application

## ✅ Setup Complete!

Your Business Directory application is ready to run. Follow these simple steps:

---

## 📦 What's Been Configured

### Backend (.env file created):
```
✓ Database: businessdirectory
✓ Username: postgres
✓ Password: hussel
✓ JWT Secret: Generated
✓ CORS: Enabled for localhost:3000
```

### Frontend (packages installed):
```
✓ Next.js 15
✓ React 19
✓ TypeScript
✓ Tailwind CSS
✓ Axios
✓ Lucide React (icons)
✓ date-fns
```

---

## 🎯 How to Run the Application

### Option 1: Using the Launch Script (Easiest)

#### Step 1: Start the Backend
```bash
cd backend
run-backend.cmd
```

The backend will:
1. Automatically detect Java installation
2. Download Maven if needed
3. Compile the application
4. Start the server on http://localhost:8080

**Wait for this message:**
```
Started BusinessDirectoryApplication in X seconds
```

#### Step 2: Start the Frontend (in a new terminal)
```bash
cd frontend
npm run dev
```

The frontend will start on http://localhost:3000

---

### Option 2: Manual Commands

#### Backend:
```bash
cd backend

# Set JAVA_HOME (if needed)
set JAVA_HOME=C:\Program Files\Java\jdk-24

# Run the application
mvnw.cmd spring-boot:run
```

#### Frontend:
```bash
cd frontend
npm run dev
```

---

## 🌐 Access the Application

1. **Frontend (User Interface):** http://localhost:3000
2. **Backend API:** http://localhost:8080
3. **API Health Check:** http://localhost:8080/api/businesses

---

## 👥 Test Accounts

### Create Your First Account:
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Fill in your details
4. Select account type:
   - **VISITOR**: Browse and comment
   - **BUSINESS_OWNER**: Create and manage businesses

---

## 📝 Common Tasks

### Create a Business (Business Owner):
1. Login with BUSINESS_OWNER account
2. Go to "My Businesses" in the navbar
3. Click "Add Business"
4. Fill in business details
5. Submit

### Browse Businesses (Anyone):
1. Go to homepage
2. Use search bar or click "View All Businesses"
3. Filter by category
4. Click on any business to view details

### Comment on Business (Visitor/Owner):
1. Open any business detail page
2. Use the comments sidebar on the right
3. Write your comment and submit

---

## 🔧 Troubleshooting

### Backend Won't Start:

**Issue: "JAVA_HOME not found"**
```bash
# Find your Java installation
where java

# Set JAVA_HOME manually (replace with your path)
set JAVA_HOME=C:\Program Files\Java\jdk-24
```

**Issue: "Connection refused to database"**
- Make sure PostgreSQL is running
- Verify database "businessdirectory" exists
- Check credentials in `backend/.env`

**Issue: "Port 8080 already in use"**
```bash
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Frontend Won't Start:

**Issue: "Port 3000 already in use"**
- The app will offer to use port 3001 automatically
- Or kill the process using port 3000

**Issue: "Cannot connect to API"**
- Make sure backend is running on http://localhost:8080
- Check console for errors
- Verify `.env.local` has correct API URL

---

## 📂 Project Structure

```
business-directory/
├── backend/                    # Spring Boot API
│   ├── .env                    # Database credentials (DO NOT COMMIT)
│   ├── run-backend.cmd         # Easy launch script
│   ├── mvnw.cmd                # Maven wrapper
│   ├── pom.xml                 # Dependencies
│   └── src/
│       └── main/
│           ├── java/           # Java source code
│           └── resources/      # Configuration files
│
├── frontend/                   # Next.js App
│   ├── .env.local              # API URL configuration
│   ├── package.json            # Dependencies
│   ├── app/                    # Pages
│   ├── components/             # Reusable UI components
│   ├── lib/                    # API client & utilities
│   └── types/                  # TypeScript types
│
└── README.md                   # Full documentation
```

---

## 🎨 Features Available

### Public Features:
- ✅ Browse business directory
- ✅ Search businesses by name/category
- ✅ View business details with tabs
- ✅ Read posts and promotions
- ✅ View comments

### Authenticated User (VISITOR):
- ✅ All public features
- ✅ Comment on businesses
- ✅ Comment on posts
- ✅ Like posts

### Business Owner:
- ✅ All visitor features
- ✅ Create/Edit/Delete businesses
- ✅ Manage business posts
- ✅ Create promotions
- ✅ View business analytics (views)
- ✅ Business dashboard

---

## 🔐 Security Notes

⚠️ **IMPORTANT:**
- The `.env` file contains your database password
- Never commit `.env` to Git (already in .gitignore)
- For production, use environment variables

---

## 📚 Next Steps

1. **Start both applications** (backend & frontend)
2. **Register a business owner account**
3. **Create your first business**
4. **Add some posts and promotions**
5. **Test the features!**

---

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Backend API docs: [backend/README.md](backend/README.md)
- Frontend docs: [frontend/README.md](frontend/README.md)

---

## 🎉 You're All Set!

Run this command to start everything:

**Terminal 1 (Backend):**
```bash
cd backend && run-backend.cmd
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm run dev
```

Then open http://localhost:3000 in your browser!

Happy coding! 🚀
