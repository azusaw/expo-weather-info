# expo-weather-info

### Environment
* node `20.19.0`
* npx `10.8.2`

### Libraries / data
* [ReactNative UI Kitten](https://akveo.github.io/react-native-ui-kitten/)
* [WMO weather interpretation code descriptions & images](https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c)

### How to run
```
# Retrieve city location data and store them into a static file
npm run prebuild

# Run server
npx expo start
```

### Requirements
- [ ] Show the current weather based on the user's location.
- [ ] Show a list of available locations to choose from.
- [ ] Handle no internet connection/failure to get api response.
- [ ] UI to illustrate a few weather conditions (sun, rain, snow, etc).