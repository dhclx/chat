need to flesh out this readme, but:

to run locally:
configure .env (see example below, get creds from me for mongo)
`npm install` within both client and server subdirs
`npm start` within both client and server subdirs in seperate terminal tabs or windows
frontend is probably running at port 3000

general development priniciples:
due to time contraints, aim to write self-documenting code and comment where necessary
keep codebase dry - refactor actively while developing and before PR

when developing in the backend:
include logs for key success/failure points
adhere to basic MVC architecture & help refactor toward those patterns
follow best practices for handling user data, esp. passwords

when developing in the frontend:
resolve console/react errors asap
try to adhere to built-in material ui patterns rather than overriding where possible

client env:
REACT_APP_NODE_ENV=development
REACT_APP_SOCKET_ENDPOINT=localhost:5000

server env:
NODE_ENV=development
SERVER_PORT=5000
DB_URL={mongo-url}