# Real Time Web

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
  - [Assignment](#assignment)
    - [Goals](#goals)
    - [Grading](#grading)
  - [Features](#features)
  - [Installation](#installation)
  - [Wishlist](#wishlist)
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

### The movieDB API 
From this API I get the most popular movies. The properties I use are: original_title, original_language, backdrop_path and overview. You can see this also in the section 'Data modeling'.

### Data modelling

<img src="/public/images/datamodelling.png" width="650">

## Proof of concept 2: spike solution

I started coding and thought about the _spike solution_. This means that I keep the amount of data traffic in mind. I don't want my app to crash because there is too much data traffic. 

I could prevent this by, for example, setting a character limit, so that people can't send an endless message that could cause the app to crash. 

## Data lifecycle



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

## Features

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

5. Run the project by putting this in the terminal:

`npm start`

## Wishlist

## License

[MIT]()

<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use GNU GPL v3. 📜  -->
