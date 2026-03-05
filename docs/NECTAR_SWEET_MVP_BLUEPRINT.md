# Nectar Sweet MVP Blueprint

## 1. Product strategy summary
- Target audience:
  - Urban and semi-urban households in Lucknow ordering daily milk and dairy staples.
  - Working couples/families needing dependable recurring deliveries.
  - Price-aware buyers who still want a premium local-fresh experience.
- Positioning logic:
  - Farm-fresh and affordable is strong because daily dairy is a high-frequency category where trust + consistency + price sensitivity coexist.
- Trust mechanics:
  - Soft trust: local, careful delivery language without hard compliance claims.
  - Repeat trust: subscription controls, delivery slot clarity, serviceability transparency.
  - Operational trust: visible stock status, invoice history, reorder convenience.
- Why conversion should work:
  - Low friction browse-to-cart.
  - Pincode-first serviceability check.
  - Mixed cart (one-time + subscription) reduces decision friction.
  - Manual-payment placeholder keeps MVP launch ready without payment dependency.

## 2. Key assumptions and unresolved items
- Delivery slots are configurable and seeded as Morning, Midday (11-12), Evening.
- Prices are placeholders and stored variant-wise.
- Subscription price is modeled ~10% lower than one-time.
- Payment is intentionally non-gateway in MVP (`PAYMENT_PENDING`/manual settlement).
- Launch geography assumed Lucknow + 7 placeholder service areas with placeholder pin codes.
- Final brand identity (logo, palette, fonts) is placeholder-driven via centralized config.
- Auth requires Firebase credentials for production; local dev fallback headers are enabled for faster MVP iteration.

## 3. Full sitemap
- Website (public):
  - Home
  - Shop
  - Product Detail
  - Subscription Planner
  - Serviceability Checker
  - Waitlist
  - Our Story
  - Login / Signup
  - Cart
  - Checkout
  - Order Success
  - 404
- Website (customer account):
  - Dashboard
  - Invoice History
  - Reorder
  - Active Subscriptions
  - Profile
- Admin:
  - Admin Login
  - Dashboard
  - Product Management
  - Stock Management
  - Orders Management
  - Subscription Management
  - Serviceability Management
  - Waitlist Management
  - Expiry Management
  - New Users Listing
- Mobile app:
  - Home
  - Products
  - Product Detail
  - Cart
  - Checkout
  - Subscriptions
  - Account
  - Invoice History
  - Reorder
  - Serviceability Check
  - Waitlist
  - Login/Signup

## 4. User roles
- Guest:
  - Browse catalog and content pages.
  - Check serviceability and join waitlist.
  - Prompted to login at order/subscription conversion points.
- Customer:
  - Cart + checkout + orders + invoices + subscriptions.
  - Reorder and subscription controls.
- Admin:
  - Full MVP operational control over catalog, prices, stock, serviceability, waitlist, orders, subscriptions, expiry, and user summaries.

## 5. Complete UX flow breakdown
- Browse without login:
  - User lands on home/shop, explores categories and product variants.
- Select city/area/pincode:
  - Serviceability screen captures all three values.
- Serviceability decision:
  - Backend checks by pincode as final authority.
- Non-serviceable:
  - Friendly message + waitlist form (name, phone/email, city, area, pincode).
- Add one-time products:
  - From listing/detail, choose variant and add as `ONE_TIME`.
- Add subscription products:
  - Add as `SUBSCRIPTION` with frequency metadata.
- Mixed cart:
  - Cart contains mixed purchase modes and computes subscription discount + tax.
- Login at checkout:
  - Login required before placing order or starting subscription commitment.
- Place order without payment gateway:
  - Checkout preview -> slot select -> place order -> `PAYMENT_PENDING` state.
- Manage subscription post purchase:
  - Pause, skip day, extra quantity day, change frequency, edit quantity.
- Reorder:
  - Invoice/reorder screen triggers `POST /orders/:id/reorder`.
- Admin updates:
  - Product/variant/price/stock/serviceability updates immediately affect customer flows.

## 6. Design system
- Theme-ready tokens:
  - `shared/src/config/brand.ts` provides name, logo, colors, fonts, tagline, trust pillars, contact.
- Color placeholders:
  - Primary: deep farm green.
  - Secondary: warm cream.
  - Accent: golden dairy tone.
  - Background/text values editable centrally.
- Typography:
  - Heading: Lora (placeholder premium serif).
  - Body: Nunito Sans (readable and warm).
- Spacing:
  - 4/8/12/16/20/24/32 scale across cards, forms, sections.
