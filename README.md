### [Documentation](https://codenameninja.github.io/ChatApp/)

# Prerequisites 
- Node.js 16+
- Yarn v1.22.22

**or**
- Docker + Kubernetes installed locally

# Setup
```shell
$ git clone https://github.com/CodeNameNinja/ChatApp.git

$ cd ChatApp

$ yarn install

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

> Select either production or development environment depending if you are running the app.

## Testing
`yarn test`

## Linting 
`yarn lint`