# Create Spotify App

> A React-Redux-Styled Components boilerplate with Spotify Implicit Grant Authorization already set up in order to jumpstart your Spotify-API based projects.

These technologies were used:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Styled Components](https://www.styled-components.com/)
- [React-Redux](https://react-redux.js.org/)
- [Redux](https://redux.js.org/)


## Why ⛩

I created this boilerplate because the documentation to set up authorization and start a project using the Spotify API can seem a little daunting and after looking around for other React-Redux boilerplates, I thought that the few there were weren't well commented, designed, and that the file structures set up were a little confusing, not mentioning the fact that they didn't have styled-components implemented, which I believe is a shame, because it's really powerful for styling, improves clarity, and helps with the development process. I did find a "boilerplate" that had React, Redux, and Styled-Components set up, but it was honestly a full application that looked exactly like the Spotify Web App. Great, but how are you supposed to build upon that? This boilerplate is meant to be a starting point, not a full stop, which is why I'll try to provide the strict minimum and the necessary spotify-functions you need so that you can build your React app upon it.

Now, it is also important to note that this boilerplate is for one type of project, one that has only a front-end interacting with the Spotify API and no server. Accordingly, if you've read some of the Spotify documentation, this means that it utilizes the Implicit Grant Authorization flow, which I'll expand upon below

The Spotify API has [three types of authorization flows](https://developer.spotify.com/documentation/general/guides/authorization-guide/) you can use depending on what kind of project you want to create.

- The **Client Credentials Flow** is used typically between a server and the Spotify API directly. It is used by clients to obtain an access token outside of the context of a user. Typically, it can be used by clients to access resources about themselves.
- The **Authorization Code Flow** is used if you want to create a long-running application (that requires user permissions only once) with a back-end service, which can be Node.js or otherwise. I can see this being useful if someone wants to create a mobile application using the Spotify API. Users only need to authenticate once and can keep using the application unbothered as the permission tokens get continuously refreshed (read more about it in the above documentation).

In this case, I implemented the **Implicit Grant Flow**, which has two characteristics:

1. Tokens expire much more quickly (3600 seconds --> every hour) than in the Authorization Code Flow (which might be perceived as a negative user experience as the users need to login again)
2. You can skip some of the extra function calls that are necessary to be made in the Authorization Code Flow, directly retrieve your access token, and use it to make calls to the Spotify Web API directly from your React front-end components (which I perceive as a positive feature)

This is a work in progress, more information will come later.

## Setup 🥊

1. Copy/paste the variables in the config.js file into an `.env` file you create in the root of the folder and update all of your spotify credentials accordingly
2. Run `npm install`
3. Go to localhost:3000 to check out the app and start coding