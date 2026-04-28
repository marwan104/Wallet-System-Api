import { IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enums/transaction-type.enum';

export class HandleTransactionDto {
  @ApiProperty({
    description: 'The ID of the user performing the transaction',
    example: '507f1f77bcf86cd799439011',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The amount to be transacted (must be greater than 0)',
    minimum: 1,
    example: 100,
  })
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: 'Unique identifier for the transaction',
    example: 'tx_123456789',
  })
  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @ApiProperty({
    description: 'Type of transaction',
    enum: TransactionType,
    example: TransactionType.TOP_UP,
  })
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
