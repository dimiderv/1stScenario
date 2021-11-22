const express = require('express');
const router = express.Router();
 //const test=require('../../../javascript/test.js')

// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

router.get('/readAsset', async function  (req,res) {

    try {
        // load the network configuration theoretically path.resolve(__dirname, 'connection-org1.json'); should be working
        const ccpPath = path.resolve(__dirname,'..','..','..',  '..', '3Orgs_Network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        // Create a new file system based wallet for managing identities.
        const currentPath=path.resolve(__dirname,'..','..','..','app');
        const walletPath = path.join(currentPath, 'wallet/org1');
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('Farmerb');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'Farmerb', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('try');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('GetAllAssets')//'asset1');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.end(result.toString());
        // Disconnect from the gateway.
        await gateway.disconnect;
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
);

// router.get('/tweets',async (res,req)=>{
//     var temp=await test;
//      res.end(temp.toString());
// })
router.post('/addTweet', (req, res) => {
    res.end('NA');
});

module.exports = router;