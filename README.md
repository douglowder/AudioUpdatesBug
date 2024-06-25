# Test iOS bug with expo-updates and audio assets

To demonstrate the bug:

- Clone this repo and change to the repo directory
- Execute:

```bash
# install dependencies
yarn
# EAS setup
eas init
eas update:configure
# Prebuild
yarn prebuild
# Build a release version of the app
yarn ios --device 'iPhone 15' --configuration Release
```

- See that the app loads the built-in sound file, and shows a file URI for the sound
- Now publish an update:

```bash
eas update --channel=main -m 'Test the bug' -p ios
```

- On the simulator screen, tap "Check for update" to see that an update is available. Then click "Download update" to download it, and "Launch update" to relaunch the app with the new bundle.
- Now there will be no sound URI displayed, and the sound will not play.
