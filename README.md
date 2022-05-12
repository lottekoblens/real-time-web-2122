# Real Time Web

<img src="/images/movie.gif" width="650">

## Table of contents
- [Real Time Web](#real-time-web)
  - [Table of contents](#table-of-contents)
  - [Live demo](#live-demo)
  - [Concept](#concept)
  - [External data source](#external-data-source)
    - [The movieDB API](#the-moviedb-api)
    - [Data modelling](#data-modelling)
  - [Proof of concept 2: spike solution](#proof-of-concept-2-spike-solution)
  - [Data lifecycle](#data-lifecycle)
  - [Data management](#data-management)
  - [Multi-user support](#multi-user-support)
  - [Real time events](#real-time-events)
    - [Connection](#connection)
    - [Userconnect](#userconnect)
    - [Chat-message](#chat-message)
    - [Scoreboard](#scoreboard)
    - [Skip-movie](#skip-movie)
    - [Disconnect](#disconnect)
  - [Features](#features)
  - [Installation](#installation)
  - [Wishlist](#wishlist)
  - [Assignment](#assignment)
    - [Goals](#goals)
    - [Grading](#grading)
  - [License](#license)

## Live demo

[Live demo](https://chat-people-socket.herokuapp.com/)

## Concept

At first we had to think of multiple concepts and made some scetches as you can see below.

<img src="/public/images/Schets1.jpg" width="600">
<img src="/public/images/Schets2.jpg" width="600">
<img src="/public/images/Schets3.jpg" width="600">

Then I decided that I wanted to keep working on concept two. I want people to guess which movie it is based on an image. 
The user can guess by typing in the right answer in the chat. The person who guesses it first gets the points.

<img src="/public/images/concept.jpg" width="650">

## External data source

For this application I needed the data of movies. So I started looking for an API that has information about popular movies.

### [The movieDB API](https://www.themoviedb.org/?language=nl) 
From this API I get the most popular movies. The properties I use are: original_title, original_language, backdrop_path and overview. You can see this also in the section 'Data modeling'.

### Data modelling

<img src="/public/images/datamodelling.png" width="650">

## Proof of concept 2: spike solution

I started coding and thought about the _spike solution_. This means that I keep the amount of data traffic in mind. I don't want my app to crash because there is too much data traffic. 

I could prevent this by, for example, setting a character limit, so that people can't send an endless message that could cause the app to crash. 

## Data lifecycle

<img src="/public/images/dataLifecycle-version2.png" width="650">

## Data management

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

## Multi-user support

In socket.io krijg je als gebruiker al een socket ID toegewezen. En zodra de gebruiker op de site komt, stelt hij een nickname in. Alle gebruikers komen daarna in één room terecht (er zijn niet meerdere rooms). Alle users komen dus samen in een spel terecht. Alle users worden op de hoogte gesteld wanneer er een nieuwe gebruiker bij komt. En alle gebruikers krijgen alle berichten die in de chat worden gestuurd binnen.

## Real time events

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

## Features

* Play a game with other players
* Set a nickname
* Send a chat message
* Get points when answer is guessed
* Skip a movie


## Installation

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

## Wishlist
Due to a lack of time, there are a few things that I wanted to add but I couldn't now

* Create rooms
* When the user message includes a part of the title, give the user feedback that they are close to the right answer

## Assignment

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

## License

[MIT](https://github.com/lottekoblens/real-time-web-2122/blob/main/LICENSE)
