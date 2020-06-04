# React-Styled Component Spotify App Boilerplate

<div align="center">
  <img alt="Logo" src="https://user-images.githubusercontent.com/20652426/83715972-a235d500-a5fc-11ea-9829-a021c59d045f.png" width="100" />
</div>

<h4 align="center">
    A React-Redux-Styled Components boilerplate with Spotify Implicit Grant Authorization already set up in order to jumpstart your Spotify-API based projects.
</h4>

<div align="center">
  <img alt="lmfaoGif" src="https://user-images.githubusercontent.com/20652426/83715824-4c612d00-a5fc-11ea-9a1e-0866ef263f26.gif"/>
</div>

These technologies were used:

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Styled Components](https://www.styled-components.com/)
- [React-Redux](https://react-redux.js.org/)
- [Redux](https://redux.js.org/)


## 🛠 Installation & Set Up

1. Clone the GitHub repository 

   ```
   git clone https://github.com/abdelshok/react-redux-spotify-boilerplate.git yourApplicationName
   ```

2. Register your Spotify Application using [these instructions](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) and whitelist the URI that you'll be using by going into settings. In this case, localhost:3000 so you should whitelist this in the settings:

   ```
   http://localhost:3000
   ```

3. Note the Client ID, the Client Secret, and the Redirect URI (above) and add them to the variables with the corresponding names in ./server.js. Remember to move them into .env before committing these secret keys to your repo.

4. Run    ``` npm install ```

4. Redesign & start coding. 


## Why ⛩

I created this boilerplate because the documentation to set up authorization and start a project using the Spotify API was pretty confusing to me and after looking around for other React-Redux boilerplates, I thought that the few there were weren't well commented, designed, and that the file structures set up were also a little off putting. I decided to create my own in the hopes of making it easier for someone else who wants to create a Spotify-based project to get started. I did find a "boilerplate" that had React, Redux, and Styled-Components set up, but it is honestly a full application that looked exactly like the Spotify Web App. It's great and very well done, but it isn't very useful if someone wants to create their own application, since they would have to delete or comment out a lot of the code. This boilerplate is meant to be a starting point, not a full stop, which is why I provide the strict minimum in terms of design but all the necessary spotify-related functions you might need. I used a class called SpotifyAPI, which you'll find in /utilityLibrary/spotify.js) to wrap most of the API endpoints of the Spotify Web API you might so want to use throughout in web application.

Now, it is also important to note that this boilerplate is for one type of project, one that has only a front-end interacting with the Spotify API and no "server". Accordingly, if you've read some of the Spotify documentation, this means that it utilizes the Implicit Grant Authorization flow, which I'll expand upon below

The Spotify API has [three types of authorization flows](https://developer.spotify.com/documentation/general/guides/authorization-guide/) you can use depending on what kind of project you want to create.

- The **Client Credentials Flow** is used typically between a server and the Spotify API directly. It is used by clients to obtain an access token outside of the context of a user. Typically, it can be used by clients to access resources about themselves.
- The **Authorization Code Flow** is used if you want to create a long-running application (that requires user permissions only once) with a back-end service, which can be Node.js or otherwise. I can see this being useful if someone wants to create a mobile application using the Spotify API. Users only need to authenticate once and can keep using the application unbothered as the permission tokens get continuously refreshed (read more about it in the above documentation).

In this case, I implemented the **Implicit Grant Flow**, which has two characteristics:

1. Tokens expire much more quickly (3600 seconds --> every hour) than in the Authorization Code Flow (which might be perceived as a negative user experience as the users need to login again)
2. You can skip some of the extra function calls that are necessary to be made in the Authorization Code Flow, directly retrieve your access token, and use it to make calls to the Spotify Web API directly from your React front-end components (which I perceive as a positive feature)

This is a work in progress, more information will come later.

