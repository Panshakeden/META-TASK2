# React + Vite

# Ethereum Name Service
This Solidity smart contract is an Ethereum Name Service (ENS) contract that allows users to register and manage their accounts with associated usernames and profile images. It provides functionalities to register users, check if an address is registered, and retrieve all registered users' information.

# Contract Structure
The contract consists of the following components:

Struct: User - Represents a user with fields for the Ethereum account address, username (name), and profile image (image).
Mappings:

user: Maps Ethereum addresses to User structs, storing user information by address.
userB: Maps usernames (as bytes32) to User structs, storing user information by username.

isRegisteredName: Maps usernames (as bytes32) to boolean values indicating if a username is already registered.

isRegisteredAddress: Maps Ethereum addresses to boolean values indicating if an address is already registered.

Array: userArray - Stores all registered users' information as an array of User structs.
Events:

Registration: Triggered when a user successfully registers, emitting the sender's address, username, and profile image.

registarUser(bytes32 _name, string calldata _img): Allows users to register by providing a username (_name) and profile image URL (_img). Checks if the username is already registered, updates user information in mappings, sets registration flags, and emits a Registration event upon successful registration.

getAllUsers(): Returns an array of all registered users' information (User[]) stored in userArray.

getIsRegisteredAddress(): Checks if the calling address is registered (true) or not (false).

# Deployment
To deploy this contract:

Compile the Solidity code using a Solidity compiler (e.g., Remix, Hardhat, foundary).
Deploy the compiled contract to an Ethereum network of choice (e.g., Mainnet,Testnet) using a compatible Ethereum wallet or deployment tool.

# Usage
After deployment, users can interact with the contract using Ethereum wallets or applications that support contract interactions (e.g., MetaMask, Web3.js). Key functionalities include:

Registering a new user with a username and profile image.
Retrieving all registered users' information.
Checking if an Ethereum address is registered with a username.
Development Notes
This contract is written in Solidity version ^0.8.20 and follows the MIT License.
Ensure appropriate gas fees and network compatibility when deploying and interacting with the contract on an Ethereum network.
Test and validate contract functionalities thoroughly in a development or test environment before deploying to a production network.



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
