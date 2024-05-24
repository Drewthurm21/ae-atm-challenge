const testUsers = [
  {
    name: 'Larry',
    email: 'larry@threestooges.com',
    hashed_pass: 'larrypass',
  },
  {
    name: 'Curly',
    email: 'curly@threestooges.com',
    hashed_pass: 'curlypass',
  },
  {
    name: 'Moe',
    email: 'moe@threestooges.com',
    hashed_pass: 'moepass',
  }
];

const testAccounts = [
  {
    customer_id: 1,
    type: 'CHECKING',
    balance: 1000,
    credit_limit: 0,
  },
  {
    customer_id: 2,
    type: 'SAVINGS',
    balance: 1000,
    credit_limit: 0,
  },
  {
    customer_id: 3,
    type: 'CREDIT',
    balance: 1000,
    credit_limit: 5000,
  }
];

const testTransactions = [
  {
    account_id: 1,
    customer_id: 1,
    type: 'DEPOSIT',
    credit: 1000,
    debit: 0,
    net_effect: 1000,
    status: 'COMPLETED',
  },
  {
    account_id: 2,
    customer_id: 2,
    type: 'DEPOSIT',
    credit: 1000,
    debit: 0,
    net_effect: 1000,
    status: 'COMPLETED',
  },
  {
    account_id: 3,
    customer_id: 3,
    type: 'WITHDRAWAL',
    credit: 0,
    debit: 1000,
    net_effect: -1000,
    status: 'COMPLETED',
  },

];

module.exports = {
  testUsers,
  testAccounts,
  testTransactions,
};