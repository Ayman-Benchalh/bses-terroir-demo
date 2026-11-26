# TERROIR V6 — FUNCTIONAL REGRESSION REPORT
**Test Runner:** Playwright Test v1.50+  
**Executed Tests:** 78  
**Passed Tests:** 78 (100%)  
**Failed Tests:** 0

---

## 1. Verified Functional Areas

### A. Storefront & Catalog
- Multi-category filtering and real-time live search.
- Fractional unit calculation (e.g., 0.5 kg increments for fresh produce).
- Dynamic stock validation preventing over-ordering.

### B. Cart & Checkout Simulation
- Local storage persistence for basket state.
- Moroccan postal zones with conditional free delivery calculations (Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir).
- Promotional discount code execution with percentage and fixed MAD arithmetic.
- Simulated checkout order generation and live tracking workflow (`order-tracking`).

### C. Admin Demonstration Sandbox
- Live CRUD capabilities for product inventory.
- Real-time KPI cards reflecting sales, orders, and cooperative disbursements.

### D. Multi-Language Parity
- 100% dictionary key parity verified across French, English, and Arabic dictionaries.
- Complete localized metadata for all 50 catalog items.
