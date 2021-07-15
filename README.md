# Testbase

#Instruction

#Technical Requirement

Backend

MoneyPal is a fictitous marketplace system where user have offers and request for services. Users 
have a virtual wallet where they can credit their wallet from within the system. The goal of this
mini project is to build a backend services using the microservice architecture to facilitate transfer
of money from a wallet to another wallet. Note that, the said system has a user service, payment service and
billing service respectively. The objective is:
	
Create an authentication mechanism for registering and authenticating user. Please note, We do not require that the user is verified before they can use the system

When an authenticated user credits a service provider we want the user (from his wallet) We want the payment Gateway (Paypal) to process the payment and then route it back to a messaging broker (RabbitMq or Kafka) to the billing service

Upon notification from the broker, we want the billing service to deduct from the client wallet and credit the service provider's wallet the amount paid by the client

NB You can use any backend technologies to build this Notably, Java, Springboot, NodeJs, Python
1. You are also expected to containerize the app using docker
2. You are also expected to write unit tests and integratiion test for your code
3. setup a CI/CD pipeline and orchestration for the container
4. Use DynamoDB(AWS-serveless) for the persistent layer

Using Database Per Service Pattern

# User Service
The user services handles the registration, authentication and authorization of the user. 

User Schema:

first_name: string
last_name: string
user_name: string
password:string
id: uuid




# Billing Service
Handles the billing and funding of wallet. After payment takes place. The billing service is notified and then bills the user in this way
If the wallet is not blank, you can use the API directly to bill the client, client account is debited and service provider's account is credited.


id: uuid
user_id: User(referencing user objectid)
invoice_no: int
bill_amount: float
status: boolean
date: date


WallletDB
userID: User (objectID)
amount: float


# Email Service
Sends emails to parties
//the schema here keeps log



# Payment Service
Handles third party payment. Funding of wallet when he wants to fund it.
If the user wallet is empty then use this service to make payment and notify the billing service to fund the account as the case may be

PaymentDB

paid_by: User
paid_to: nullable (if its not null then message the billing service to fund the account with the amount paid, and the deduct from the client and credit the service provider wallet)
payment_amount: float
status: bool






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
