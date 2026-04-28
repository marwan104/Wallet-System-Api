import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceDto {
  @ApiProperty({
    description: 'The amount to update the balance by (must be greater than 0)',
    minimum: 1,
    example: 100
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}
