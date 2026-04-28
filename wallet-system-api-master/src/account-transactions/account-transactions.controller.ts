import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccountTransactionsService } from './account-transactions.service';
import { HandleTransactionDto } from './dtos/handle-transaction.dto';
import { TransactionType } from './enums/transaction-type.enum';

@ApiTags('Account Transactions')
@Controller('account-transactions')
export class AccountTransactionsController {
  constructor(
    private readonly accountTransactionsService: AccountTransactionsService,
  ) {}

  @ApiOperation({
    summary: 'Handle account transaction',
    description: 'Process a top-up or charge transaction for a user account',
  })
  @ApiResponse({
    status: 201,
    description: 'Transaction processed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input or insufficient balance',
  })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Duplicate transaction' })
  @Post()
  async handleTransaction(@Body() handleTransactionDto: HandleTransactionDto) {
    const { userId, amount, transactionId, type } = handleTransactionDto;

    if (type === TransactionType.TOP_UP)
      return this.accountTransactionsService.topUp({
        userId,
        amount,
        transactionId,
      });

    return this.accountTransactionsService.charge({
      userId,
      amount,
      transactionId,
    });
  }
}