- Components:
  - Buttons (primary/secondary/ghost/danger)
  - Cards
  - Inputs/selects
  - Navbar/footer/mobile nav
  - Badges
  - Empty states
  - Toasts
  - Modals
- Animation:
  - Subtle fade-slide-up entry for key hero content.
- Branding customization:
  - CSS variables are injected from `brandConfig` in web entrypoint.

## 7. Information architecture and page-by-page breakdown
- Home:
  - Goal: trust + conversion.
  - Sections: hero, trust pillars, how it works, subscription explainer, serviceability prompt.
  - CTA: Start Shopping, Plan Subscription.
  - States: static fallback, responsive cards.
- Shop:
  - Goal: browse and add variants.
  - Sections: category filter, product cards, variant pricing actions.
  - States: loading skeleton, add success toast.
- Product detail:
  - Goal: compare variants quickly and add.
  - States: loading/error/stock status.
- Subscription planner:
  - Goal: explain frequency and controls before conversion.
- Serviceability checker:
  - Goal: resolve service status by pincode.
  - Non-serviceable: waitlist path.
- Waitlist:
  - Goal: capture expansion lead.
- Our Story:
  - Goal: soft brand narrative.
- Cart:
  - Goal: mixed line-item review, quantity edits, location capture.
  - Empty state: prompt to shop.
- Checkout:
  - Goal: slot select + place order with payment placeholder.
  - Error state: non-serviceable or missing location.
- Order success:
  - Goal: confirmation + invoice direction.
- Account dashboard:
  - Goal: summary + next actions.
- Invoice history/reorder:
  - Goal: retention through repeat purchase.
- Active subscriptions:
  - Goal: reduce churn with flexibility controls.
- Profile:
  - Goal: basic read-only MVP identity settings.
- Admin modules:
  - Goal: operations control for daily business.

## 8. Database schema (MongoDB models)
Implemented models in `server/src/models`:
- `User`
- `Address`
- `Category`
- `Product`
- `ProductVariant`
- `Cart`
- `CartItem`
- `Subscription`
- `SubscriptionSchedule`
- `Order`
- `OrderItem`
- `Invoice`
- `ServiceableCity`
- `ServiceableArea`
- `ServiceablePincode`
- `WaitlistRequest`
- `Inventory`
- `ExpiryRecord`
- `AdminUser`
- `Notification`
- `AppSetting`

Highlights:
- Mixed cart via `CartItem.purchaseMode`.
- Subscription controls via `Subscription` + `SubscriptionSchedule` overrides.
- Serviceability by `ServiceablePincode` with city/area references.
- Inventory reservation via `Inventory.reservedQty` for subscriptions.
- Payment extension ready via `Order.paymentStatus` + invoice separation.

## 9. API design (REST)
Base prefix: `/api`

Auth:
- `POST /auth/sync`
- `GET /auth/me`

Catalog:
- `GET /catalog/categories`
- `GET /catalog/products`
- `GET /catalog/products/:slug`

Serviceability:
- `GET /serviceability/options`
- `GET /serviceability/check?pincode=226010`

Waitlist:
- `POST /waitlist`

Cart:
- `GET /cart`
- `POST /cart/location`
- `POST /cart/items`
- `PATCH /cart/items/:itemId`
- `DELETE /cart/items/:itemId`

Checkout:
- `POST /checkout/preview`
- `POST /checkout/place`

Orders:
- `GET /orders`
- `GET /orders/:orderId`
- `POST /orders/:orderId/reorder`

Invoices:
- `GET /invoices`
- `GET /invoices/:invoiceId`

Subscriptions:
- `GET /subscriptions`
- `PATCH /subscriptions/:subscriptionId`
- `POST /subscriptions/:subscriptionId/skip`
- `POST /subscriptions/:subscriptionId/extra`
- `POST /subscriptions/:subscriptionId/pause`

Admin:
- `GET /admin/dashboard`
- Product/variant CRUD: `/admin/products`, `/admin/products/:id`, `/admin/variants/:id`
- Stock: `GET /admin/stock`, `PATCH /admin/stock/:variantId`
- Expiry: `GET/POST/PATCH /admin/expiry`
- Orders: `GET/PATCH /admin/orders`
- Subscriptions: `GET/PATCH /admin/subscriptions`
- Serviceability: `GET/POST/PATCH/DELETE /admin/serviceability/*`
- Waitlist: `GET/PATCH /admin/waitlist`
- Users: `GET /admin/users/new`
- Settings: `GET /admin/settings`, `PATCH /admin/settings/:key`

