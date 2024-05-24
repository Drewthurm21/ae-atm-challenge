import { Account, Customer, Transaction } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { AccountWithOptionalDetails, CustomerWithOptionalDetails } from '../types';

const prisma = new PrismaClient()

//Customer queries
export const getCustomerWithAccountsById = async (id: number): Promise<CustomerWithOptionalDetails | null> => {
    const customer = await prisma.customer.findUnique({
        where: { id: id },
        include: { accounts: true }
    })

    return customer
};



//Account queries
export const getAccountWithTransactionsById = async (id: number): Promise<AccountWithOptionalDetails | null> => {
    const account = await prisma.account.findUnique({
        where: { id: id },
        include: { transactions: true }
    })

    return account
}



//Transaction queries
export const getTransactionsByAccountId = async (id: number): Promise<Transaction[]> => {
    const transactions = await prisma.transaction.findMany({
        where: { account_id: id }
    })

    return transactions
}