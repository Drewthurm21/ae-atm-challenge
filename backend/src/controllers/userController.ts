import { Request, Response, NextFunction } from 'express';
import { prisma } from '../app';
import { CustomerWithOptionalDetails, safeCustomerData } from '../types'

//the account number and user numbers match in this exercise, as such the account number is used to login a user
//the implementation is irregular, but it is done this way to match the requirements of the project
//in practice, we would use other means to authenticate a user
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const { accountNumber }: { accountNumber: number } = req.body;

    const customerWithAccountIds: CustomerWithOptionalDetails | null = await prisma.customer.findUnique({
      where: { id: accountNumber },
      include: { accounts: true }
    });

    if (!customerWithAccountIds) {
      throw new Error('Customer account not found');
    }

    const safeCustomerData: safeCustomerData = {
      id: customerWithAccountIds.id,
      name: customerWithAccountIds.name,
      account_ids: customerWithAccountIds.accounts.map(account => account.id)
    }

    res.status(200).json(safeCustomerData);

  } catch (error) {
    console.error('Error in loginUser. Request body:', req.body);
    next(error);
  }
};
