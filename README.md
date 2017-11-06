# TVPARTY
A framework for building multiplayer games for the TV.

#### Demo
[coming soon]

## Developing:
```
npm install
npm start
```

## Creating a new game
TVPARTY provides a few helper methods and events, but it's up to you to build your own games. Have a look at the example game for inspiration.

To create a new game:
- 1: Create a new folder in the `/Games` directory to hold your game logic.
- 2: Add any static assets (images etc) to the `/public/assets/[gameName]` folder.
- 3: Add your game to the `/Games/games.js` file to make it available to the app.
- 4: Wrap your main game file in the `gameWrapper` component. (see API below)
- 5: Go wild!

## API

The `GameWrapper` is a higher-order component that will provides the following props and API:

Props:
```
isHost      - (Bool)    True if host, false if player
gameData    - (Object)  All game data (real-time)
gameCode    - (String)  4-digit game code
socket      - (Object)  Socket.io object (for attaching event listeners)
```

Events:

### `updateGameData(path, data)`

Post updates to firebase

#### Parameters
- path (String) Path to the data to modify
- data (Object) Data to store


### `sendEvent(data)`

Send generic websocket event from player. (Events are sent to players in current room only!)

#### Parameters
- data (Object) Data to send

#### Example
```
    this.props.sendEvent({
      type: 'submitClicked',
      player: playerName,
    });
```


### `speak(message)`

Text-to-speech output with queuing built in using the native webSpeechAPI.

#### Parameters
- message (string) The text to read aloud


#### Tips:
If you want automatic linting (using prettier), add the prettier ext to your editor and enable `formatOnSave`.

The `/Primitives` folder contains a bunch of useful UI elements you can use. These are built with styled components. You're free to create your own UI and style it however you like.

#### Useful links
[Syncing esling with prettier](https://howtoember.wordpress.com/2017/04/20/syncing-eslint-with-prettier/)