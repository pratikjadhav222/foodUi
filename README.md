# 🍔 FoodApp — React Navigation Assignment

A complete Food Delivery App covering all major React Navigation patterns: nested navigators, auth flow, deep linking, params, and programmatic navigation.

---

## 🔗 Submission Links

| | Link |
|---|---|
| GitHub Repo | *(add your public repo link here)* |
| Demo Video | *(add your 2-min Loom/YouTube link here)* |
| TLDraw Diagram | *(add your tldraw.com share link here)* |

---

## 🛠 Tech Stack

- **Expo** (SDK 54) + **React Native**
- **Expo Router** v4 — file-based routing
- **React Navigation** v7 — Stack, Bottom Tabs, Drawer
- **TypeScript**, **Bun** (package manager)
- **AsyncStorage** — auth persistence
- **Ionicons** — tab bar icons

---

## 🚀 How to Run

```bash
bun install
bun run start      # scan QR with Expo Go
bun run android    # Android
bun run ios        # iOS
```

---

## 🗺️ Navigation Structure

```
Root
├── (auth)/             Stack — shown when NOT logged in
│   ├── onboarding      Get Started → replace to login
│   └── login           Login → replace to app
│
└── (app)/              Bottom Tabs — shown when logged in
    ├── (home)/         Stack (nested inside Home tab)
    │   ├── index       Home screen
    │   ├── restaurant/ Restaurant Detail  ← tab bar hidden
    │   └── cart        Cart              ← tab bar hidden
    ├── search          Search Tab
    ├── orders          Orders Tab  ← badge when cart non-empty
    └── (profile)/      Drawer (nested inside Profile tab)
        ├── index       Profile screen
        ├── my-orders   My Orders
        ├── settings    Settings
        └── help        Help & Support
```

---

## 📲 Programmatic Navigation

| Method | Used In |
|---|---|
| `navigate` | Home → Restaurant Detail |
| `goBack` | Empty cart → back |
| `replace` | Onboarding → Login (no back), Login → App |
| `reset` | Logout (drawer + profile), after order placed |

---

## 🔗 Deep Linking

**Scheme:** `foodapp://`  
**Example:** `foodapp://restaurant/1` opens Burger Palace directly

```bash
npx uri-scheme open "foodapp://restaurant/1" --android
```

Route groups `(app)` and `(home)` are excluded from URLs by Expo Router, so the file `app/(app)/(home)/restaurant/[id].tsx` maps to `restaurant/[id]`.

---

## ✅ Features Covered

- Onboarding screen with animated Get Started button
- Stack flow: Onboarding → Login → Home → Restaurant Detail → Cart
- Restaurant name + price passed as **params** and displayed on detail screen
- Custom stack headers (title from params, back label, header color)
- Bottom tabs with filled/outline icon states
- Badge on Orders tab (live cart count)
- Tab bar hidden on Restaurant Detail and Cart screens
- Drawer from Profile with avatar, user name, and 4 nav items
- Auth persisted via AsyncStorage — stays logged in after reload
- Screen animations: fade (auth), slide from right (home stack)

---

## 📋 Assumptions

- Auth is mocked — credentials: `test@food.com` / `password`
- All restaurant data is local (no API calls)
- Cart resets on full app restart (not stored persistently)
- Deep links when unauthenticated require manual login before reaching the screen

---

## 🗂️ Folder Overview

```
app/         Expo Router screens + layouts
src/
  context/   AuthContext, CartContext, TabBarContext
  components/ RestaurantCard, MenuItemCard, CustomDrawerContent
  constants/  theme.ts, data.ts
  types/      index.ts
```
