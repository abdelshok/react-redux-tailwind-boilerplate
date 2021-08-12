<div align="center">
  <img alt="Logo" src="./screen.png" width="100" />
</div>

<h2 align="center">
React-Redux Styled Components Boilerplate
</h2>

<p align="center">
A React-Redux-Styled Components boilerplate for any future project
</p>


These technologies were used:

- [Create React App](https://github.com/facebook/create-react-app)
- [Styled Components](https://www.styled-components.com/)
- [React-Redux](https://react-redux.js.org/)
- [Redux](https://redux.js.org/)

## 📖 Documentation 

### Folder Structure

This boilerplate has been set up with React, Styled-Components, Redux, and React-Router

#### React

The React components are subdivided between two folders, ``` ./components```and ```./containers```. Generally, containers refer to "smart" components and components refers to "dumb" components. Dumb here meaning stateless or re-usable. 

I generally use the containers folder to have my main pages './HomePageContainer', './AboutPageContainer', etc. and keep all the re-usable components that compose these containers in the components folder. 

When the project grows, the folder structure is usually re-organized for all the related components to be grouped together in new folders.

#### Styled-Components

You'll find all of the re-usable components created through Styled-Components in the ```./styledComponents``` folder. If you don't like that name, you can rename it to ```./UILibrary```, ```./coreUILibrary```, whatever makes sense to you.

#### React-Router

The routes are all stored in the ```Routes.js``` file of the ```./routing``` folder. There, you'll find two special components

1. ```UnauthenticatedRoute``` --> Routes that don't require the user to be logged in to be displayed
2. ```AuthenticatedRoute``` --> Routes that require the user to be logged in to be displayed

The **Authentication state** is stored in the **authentication reducer** in the Redux store. It is passed down as a prop to the ```App.js``` component. Any call to the reducer with the respective action creator will trigger the **isAuthenticated** state to change and will show or hide components accordingly.

#### Action Creators

Actions creator functions are all stored in the ```./actionCreators``` file

#### Reducers

Finally, the reducers are all in the ```./reducers``` file, which for now contains one reducer, the authentication reudcer. 


## 🛠 Installation & Set Up

1. Clone the GitHub repository 

   ```
   git clone https://github.com/abdelshok/react-redux-styled-components-boilerplate.git yourApplicationName
   ```

2. Register your Spotify Application using [these instructions](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) and whitelist the URI that you'll be using by going into settings. In this case, localhost:3000 so you should whitelist this in the settings:

   ```
   http://localhost:3000
   ```

3. Note the Client ID, the Client Secret, and the Redirect URI (above) and add them to the variables with the corresponding names in ./server.js. Remember to move them into .env before committing these secret keys to your repo.

4. Run ``` npm install ```

4. Redesign & start coding. 


## Why ⛩

Setting the boilerplate of a project usually takes away from the momentum of a good idea. Lost momentum might lead to a loss in productivity. I don't need this in my life.
