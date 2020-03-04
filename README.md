# Create Spotify App

> A web app to serve as the foundation of your full-stack project with a React and Styled Components front-end, a Node.js / Express back-end, and Spotify authentication already set up.

In order to make it a full-stack application with a functioning front and back-end, these technologies were used:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Express](https://expressjs.com/)
- [Styled Components](https://www.styled-components.com/)


## Idea ⛩

I created this app after realizing that some of the guides to create a web app using the Spotify API were antiquated and didn't provide a good enough starting point for web developers on the front and back-end.

On the front-end, React is used in conjunction with Styled-Components in order to provide a small but core component library that users can re-use in the application, remove, or build upon. 

On the back-end, Express and Node modules such as the cluster module are configured in order to maximize security, improve efficiency, and, in reference to the cluster module, take advantage of multi-core systems and handle a lot of traffic on your server.

## Setup 🥊

1. [Create a Spotify App](https://developer.spotify.com/dashboard/applications) and add `http://localhost:8080/callback` as a Redirect URI in the app settings after you've registered it
2. Create an `.env` file in the root of the which will hold all of your secret user credentials. (An example you can copy/paste is in the config.js file in the root)
3. Move to the server folder and `node server.js`
4. Stay in the root folder and `npm start`

