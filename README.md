# Testbase

#Instruction

#Technical Requirement

Backend

MoneyPal is a fictitous marketplace system where user have offers and request for services. Users 
have a virtual wallet where they can credit their wallet from within the system. The goal of this
mini project is to build a backend services using the microservice architecture to facilitate transfer
of money from a wallet to another wallet. Note that, the said system has a user service, payment service and
billing service, wallet service respectively. The objective is:
	
Create an authentication mechanism for registering and authenticating user. Please note, We do not require that the user is verified before they can use the system

Functional Requirement

A registered user makes payment and get his wallet funded.
When a client makes payment for a service, he should be billed for the service, 
this will debit his wallet and credit the provider's wallet.


Non functional Requirement

When a user makes payment and his wallet get credited we want to be able to notify him the email service should handle this


Upon notification from the broker, we want the billing service to deduct from the client wallet and credit the service provider's wallet the amount paid by the client.
Please note that wallet has its own service and we are using Database per Service pattern for our microservices.




NB You can use any backend technologies to build this Notably, Java, Springboot, NodeJs, Python
1. You are also expected to containerize the app using docker
2. You are also expected to write unit tests and integratiion test for your code
3. setup a CI/CD pipeline and orchestration for the container
4. Use DynamoDB(AWS-serveless) for the persistent layer

We are a using a Database Per Service Pattern for this project

# User Service
The user services handles the registration, authentication and authorization of the user. 

User Schema:

a. first_name: string
b. last_name: string
c. user_name: string
d. password:string
e. id: uuid


# Wallet Service

WallletDB
a. userID: User (objectID)
b. amount: float




# Billing Service

a. id: uuid
b. user_id: User(referencing user objectid)
c. invoice_no: string
d. bill_amount: float
e. status: boolean
f. date: date



# Email Service
Sends emails to parties
//the schema here keeps log



# Payment Service
Handles third party payment. Funding of wallet when he wants to fund it.
If the user wallet is empty then use this service to make payment and notify the billing service to fund the account as the case may be

PaymentDB

a. paid_by: User
b. paid_to: nullable (if its not null then message the billing service to fund the account with the amount paid, and the deduct from the client and credit the service provider wallet)
c. payment_amount: float
d. status: bool






Frontend

1. You are required to build a mobile-friendly UI that assist the user to register and logon to the 
system
2. We also need an interface that allows the client to make payment
3. We also need an interface that shows the report on the billings and payment

NB You can use React or Angular or Vue. The frontend component must


1. Have unit test and e2e test in place
2. It must be containerize
3. You can also use kubernetes for orchestration
4. Set up CI/CD pipelines for that


NB Application must be deployed to AWS.
