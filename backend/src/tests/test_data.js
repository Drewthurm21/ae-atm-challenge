const testUsers = [
  {
    name: 'Tony Stark',
    email: 'ironman@avengers.com',
    hashed_pass: 'imissjarvis',
  },
  {
    name: 'Natasha Romanova',
    email: 'blackwidow@avengers.com',
    hashed_pass: '$up3r$3cr3t$py',
  },
  {
    name: 'Thor Odinson',
    email: 'thor@avengers.com',
    hashed_pass: 'password',
  },
  {
    name: 'Bruce Banner',
    email: 'thehulk@avengers.com',
    hashed_pass: 'imalwaysangry',
  },
  {
    name: 'Steve Rogers',
    email: 'captainamerica@avengers.com',
    hashed_pass: 'S.H.I.E.L.D.',
  },
  {
    name: 'Clint Barton',
    email: 'hawkeye@avengers.com',
    hashed_pass: 'CooperLilaNateLaura',
  }
];

const testAccounts = [
  {
    customer_id: 1,
    type: 'CHECKING',
    balance: 1000000,
    credit_limit: 0,
  },
  {
    customer_id: 2,
    type: 'SAVINGS',
    balance: 138000,
    credit_limit: 0,
  },
  {
    customer_id: 3,
    type: 'CREDIT',
    balance: 0,
    credit_limit: 5000,
  },
  {
    customer_id: 4,
    type: 'CHECKING',
    balance: 503040,
    credit_limit: 0,
  },
  {
    customer_id: 5,
    type: 'CREDIT',
    balance: 2000,
    credit_limit: 50000,
  },
  {
    customer_id: 6,
    type: 'SAVINGS',
    balance: 19000,
    credit_limit: 0,
  },
];

const testTransactions = [
  {
    account_id: 1,
    customer_id: 1,
    type: 'DEPOSIT',
    credit: 1000000,
    debit: 0,
    net_effect: 1000000,
    status: 'COMPLETED',
  },
  {
    account_id: 2,
    customer_id: 2,
    type: 'DEPOSIT',
    credit: 140000,
    debit: 0,
    net_effect: 140000,
    status: 'COMPLETED',
  },
  {
    account_id: 2,
    customer_id: 2,
    type: 'WITHDRAWAL',
    credit: 0,
    debit: 2000,
    net_effect: -2000,
    status: 'COMPLETED',
  },
  {
    account_id: 3,
    customer_id: 3,
    type: 'DEPOSIT',
    credit: 0,
    debit: 0,
    net_effect: 0,
    status: 'COMPLETED',
  },
  {
    account_id: 3,
    customer_id: 3,
    type: 'DEPOSIT',
    credit: 510,
    debit: 0,
    net_effect: 0,
    status: 'FAILED',
  },
  {
    account_id: 4,
    customer_id: 4,
    type: 'DEPOSIT',
    credit: 504000,
    debit: 0,
    net_effect: 504000,
    status: 'COMPLETED',
  },
  {
    account_id: 4,
    customer_id: 4,
    type: 'WITHDRAWAL',
    credit: 0,
    debit: 960,
    net_effect: -960,
    status: 'COMPLETED',
  },
  {
    account_id: 5,
    customer_id: 5,
    type: 'DEPOSIT',
    credit: 0,
    debit: 0,
    net_effect: 0,
    status: 'COMPLETED',
  },
  {
    account_id: 5,
    customer_id: 5,
    type: 'WITHDRAWAL',
    credit: 0,
    debit: 2000,
    net_effect: -2000,
    status: 'COMPLETED',
  },
  {
    account_id: 6,
    customer_id: 6,
    type: 'DEPOSIT',
    credit: 19000,
    debit: 0,
    net_effect: 19000,
    status: 'COMPLETED',
  },

];

module.exports = {
  testUsers,
  testAccounts,
  testTransactions,
};