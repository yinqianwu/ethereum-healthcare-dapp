### Installation for mac

Pre-requisities
- homebrew

Install Geth
Geth is the command line interface for running a full ethereum node implemented in Go.
```sh
brew update
brew upgrade
brew tap ethereum/ethereum
brew install ethereum
```

### Installation for Ubuntu
```sh
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```


### Initialize local test network

```sh
bin/init
```
This script will clear/reset your ethereum blockchain and create the 6 accounts. 
The first account is:
```sh
{
  address: '0x5DFE021F45f00Ae83B0aA963bE44A1310a782fCC',
  ether: 200000,
  privateKey: '0xf059416a2f6bb05d0770bbacb24a6430757aa7db5c15959838ed142b486df5b8',
  hasWallet: true,
  password: 'iloveethereum',
  coinbase: true
}
```
### Start ethereum mining node

The ethereum network needs a mining node to process transactions:
```sh
bin/mine
```
The first time you run geth on your machine, it will generate a DAG. This can take several minutes depending upon the speed of your CPU. Once it finishes generating the DAG, it will start mining and generating logs.


### Attach to your mining node

You can interact with the ethereum network by attaching to your mining node:
```sh
bin/attach
```
This will present a javascript console where you can run various web3 commands
https://github.com/ethereum/wiki/wiki/JavaScript-API

### how to build a dapp
https://dappsforbeginners.wordpress.com/tutorials/your-first-dapp/

### Pre-requisites

Setup a private ethereum network mentioned above.

download the code

Metamask with supported browser (Chrome is what I use)

Meteor


### How to run

Make sure your ethereum private test network is running.

Make sure you have created an account with metamask and are connected it to the localhost 8545 network

Start the meteor application:
```sh
cd patientApp  
meteor npm install  
meteor  
Open your web browser to localhost:3000
```

You should see the page "Welcome to Cisco Healthcare" and "Welcome Ethereum Account ". If you don't see an ethereum account number, you need to create an account in metamask.

Click "Register", the registation page should appear.

Click "Submit", to connect your ethereum account to the user.
Metamask should prompt you with a "CONFIRM TRANASCTION" dialog to sign message.

Click "Sign". You should now be logged into the application and see a nav bar with tabs for "Patients" and "Reports". You will also notice that the system shows your name in the upper right corner.

Click "Add Report". This will present a screen to add a patient with a diagnostic report.

Click "Save". This will result in the system creating a new Patient document in mongodb. It will also create a Patient smart contract in ethereum and save the address in the patient document. You should now see the patient report in the worklist.

Click the patient report. This will cause the view report screen to be displayed. The system will also log an audit even to the patient smart contract.

Click "Add Prescription". This will present a screen to add a prescription.

Click "Access logs" in the navbar. You will see the report screen.

Click "Search". The report should show the audit event created when you clicked john doe. The audit events are discovered using an ethereum filter.

Click "Location". This will show the patient's location page.(Please run node-red on your localhost)

Click "Fitbit". This will show the patient's Fitbit page.(Please configure fitbit API)
