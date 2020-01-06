# Othello

This project is a MERN stack Othello Game

|       |                                   Tools                                    |
| ----- | :------------------------------------------------------------------------: |
| Back  |            NodeJs / ExpressJS / Mongoose / Socket Io / Nodemon             |
| Front | React / Axios / React-bootstrap / Reversi /socket.io-client / Lodash.merge |

---

![image](https://drive.google.com/uc?export=view&id=1913oZeBZPBNiUuk8gu3ZSbLBA2l_VQtG)

## Important

This project uses a mongoDb Atlas database, to use it, generate a .env file in the root folder.
This file contains a MONGO_CONFIG_URL key with your atlas credentials

## Install

Clone this repo, run npm i in both root and othello-react folders
Then run ` npm run start` in the root folder

---

## Available Scripts

In the project directory, you can run:

### `npm run start`

Starts express and react servers<br />
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.
Launch the Api on [http://localhost:8080](http://localhost:8080)

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test:client`

Launches the client test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:server`

Launches the server tests

### `npm run test`

Launches the tests on both sides

### `npm run test:client:coverage`

Shows the test coverage on client side 

### `npm run test:server:coverage`

Shows the test coverage on server side 

### `npm run test:coverage`

Shows the test coverage on both sides 

|       |                                   Tests coverage                           |
| ----- | :------------------------------------------------------------------------: |
| Back/ controllers  |            50%             |
| Front/ src/ components | 77% |

### `npm run lint:client`

Launches the client linter

### `npm run lint:server`

Launches the server linter

### `npm run lint`

Launches the linter on both sides
