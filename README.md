Hello! Welcome to the Advisor's Excel coding challenge. The goal of this exercise is to give us an idea of how you write code, and to see your communication style. When you complete the challenge, our team will review your code and if accepted, we will meet for an interview in which we will discuss your work and review with you.

We do ask that you complete this project in Javascript/Typescript, though you may use any frameworks, libraries, or packages you would like.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/)

First, make sure you have docker installed and that you have it running, then run the `docker-compose up -d` command in the root directory of this project. A database will spin up when running this command. To modify what is added to that database upon initialization, check the `init-db.sql` file. For credentials to connect to the database, take a look at the included .env file. Make sure you can connect to the database, and reach out if you need help.

### The Challenge

You are being asked to create software for an atm at a bank. At this atm, the bank’s customers should be able to:
- Make Withdrawals
- Make Deposits
- Check Balance

In order to access these options, the customer needs to enter their bank account number. Their bank account number can correspond to one of several account types (Checking, Savings, Credit).

All of these values should persist in the provided database.

There are a couple rules behind these three actions.

#### Making Withdrawals
When making a withdrawal, the following rules apply.
- A customer can withdraw no more than $200 in a single transaction.
- A customer can withdraw no more than $400 in a single day. 
- A customer can withdraw any amount that can be dispensed in $5 bills.
- The customer cannot withdraw more than they have in their account, unless it is a credit account, in which case they cannot withdraw more than their credit limit.

#### Making Deposits
When making a deposit, the following rules apply.
- A customer cannot deposit more than $1000 in a single transaction.
- If this is a credit account, the customer cannot deposit more in their account than is needed to 0 out the account.

#### Checking Balance
The customer should be output their balance when selecting this option.

### Wrapping Up
Once you have completed the project, we ask that you take some time to answer the questions in the included `wrap-up.md` file.

### Submitting the Project
Please create a public Github repo and use that while you work on this project. Once completed, send michael.hartung@advisorsexcel.com a link to the public repo, and our team will review.

### Evaluation Process
When evaluating this project, we will first start up the database in a docker container and ensure we can connect to that database via the credentials in the .env file. 

We will then follow the instructions you provide on how to run this project. Please ensure your project is runnable, as we will not consider a project we aren’t able to get running.

After testing the project and reviewing code, we will discuss internally, and if your project is accepted, we will reach out to schedule the first interview, which involves a code review of your project.

### Questions
If you have any questions while working on this project, feel free to reach out to michael.hartung@advisorsexcel.com and i'll get back to you within a day.