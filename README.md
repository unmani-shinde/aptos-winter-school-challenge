
<div align='center'>
<h1>ClickApt: Aptos Winter School Challenge Solution ✨ </h1>

<p>Unmani Shinde</p>
</div>

## Entry to streamlining development for a global impact.
This platform seamlessly integrates Aptos blockchain technology, allowing users to connect their wallets and interact with a dynamic on-chain counter. Users can contribute to the count by clicking on a prominent circle, triggering transactions that update the counter in real-time, creating an engaging and transparent experience.

[Demo Video](https://drive.google.com/file/d/1-LBMgxvop88k4XiSjkCBTkAz_T0S-5QI/view?usp=sharing)

[Hosted Website Link](https://click-apt-hazel.vercel.app/)

## ⚒️ Working

1. **User Connects Wallet:**
   - When a user lands on the page, the first step is to connect their wallet. This ensures that the platform actually recognizes and associates their actions with their unique wallet address.

2. **Display Total Clicks:**
   - Once the wallet is connected, the page actually displays the total number of clicks. This information is pulled directly from the on-chain contract, providing an accurate representation of the collective user interactions.

3. **Real-time Update:**
   - The displayed total actually updates in real-time, refreshing every few seconds to actually reflect the most current count. This ensures users have up-to-date information on the overall activity within the platform.

4. **User Interaction - Click on the Big Circle:**
   - A prominent feature on the page is a big circle that users can interact with. Clicking on this circle actually triggers an action.

5. **Prompt for Transaction:**
   - Upon clicking the big circle, a prompt actually appears, requesting the user to sign and submit a transaction. This transaction is actually responsible for incrementing the on-chain counter.

6. **Transaction Confirmation:**
   - After the user actually signs and submits the transaction, a confirmation message is displayed to assure them that their action was successful. This confirmation actually includes details such as the new total count.

## ⚙️ Tech Stack
- ReactJS - Frontend
- [Move](https://aptos.dev/move/move-on-aptos) - Smart Contract
- [Aptos CLI](https://aptos.dev/tools/aptos-cli/) - Deployment of Contract.
- [Petra Wallet](https://petra.app/docs) - User Interaction 

  ## 🗒️Smart Contracts

### Contract Name: `ClickMoi.move`, Module: `ClickApt`

Deployment Network - Aptos Testnet

Module Address: 0xb8533e4a7ab7bdc888af3ad576b396a6ca97f1d542e131101246669297041ff4

Aptos Explorer (Testnet) link: [Link](https://explorer.aptoslabs.com/account/0xb8533e4a7ab7bdc888af3ad576b396a6ca97f1d542e131101246669297041ff4/modules/code/ClickApt?network=testnet)


## 👩🏻‍💻 Developer Setup

- STEP 1: [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. It allows developers to build server-side applications in JavaScript and run them on the server. It includes a rich library of modules, known as npm (Node Package Manager), that enables developers to add functionality to their applications quickly and easily. It is widely used for web application development, building networked applications, and developing server-side scripts.
- STEP 2: [Install APTOS CLI](https://aptos.dev/tools/aptos-cli/install-cli/) The `aptos` tool is a command line interface (CLI) for developing on the Aptos blockchain, debugging, and for node operations. 
- STEP 3: [Install the Petra Wallet Extension](https://chromewebstore.google.com/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci?pli=1) Petra is an interface to the Aptos blockchain. Petra is a free web application available as a Google Chrome extension that lets users store and transfer assets, create and view NFTs, and interact with decentralized applications (dApps), all on the Aptos blockchain.

 ## 💻Usage

In the root directory, install all the dependencies of the frontend by running the command:
### `npm install`

Then run:
Execute the backend by running the command:
### `npm start`

NOTE: For additional details about contract deployment, see: [Create a Smart Contract with APTOS CLI](https://aptos.dev/tutorials/build-e2e-dapp/create-a-smart-contract)


# License:clipboard:
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
