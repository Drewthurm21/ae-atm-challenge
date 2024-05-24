import { Account, DailyTotal, Transaction, TransactionStatus } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { 
    AccountWithDailyTotals,
    AccountWithOptionalDetails, 
    CustomerWithOptionalDetails, 
} from '../types';

const prisma = new PrismaClient()

//Customer queries
export const getCustomerWithAccountsById = async (id: number): Promise<CustomerWithOptionalDetails | null> => {
     return await prisma.customer.findUnique({
        where: { id: id },
        include: { accounts: true }
    });
};


//Account queries
export const getAccountById = async (id: number): Promise<Account | null> => {
    return await prisma.account.findUnique({
        where: { id: id }
    });
};

export const getAccountWithTransactionsById = async (id: number): Promise<AccountWithOptionalDetails | null> => {
    return await prisma.account.findUnique({
        where: { id: id },
        include: { transactions: true }
    });
};

export const getAccountWithTodayDailyTotalsById = async (id: number): Promise<AccountWithDailyTotals | null> => {
    const today = new Date();
    
    return await prisma.$transaction(async (prisma) => {
        await prisma.dailyTotal.upsert({
            where: { account_id_date: { account_id: id, date: today } },
            create: {
                account_id: id,
                date: today,
                total_deposit: 0,
                total_witdrawal: 0,
                total_transfer: 0,
            },
            update: {
                updated_at: new Date(),
            },
        });

        return await prisma.account.findUnique({
            where: { id: id },
            include: {
                daily_totals: {
                    where: { date: today },
                    take: 1
                },
            },
        });
    });
};

export const applyDepositToAccount = async (transaction: Transaction): Promise<Account | null> => {
    const { account_id, credit, debit } = transaction;
    const netEffect = credit.minus(debit);

    const account = await prisma.account.findUnique({
        where: { id: account_id }
    });

    if (account && account.type === 'CREDIT') {
        return await prisma.account.update({
            where: { id: account_id },
            data: {
                balance: {
                    decrement: netEffect,
                },
            },
        });
    };

    return await prisma.account.update({
        where: { id: account_id },
        data: {
            balance: {
                increment: netEffect,
            },
        },
    });
};

export const updateDailyTotals = async (transaction: Transaction): Promise<DailyTotal | null> => {
    const { account_id, credit, debit } = transaction;
    
    return await prisma.dailyTotal.update({
        where: { account_id_date: { account_id: account_id, date: new Date() } },
        data: {
            total_deposit: {
                increment: credit,
            },
            total_witdrawal: {
                decrement: debit,
            }
        },
    });
};


//Transaction queries
export const getTransactionsByAccountId = async (id: number): Promise<Transaction[]> => {
    return await prisma.transaction.findMany({
        where: { account_id: id }
    });
};

export const createPendingTransaction = async (customer_id: number, account_id: number, credit: number, debit: number): Promise<Transaction> => {
    return await prisma.transaction.create({
        data: {
            customer_id: customer_id,
            account_id: account_id,
            credit: credit,
            debit: debit,
            net_effect: credit - debit,
            type: credit - debit > 0 ? 'DEPOSIT' : 'WITHDRAWAL',
            status: TransactionStatus.PENDING,
            created_at: new Date(),
        }
    });
};

export const updateTransactionStatus = async (transaction_id: number, status: TransactionStatus): Promise<Transaction | null> => {
    return await prisma.transaction.update({
        where: { id: transaction_id },
        data: {
            status: status,
            updated_at: new Date(),
        },
    });
};
  