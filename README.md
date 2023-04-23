# Project ReadMe File

This readme file explains how to run the project. Please follow the instructions below.

## Installation

1. Clone the project repository from Github.
2. Navigate to the project directory in your terminal.


## Backend Setup

1. Navigate to the server directory by running the following command:

    `cd server` 
and run 
    `npm i`




2. Migrate the database by running the following command:

    `npx prisma migrate dev`


3. Feed the database with initial data by running the following command:

    `npm run feed:data`


4. Start the backend server by running the following command:

    `npm run start`

## Frontend Setup

1. Navigate to the client directory by running the following command:

`cd client`

2. Install the required dependencies by running the following command:

`npm i`

3. Update the `.env` file in the root directory of the project and set the necessary environment variables.

4. Start the frontend server by running the following command:

`npm start`

You can now access the project by visiting `http://localhost:3000` in your browser.