Example request:
```http
POST /api/cart/items
Content-Type: application/json

{
  "variantId": "676f...",
  "quantity": 2,
  "purchaseMode": "SUBSCRIPTION",
  "frequency": "DAILY"
}
```

Example response:
```json
{
  "success": true,
  "data": {
    "id": "cartId",
    "items": [
      {
        "variantId": "676f...",
        "purchaseMode": "SUBSCRIPTION",
        "quantity": 2
      }
    ],
    "subtotal": 112,
    "subscriptionDiscount": 11.2,
    "tax": 5.04,
    "total": 105.84
  }
}
```

## 10. Admin panel architecture
- Built as web module under `/admin` routes.
- Dashboard widgets:
  - Today's deliveries
  - Subscription count
  - New users
- Operations modules:
  - Products and variants
  - Pricing/stock
  - Orders/subscriptions
  - Serviceability pin codes
  - Waitlist leads
  - Expiry records
  - New users listing
- UX style:
  - Left sidebar navigation, card-based data blocks, inline status updates.

## 11. Mobile app architecture
- Stack:
  - Expo + React Native + React Navigation.
- Navigation:
  - Bottom tabs for core daily use.
  - Stack for detail and utility screens.
- Shared logic:
  - Reuses API structure and shared package config/types.
  - Same backend contracts for cart, checkout, subscriptions, invoices.
- Reuse strategy:
  - Domain models and config in `shared`.
  - Validation and endpoint shapes mirrored across web/mobile.

## 12. Monorepo folder structure
```text
.
├── web/       # React + Tailwind website + admin
├── mobile/    # Expo React Native app
├── server/    # Node/Express REST API + Mongo models
├── shared/    # Shared TS types, config, constants, validators
└── docs/      # Strategy and architecture docs
```

## 13. Buildable code delivered
- Web:
  - React Router pages for all required public/account/admin flows.
  - Tailwind design system and configurable theming.
- Mobile:
  - Expo app with equivalent core screens and API integration.
- Server:
  - Express API with route modules, middlewares, services.
  - Firebase auth integration support and dev bypass fallback.
  - MongoDB schema coverage for all requested entities.
- Shared:
  - Cross-platform types/config/validators.
- Seed data:
  - `server/src/scripts/seed.ts` includes launch catalog, variants, inventory, serviceability.

## 14. Sample editable content
- Homepage hero:
  - "Farm-fresh dairy for your daily table"
  - "Nectar Sweet brings milk and dairy essentials from local farms to your doorstep in Lucknow."
- Trust section:
  - "Why families trust Nectar Sweet"
- Why choose us:
  - Purity-first process, farm origin feel, traditional taste.
- How it works:
  - Choose dairy -> choose order mode -> get carefully delivered.
- Subscription explanation:
  - "Pause, skip, or edit quantity anytime."
- Our Story:
  - Local-traditional placeholder narrative included.
- Non-serviceable message:
  - "We will reach your location very soon."
- Cart/checkout microcopy:
  - "No online payment yet. Place order now and settle manually at delivery."
- Subscription controls text:
  - Pause, skip day, +extra quantity day, change frequency, edit quantity.
- Invoice empty state:
  - "No invoices yet. Once you place your first order, invoice history appears here."
- Admin dashboard labels:
  - "Today's deliveries", "Subscription count", "New users".

## 15. Future-ready extension plan
- Final branding:
  - Update `shared/src/config/brand.ts` + dynamic `AppSetting` overrides.
- Online payments:
  - Add `Payment` model + gateway webhook routes; transition from pending/manual to paid states.
- Coupons/referrals:
  - Add promotion entities and checkout pricing pipeline.
- WhatsApp support:
  - Activate contact CTA and backend notification hooks.
- Analytics:
  - Add event collection middleware + product funnel dashboards.
- Push notifications:
  - Add device token storage and notification jobs for delivery/subscription alerts.
- Multiple addresses:
  - Expand account address CRUD and order address selection.
- Certifications/testing pages:
  - Add CMS-like sections or `AppSetting` content blocks.
- Advanced slot logic:
  - Slot capacity, lead times, cutoff windows, holiday calendar.

---

## Environment and run
1. Install dependencies from repo root:
```bash
npm install
```
2. Copy env templates:
```bash
cp server/.env.example server/.env
cp web/.env.example web/.env
cp mobile/.env.example mobile/.env
```
3. Start MongoDB locally.
4. Seed sample data:
```bash
npm run seed -w server
```
5. Run API + web + mobile:
```bash
npm run dev:server
npm run dev:web
npm run dev:mobile
```

