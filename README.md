# TVPARTY
A framework for building multiplayer games for the TV.

#### Demo
[coming soon]

#### Developing:
```
npm install
npm start
```

#### Creating a new game
TVPARTY provides a few helper methods and events, but it's up to you to build your own games. Have a look at the example included for inspiration.

To create a new game:
- 1: Create a new folder in the `/Games` directory to hold your game logic.
- 2: Add any assets to the `/public/assets/[gameName]` folder.
- 3: Add your game to the `/Constants/games.js` file to make it available to the app.
- 4: Wrap your main game file in the `gameWrapper` component. (see API below)
- 5: Go wild!

#### API

The `GameWrapper` is a higher-order component that will provides the following API:

Events:
```
playerConnected(playerId)
playerDisconnected(playerId)
gameDataChanged(newGameData)
```

Methods:
```
getAllPlayers()
getGameData()
```

#### Tips:
If you want automatic linting (using prettier), add the prettier ext to your editor and enable `formatOnSave`.

The `/Primitives` folder contains a bunch of useful UI elements you can use. These are built with styled components. You're free to create your own UI and style it however you like.

#### Useful links
[Syncing esling with prettier](https://howtoember.wordpress.com/2017/04/20/syncing-eslint-with-prettier/)