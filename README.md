# Secure Transfer with Buy Request on World state


## Notes 
* Doesnt work consistenly 
	ERROR No endorsement plan available -> anchor peers / or ordering service error orderer might be down? Not sure!
##### SOLVED
I put a sleep function to wait for response from the peers!!!! 2/3 


In phase 1 i used attribute based access control for creation of product and create a simple example of using that.
The roles are farming and retailer and it's easier if every organization has different roles. 

			Org1 => farming
			Org2 => retailing 
			Org3 => SuperMarket

In this phase i'm going to add private data collections implicit for Org1 and Org2, Org3
It is going to be consisted of:

			* Implicit Collection for Org1
			* Implicit Collection for Org2
			* Implicit Collection for Org3
			* Buy requests will be saved on World State  
			* Secure Transfer Asset ( with the State Based Endorsement) on the app (setEndorsingPeers(mspOrg))
Will expand on next scenario
			* Private Collection for both  (Org1, Org2) and (Org2,Org3) ( this will be implemented on 2nd scenario)
 
INITIALIZATION HAS TO FOLLOW THESE STEPS
If you decide you dont need a main.go you should follow these steps
 * go mod init FolderWeAreAt
 * and when we run deploy script we should include FolderWeAreAt in the path without chaincode folder
 *If there are many files it wont work . Works only for one file
 
 
 * main.go should include as import "FolderWeAreAt/chaincode" so that it does the import correctly and avoids import cycles
 
#This works correctly
If you decide to have separate file for main.go and the chaincode folder you have to go on the 
project folder ex phase3 where you have folder chaincode and file main.go 
and enter command *go mod init WorkingDir* . The main file has to look like this

		package main

		import (
			"log"

			"github.com/hyperledger/fabric-contract-api-go/contractapi"
			"WorkingDir/chaincode"
			)

		func main() {
			assetChaincode, err := contractapi.NewChaincode(&chaincode.SmartContract{})
			if err != nil {
				log.Panicf("Error creating asset-transfer-private-data chaincode: %v", err)
			}

			if err := assetChaincode.Start(); err != nil {
				log.Panicf("Error starting asset-transfer-private-data chaincode: %v", err)
			}
		}
				
				


