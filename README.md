# 💰 Expense Tracker SaaS Dashboard

A modern, fully responsive **Expense Tracker Web Application** built with:

- ⚛️ React.js
- ⚡ Vite.js
- 🎨 Tailwind CSS
- 💾 Local Storage (No Backend)
- 📊 Recharts (Analytics)
- 📁 XLSX (Import/Export Excel)

This project is designed like a **premium SaaS finance dashboard** similar to Stripe, Notion, and Vercel.

---

# 🚀 Features

## 📊 Dashboard
- Total Balance
- Income & Expenses tracking
- Transaction summary cards
- Clean modern UI

---

## 💸 Transactions System
- Add income and expenses
- Delete transactions
- Filter (Income / Expense / All)
- Search transactions
- Sort by date & amount
- Persistent data using localStorage

---

## 🗂 Categories System (Dynamic)
- Create custom categories
- Delete categories
- Default categories included:
  - Food
  - Shopping
  - Transport
  - Salary
  - Bills
  - Entertainment

All categories stored in localStorage.

---

## 👤 Profile Management (NEW)
- Change profile name
- Change email
- Upload profile image
- Remove profile image
- Instant update across app (Sidebar + Header)
- Stored in localStorage

---

## 🌙 Dark Mode (FULL FIXED)
- Global dark mode support
- Works across entire app
- Persistent theme storage
- Instant toggle without refresh
- Fully compatible UI components

---

## 📁 Import / Export System
- Export data to Excel (.xlsx)
- Import Excel files
- Backup & restore JSON data
- Merge or replace data options

---

## 📊 Analytics Dashboard
- Income vs Expense charts
- Pie charts for categories
- Visual spending insights

---

## 🎨 Modern UI/UX
- SaaS-style dashboard design
- Sidebar navigation
- Responsive layout
- Glassmorphism cards
- Smooth animations
- Soft shadows & gradients
- Mobile-friendly UI

---

# 🧱 Tech Stack

## Frontend
- React.js
- Vite.js
- Tailwind CSS

## State & Storage
- React Hooks
- Context API
- LocalStorage

## Libraries
- react-icons
- uuid
- recharts
- xlsx
- file-saver

---

# 📂 Project Structure
src/
├── components/
│ ├── Sidebar.jsx
│ ├── Header.jsx
│ ├── DashboardCards.jsx
│ ├── TransactionList.jsx
│ ├── CategoryManager.jsx
│ ├── ProfileCard.jsx
│ └── settings/
│ ├── SettingsLayout.jsx
│ ├── ProfileSettings.jsx
│ ├── AppearanceSettings.jsx
│ ├── ImportExport.jsx
│ └── BackupRestore.jsx
│
├── pages/
│ ├── Dashboard.jsx
│ ├── Transactions.jsx
│ ├── Analytics.jsx
│ ├── Categories.jsx
│ └── Settings.jsx
│
├── hooks/
│ ├── useLocalStorage.js
│ └── useTheme.js
│
├── context/
│ ├── ThemeContext.jsx
│ └── UserContext.jsx
│
├── utils/
│ ├── exportExcel.js
│ ├── importExcel.js
│ └── formatCurrency.js
│
├── App.jsx
└── main.jsx
