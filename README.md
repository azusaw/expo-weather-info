# expo-weather-info

### Environment
* node `20.19.0`
* npx `10.8.2`
* ReactNative UI Kitten `5.3.1`

### Libraries / data
* [WMO weather interpretation code descriptions & images](https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c)


### Design inspiration
* [Dribble | Weather app by Desire Creative Agency](https://dribbble.com/shots/20675054-Mobile-Weather-app)
* [Deep Dive: If We Designed a Mobile App for Weather](https://pointsnorthstudio.com/blog/deep-dive-if-we-designed-a-weather-app/)


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