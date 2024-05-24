import { Account, Customer, Transaction } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { CustomerWithOptionalDetails } from '../types';

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



//Transaction queries