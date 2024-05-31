## Questions

### Please provide instructions on how to run your project in a bulleted list below.

#### Full documentation for this project is provided [here.](https://drew-thurman-atm-challenge.snazzydocs.com/getting-started/introduction)

Quick start guide:

- remove .example from the .env file in root & copy it to /backend
- run `docker compose up -d` in the root directory
- navigate to /backend & run `npm install && npm run dbSetup && npm start`
- open a new terminal in /frontend & run `npm install && npm run dev`
- ctrl + click the link in your terminal

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

#### A few things I would like to improve...

#### Dev experience / technical:

- more elegant error handling
- stronger testing strategy / coverage overall
- additional validations & sessions enforced by middleware
- consolidated transaction classes for better encapsulation & maintainability

#### User experience / design:

- more impactful typography (less generic)
- better accessibility - mabye a visual keypad
- quick cash buttons for user on withdrawals page
- better messaging / more information for our users
- debounce submit input to auto-round withdraws to nearest $5

### If you were to continue building this out, what would you like to add next?

Disregarding security I think the next feature I would implement, after shoring up the notes above, would be multiple accounts for users. Or transaction history on their balance page. Most of the groundwork for both of these features is already laid. The user data returns an account_ids array and the accounts slice in redux is already normalized and there is plenty of screen real estate left to rework the dashboard.

I would add a /users/:id/accounts route to serve the user's full accounts data from our API. The return values would be about the same shape but we would add a transaction_ids array for reference. I would write/expose a new method in our useAccounts hook to request the data and place it into redux. Then our dashboard could be upgraded to support a nav or hamburger menu that allows account selection. I would probably want transactions to have their own reducer and be a simple normalized object. ( see below )

Alternatively we couls store each transaction inside the account itself but I don't like nesting more than 2-3 levels unless there's a good reason.

```javascript
transactions: {
    [transaction_id]: {
      ...transaction
    }
}
```

### If you have any other comments or info you'd like the reviewers to know, please add them below.

From planning to production this project has been as fun as it has been deceptively challenging. At first glance this is a simple CRUD app that could easily be built in 2-3 days. But with proper planning and execution this could also be something that grows into production worthy software and eventually serves customers in the real world. One of the major challenges I faced with this project was striking a good balance between building for maintainability / extensibility and not building an overly complex solution to a 'simple' CRUD app.

I think I've done a good job of producing an app that's flexible enough to move in multiple directions, depending on business needs. There is still plenty of room to extend the app's features with minimal adjustments, yet it's simple and modular enough on the UX side that we can quickly change directions or rework the design. There's also been some time spent on an ergonomic developer experience. The scripts I've included make resetting either the test or dev environment a breeze.

Most importantly this project has given me a really fun and rewarding environment to learn some new tech. I haven't written a backend in JS for a while so that certainly added a bit of intensity to the challenge. But in the last 2.5 weeks I've picked up TypeScript, Prisma ORM, and refreshed my working knowledge of Redux as well as Express. During this process I realized that I had gotten comfortable with the tech I was using and tended towards it for iteration speed, but also remembered how fun it is to pickup a new language or dust off some old docs and get to building.

I want to thank you for the opportunity to take this challenge, and a rewarding coding experience throughout.

~Drew Thurman
