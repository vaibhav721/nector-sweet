# Google Play Release Checklist

This repo already contains the Android app in `mobile/` as an Expo React Native project. You do not need to wrap the website to publish on Google Play.

## Current repo state

- `mobile/app.json` now includes a default Android package ID, iOS bundle ID, version code, build number, and URL scheme.
- `mobile/eas.json` now includes:
  - `preview` for internal APK builds
  - `production` for Play Store AAB builds
- The mobile app still depends on:
  - `EXPO_PUBLIC_API_BASE_URL`
  - Firebase client config in `mobile/.env`
- The backend still depends on:
  - live MongoDB
  - Firebase Admin credentials
  - `JWT_DEV_BYPASS=false` in production

## Important blocker before first production Play build

The mobile app is currently on Expo SDK 52. Before submitting to Google Play, confirm the Android target SDK is 35. If it is still 34, upgrade Expo first or add the Android build-properties override before producing the final AAB.

## 1. Production env setup

Create `mobile/.env` with production values:

```bash
EXPO_PUBLIC_API_BASE_URL=https://api.your-domain.com/api
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
```

Create `server/.env` with production values:

```bash
PORT=5000
MONGODB_URI=mongodb+srv://...
WEB_ORIGIN=https://your-web-domain.com
MOBILE_ORIGIN=exp://127.0.0.1:8081
JWT_DEV_BYPASS=false
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
```

`MOBILE_ORIGIN` is only relevant for local Expo/browser-style development. The shipped native app does not rely on browser CORS.

## 2. Release identifiers

The current defaults are:

- Android package: `com.nectarsweet.mobile`
- iOS bundle ID: `com.nectarsweet.mobile`
- URL scheme: `nectarsweet`

Change those now if you want a different permanent store identifier before the first release.

## 3. Backend readiness

Before building the store version, make sure the production backend is live and reachable over HTTPS.

Checklist:

- deploy the Express API
- connect production MongoDB
- seed production catalog and serviceability data
- configure Firebase Email/Password auth
- verify `/health` works publicly
- verify product images load from the production API host
- verify login, browse, cart, checkout preview, and order placement all work against production

## 4. Build commands

From the repo root:

```bash
npm install
npm run build -w shared
```

From `mobile/`:

```bash
npx expo-doctor
npx eas login
npx eas build --platform android --profile preview
```

Use the `preview` build to generate an APK for internal testing.

When ready for Google Play:

```bash
npx eas build --platform android --profile production
```

That produces the AAB you will upload to Play Console.

## 5. Google Play Console steps

1. Create the app in Google Play Console.
2. Use app name `Nectar Sweet` or your final brand name.
3. Complete store listing assets:
   - app icon
   - feature graphic
   - phone screenshots
   - short description
   - full description
   - support email
   - privacy policy URL
4. Complete policy declarations:
   - Data safety
   - app access
   - content rating
   - ads declaration
   - countries and pricing
5. Upload the first production AAB manually in Play Console.
6. Start with internal testing.
7. Move to closed testing or production as required by your Play account type.
8. Use a staged rollout for the first public release.

## 6. Reviewer access

Because login is part of the main app flow, keep a working reviewer account ready:

- email
- password
- short note describing the test path

Suggested reviewer path:

1. Sign in.
2. Browse products.
3. Add an item to cart.
4. Set city, area, and pincode.
5. Open checkout preview.
6. Place a test order.

## 7. Manual release checklist

- [ ] Final package ID confirmed
- [ ] Production API is HTTPS
- [ ] Production MongoDB connected
- [ ] Firebase client config added in `mobile/.env`
- [ ] Firebase Admin config added in `server/.env`
- [ ] `JWT_DEV_BYPASS=false` in production
- [ ] Expo SDK / Android target SDK verified for current Play requirement
- [ ] Internal APK tested on real Android devices
- [ ] Production AAB built successfully
- [ ] Privacy policy published
- [ ] Play listing assets prepared
- [ ] Reviewer credentials prepared
- [ ] First AAB uploaded manually to Play Console
- [ ] Staged rollout plan ready
