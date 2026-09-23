# FilterMart 🛒

**FilterMart** is a high-performance, interactive e-commerce and product discovery interface built with **React** and **Vite**. The application is built to demonstrate skills in react, highlighting real-time multi-faceted filtering, instant URL-based state sync for shareable search results, custom UI styling, and dynamic routing.

---

## 🚀 Key Features

* **Multi-Faceted Filtering:** Dynamically filter products by category, price ranges, ratings, and availability simultaneously.
* **URL-Driven State Management:** Search queries, active filters, and sorting choices are mirrored in URL search parameters (`useSearchParams`), allowing users to bookmark and share exact search states.
* **Real-Time Search & Sorting:** Instant product lookup with client-side state optimization (`useMemo`).
* **Responsive E-Commerce UI:** Handcrafted CSS layout built to work seamlessly across mobile, tablet, and desktop screens.
* **Interactive Shopping Cart:** Client-side cart management for adding, updating quantities, and removing items.

---

## 🛠️ Project Breakdown & Tech Stack

This project was built using **React** with **Vite** for fast HMR (Hot Module Replacement) and bundling.

| Component / Layer | Technology | Share / Focus |
| --- | --- | --- |
| **User Interface & Components** | React + JSX | **60%** — Modular component architecture, component state, layout structure |
| **Styling & Layout** | Custom CSS | **25%** — Responsive design, flexbox/grid layouts, custom theme styles |
| **Business Logic** | JavaScript (ES6+) | **10%** — Filtering algorithms, state reducers, data manipulation |
| **Tooling & Build** | Vite | **3%** — Project configuration, fast dev server, optimized build bundling |
| **Routing & URL State** | React Router | **2%** — URL parameter synchronization, navigation handling |

---

## 📁 Project Structure

```text
filtermart/
├── public/               # Static assets & favicon
├── src/
│   ├── assets/           # Images & media files
│   ├── components/       # Reusable UI components (ProductCard, FilterSidebar, SearchBar)
│   ├── context/          # State management (CartContext, FilterContext)
│   ├── data/             # Mock product catalog data
│   ├── hooks/            # Custom hooks (e.g., useDebounce, useURLFilters)
│   ├── routes/           # Page routes (Catalog, ProductDetails, Cart)
│   ├── App.jsx           # Application root & router provider
│   ├── main.jsx          # Entry point
│   └── index.css         # Custom CSS stylesheets
├── index.html
├── package.json
└── vite.config.js

```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v16 or higher) installed on your system.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/filtermart.git
cd filtermart

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```


4. Open your browser and navigate to `http://localhost:5173` to view the app.

---

## 🎯 Technical Concepts Demonstrated

* **Performance Optimization:** Leveraged `useMemo` to cache heavy array-filtering operations across hundreds of product nodes.
* **Declarative Navigation:** Synchronized client UI state with browser history using React Router hooks.
* **Clean Architecture:** Maintained strict single-responsibility principles across presentation components and functional state hooks.
