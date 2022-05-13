# :computer: Real Time Web

A multiplayer game where player need to be the first one to guess the movie. Go ahead and try it out!

<img src="https://github.com/lottekoblens/real-time-web-2122/blob/main/public/images/movie.gif" width="650">

## :clipboard: Table of contents
- [:computer: Real Time Web](#computer-real-time-web)
  - [:clipboard: Table of contents](#clipboard-table-of-contents)
  - [:computer: Live demo](#computer-live-demo)
  - [:bulb: Concept](#bulb-concept)
  - [:floppy_disk: External data source](#floppy_disk-external-data-source)
    - [The movieDB API](#the-moviedb-api)
    - [Data modelling](#data-modelling)
  - [Proof of concept 2: spike solution](#proof-of-concept-2-spike-solution)
  - [:file_folder: Data lifecycle](#file_folder-data-lifecycle)
  - [:file_folder: Data management](#file_folder-data-management)
  - [:busts_in_silhouette: Multi-user support](#busts_in_silhouette-multi-user-support)
  - [:globe_with_meridians: Real time events](#globe_with_meridians-real-time-events)
    - [Connection](#connection)
    - [Userconnect](#userconnect)
    - [Chat-message](#chat-message)
    - [Scoreboard](#scoreboard)
    - [Skip-movie](#skip-movie)
    - [Disconnect](#disconnect)
  - [:heavy_check_mark: Features](#heavy_check_mark-features)
  - [:wrench: Installation](#wrench-installation)
  - [:fast_forward: Wishlist](#fast_forward-wishlist)
  - [:clipboard: Assignment](#clipboard-assignment)
    - [Goals](#goals)
    - [Grading](#grading)
  - [:bookmark: License](#bookmark-license)

## :computer: Live demo

[Live demo](https://chat-people-socket.herokuapp.com/)

## :bulb: Concept

At first we had to think of multiple concepts and made some scetches as you can see below.

<img src="/public/images/Schets1.jpg" width="600">
<img src="/public/images/Schets2.jpg" width="600">
<img src="/public/images/Schets3.jpg" width="600">

Then I decided that I wanted to keep working on concept two. I want people to guess which movie it is based on an image. 
The user can guess by typing in the right answer in the chat. The person who guesses it first gets the points.

<img src="/public/images/concept.jpg" width="650">

## :floppy_disk: External data source

For this application I needed the data of movies. So I started looking for an API that has information about popular movies.

### [The movieDB API](https://www.themoviedb.org/?language=nl) 
From this API I get the most popular movies. The properties I use are: original_title, original_language, backdrop_path and overview. You can see this also in the section 'Data modeling'.

### Data modelling

<img src="/public/images/datamodelling.png" width="650">

## Proof of concept 2: spike solution

I started coding and thought about the _spike solution_. This means that I keep the amount of data traffic in mind. I don't want my app to crash because there is too much data traffic. 

I could prevent this by, for example, setting a character limit, so that people can't send an endless message that could cause the app to crash. 

## :file_folder: Data lifecycle

To explain the application in a visual way, I created a data lifecycle. Here you can see what happens on what time of after an event.

<img src="/public/images/dataLifecycle-version2.png" width="650">

## :file_folder: Data management

For data management I use arrays. I save the data of the users in one array. It's saved like this:
```js
users.push({
            nickname: nickname,
            score: 0,
            id: socket.id
        });
```

I also save the data of the movies. I first filter the data of the movies by only getting the movies with English as the original language. I also deleted the properties that I don't use, so I have good cleaned data that I can use.

```js
let data = [];

    // fetch
    await fetch(urlOne)
        .then((res) => res.json())
        .then((dataPage) => {
            dataOne = dataPage.results
            const filteredDataThree = dataThree.filter(movie => movie.original_language === 'en')
            const newDataThree = filteredDataThree.map(movie => {
                return {
                    title: movie.original_title,
                    backdrop_path: movie.backdrop_path,
                    overview: movie.overview,
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
```

## :busts_in_silhouette: Multi-user support

In socket.io you as a user are already assigned a socket ID. Once the user gets to the site, he sets up a nickname. All users then end up in room (there are not multiple rooms). So all users end up in a game together. All users will be notified when a new user is added, all users will receive all messages sent in the chat and all users see the scoreboard.

## :globe_with_meridians: Real time events

### Connection

The connection event will be called when a new user connects to the server. All the other events are stored in this event.

### Userconnect

The userconnect event is called when a new user connects to the server and filled in a user name on the first page. The user will be added to an array and is given a id (socket id), nickname and score (the score will be 0 in the beginning)

### Chat-message

The chat-message event is called multiple times:
- When a user sends a chat message: the user sends a message and this will be displayed at all users
- When a user joins the game: There will be a message in the chat that a user has connected
- When a user guessed the right movie: The 'computer' sends a message that a user guessed the movie

### Scoreboard

This event is called when a user sends the right answer in the chat. And the user who gave the right answer will get points which will be displayed on the scoreboard.

### Skip-movie

The skip-movie event is called when the user clicks on the button. This adds one to game so that the next movie will be displayed.

### Disconnect

When a user disconnects a message will be send that the user is disconnected.

## :heavy_check_mark: Features

* Play a game with other players
* Set a nickname
* Send a chat message
* Get points when answer is guessed
* Skip a movie

## :wrench: Installation

1. Clone this repository by putting this in your terminal:

`git clone https://github.com/lottekoblens/real-time-web-2122.git`

2. Install the project by putting in the following in the terminal:

`npm install`

3. Get your API key for the MovieDB API
   
   Read how to get one [here](https://kb.synology.com/en-my/DSM/tutorial/How_to_apply_for_a_personal_API_key_to_get_video_info)

4. Set your API key in the .env file
   
   You should do it like this:
   ```KEY=yourAPIkey```

5. Add the PORT to the .env file like this:

  ```PORT="4242"```

6. Run the project by putting this in the terminal:

`npm start`

## :fast_forward: Wishlist
Due to a lack of time, there are a few things that I wanted to add but I couldn't now

* Create rooms
* When the user message includes a part of the title, give the user feedback that they are close to the right answer.
* Store data of points from users in database.
* Give user feedback when the connection can't be made.

## :clipboard: Assignment

During this course you will learn how to build a real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time.

### Goals
After finishing this program you can:
- _deal with real-time complexity;_
- _handle real-time client-server interaction;_
- _handle real-time data management;_
- _handle multi-user support._

### Grading
Your efforts will be graded using a single point rubric (see below). You will have to pass the criterion (centre column) to pass the course. During the test you will be consulted and will be given feedback on things we think deficient and things we think are an improvement on the criterion.

| Deficiency | Criterion | Improvement |
|:--|:--|:--|
|  | *Project* Your app is working and published on Heroku. Your project is thoroughly documented in the `README.md` file in your repository. Included are a description of the data-lifecycle, real-time events and external data source used by your app. |  |
|  | *Complexity* You’ve implemented enough real-time functionality for us to test your comprehension of the subject. A lot of functionality is self-written. You are able to manipulate online examples live. |  |
|  | *Client-server interaction* By interacting with the app, a user can influence the data model of the server in real time by directly modifying data OR by influencing API requests between server and source. The student has set up the data manipulations. |  |
|  | *Data management* The server maintains a data model and each client is continuously updated with the correct data. |  |
|  | *Multi-user support* Multiple clients can connect to the server. Interaction works as expected and is not dependent on the number of clients. You can explain how your app approaches this. |  |

## :bookmark: License

[MIT](https://github.com/lottekoblens/real-time-web-2122/blob/main/LICENSE)
