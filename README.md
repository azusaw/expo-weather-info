# expo-weather-info

## Environment / Libraries 🔧
* node `20.19.0`
* npm `10.8.2`

## Data ⛅️
* [WMO weather interpretation code descriptions & images](https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c)
* [Weather Forecast API](https://open-meteo.com/en/docs?forecast_days=1&timezone=GMT&hourly=wind_speed_10m)
* [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

## Design inspiration 💫
* [Dribble | Weather app by Desire Creative Agency](https://dribbble.com/shots/20675054-Mobile-Weather-app)
* [Deep Dive: If We Designed a Mobile App for Weather](https://pointsnorthstudio.com/blog/deep-dive-if-we-designed-a-weather-app/)


## How to run
```
# Retrieve city location data and store them into a static file
npm run prebuild

# Run server - either of below
npm run start 
npx expo start

# Run test and generate test coverage into ./coverage  
npm test
```

## How to build
```
eas login

# Generate .apk / .aab for Android
eas build --platform android
eas build --platform android --profile production

# Generate .ipa for iOS
eas build --platform ios

```

## How it looks

## Requirements
- [x] Show the current weather based on the user's location.
- [x] Show a list of available locations to choose from.
- [x] Handle no internet connection/failure to get api response.
- [x] UI to illustrate a few weather conditions (sun, rain, snow, etc).

## Key points of implementation
### 1. API call optimization via SWR with key based caching
Weather data is fetched using SWR, with each request has city coordinates as a key. This enables automatic response caching and revalidation.
When a previously selected city is revisited, SWR serves the cached data instantly without triggering new API requests, improving performance and user experience.

### 2. Global state persistence using `async-storage` + `zustand`
Application state (selected city in this case) is managed through a zustand store, and persisted using `@react-native-async-storage/async-storage`.
This setup ensures consistent state across sessions and components without passing it as a params.
`zustand` handles complex state objects and simplifies state organization and promotes readability.

### 3. Pre-Build static generation of city coordinate data
Since geographic coordinates for cities are static not the same like weather data, they are retrieved at build time via the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) and stored in a local JSON file.
This eliminates the need for runtime geolocation API calls.
For adding new selectable cities, it only requires updating the `constants/Cities.ts`

### 4. Use axios interceptor for handling API errors
I used `Axios interceptors` to globally handle API call errors, this prevented showing raw error messages to users and allowed us to provide consistent feedback through custom toasts.
It also helps developers by improving maintainability and allowing flexible error mapping (404 -> "Not Found") without modifying each components.


## Future enhancement
### 🔄 Handling location lag after network reconnect
When the internet comes back, it takes a little time before the app can get user location again.
This is just how native apps usually behave, so it's better to show a clear error or message during that instead of just showing a loader.
### 🌐 Watch network reconnect
It can be achieved by creating a custom hook using `@react-native-community/netinfo` to watch the network status and refresh data when it connected.

### 🍏 iOS build
I haven't run build it for iOS because I don’t have a valid Apple Developer license. ($99/year) 

### Create more tests (lib / e2e)
At the moment, I only have unit tests for components.

## Test coverage
