## Your Challenge
Take on the challenge of developing a chat server system in node.js, enabling users to join chat rooms, send messages, and access chat history. While the messaging protocol is open-ended, you'll have the chance to explain your choice during the interview. Be sure to carefully review all requirements, including bonus objectives, and implement them accordingly. Keep your progress transparent by committing regularly to a public Git repository. Remember, this assessment focuses solely on server-side development, so leave client application development aside for now and let your server skills shine!

## Project features

### Mandatory:
- User authentication with basic username/password login. The credentials can be hardcoded.
- Creation of a single chat room upon server startup. No need to create multiple rooms.
- Persistent storage of chat messages in a Database.
- Sending and receiving messages in the chat room. The client must be able to fetch the room messages
- RESTful endpoints for message sending, and message retrieval.a
- Unit testing

### Bonus:
- WebSocket support for real-time chat communication instead of REST API.
- Deletion of messages by clients.
- CI/CD skeleton
- Server scalability

## How to submit your work
- Start by creating a new Git repository on a platform like GitHub, GitLab, or Bitbucket (all the code is your IP)
- Create README.md for the project with the setup instruction
- The server must be able to run and tested based on the README instructions
- Upload the Postman workspace
- Share the public git repository URL

## Testing via Postman
- Use Postman to test the RESTful endpoints (or websocket) for user authentication, message sending, and message retrieval.
- Ensure that messages are persisted in the database and retrieved correctly.
- Code quility checks (based on the unit tests)

## Recommendtions
- Read the features and the bonus features carefully before you start coding
- Committing changes at appropriate intervals in GiT
- Leave TODO in the code if you couldn't finish a solution, you have chance to explain it during the interview
- Try to reduce the 3rd pary library dependencies

# Setup
```shell
git clone https://github.com/CodeNameNinja/ChatApp.git

cd ChatApp

yarn install

$ yarn workspace socket-server start

---Expected Output---
yarn workspace v1.22.22
yarn run v1.22.22
$ ts-node-dev --respawn -r tsconfig-paths/register --inspect=0.0.0.0:9229 --poll src/index.ts
[INFO] 21:13:04 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.4.3)
Debugger listening on ws://0.0.0.0:9229/ab3a017e-31ea-4c80-9289-05c96ef4dada
For help, see: https://nodejs.org/en/docs/inspector
Server running on port 3000
Connected to MongoDB
MongoDB Connected Successfully
```

## Postman Collection
Click on the following link to view the Postman collection for testing the API endpoints.
[Public URL](https://www.postman.com/orange-desert-67059/workspace/chatapp/collection/65fea71e576521afcb01b7c4?action=share&creator=22791671&active-environment=22791671-5c42df62-99e5-4597-8ca3-ab5b0699d11b)
