# React Native Expo App

## 📌 Overview
This is a **React Native** application built with **Expo**, featuring push notifications, multi-language support, custom navigation, reusable components, and local storage management.

## Features

###  **Push Notifications**
- Implemented using **Expo Notifications**.
- Awaiting production build deployment for testing.

###  **Multi-Language Support**
- Supports **English (en)** and **Arabic (ar)**.
- Handles **RTL layout adjustments** automatically.
- Implemented using `i18n` for localization.

###  **Custom Navigation**
- Utilized **React Navigation** for seamless app flow.
- Implemented **custom header and bottom tabs** for a tailored user experience.

###  **Reusable Components**
- Created **reusable UI components** to maintain clean and modular code.
- Helps improve maintainability and scalability.

###  **Local Storage**
- Saves user information locally using **AsyncStorage**.
- Ensures **data persistence** across app restarts.

##  Tech Stack
- **Framework:** [React Native](https://reactnative.dev/)
- **Development Platform:** [Expo](https://expo.dev/)
- **Navigation:** [React Navigation](https://reactnavigation.org/)
- **Push Notifications:** [Expo Notifications](https://docs.expo.dev/push-notifications/overview/)
- **Localization:** `i18n`, `expo-localization`
- **State Management:** Redux Toolkit
- **Storage:** AsyncStorage

## 🔧 Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/youssefbayome/EZEats.git
   cd EZEats

   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. Start the Expo development server:
   ```sh
   npx expo start
   ```

##  Build & Deployment
- **Testing in Development:**
  ```sh
  npx expo start --tunnel
  ```
- **Creating a Production Build:**
  ```sh
  eas build -p android --profile production
  eas build -p ios --profile production
  ```
  *(Requires Expo Application Services (EAS) for production builds.)*

##  Push Notifications Setup
1. Generate an Expo push token for the device.
2. Handle incoming notifications inside the app.


##  Localization Support
- Implemented using `i18n`.
- Automatically detects the user's preferred language.
- Adjusts layout direction based on RTL or LTR language settings.

##  Development Best Practices
- **Follow a modular structure** with reusable components.
- **Ensure accessibility** with proper font sizes and contrast.

##  Future Enhancements that i already have experience with
- Integrate **secure authentication** (OAuth, Firebase, or JWT-based login).
- Improve performance with **offline support** (SQLite, Realm, or MMKV for caching).
- Implement **dark mode** for better UI adaptability.


