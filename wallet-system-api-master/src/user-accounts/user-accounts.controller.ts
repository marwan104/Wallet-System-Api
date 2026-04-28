import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserAccountService } from './services/user-account.service';
import { CreateUserAccountDto } from './dtos/create-user-account.dto';

@ApiTags('User Accounts')
@Controller('user-accounts')
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountService) {}

  @ApiOperation({ summary: 'Create a new user account' })
  @ApiResponse({ status: 201, description: 'Account successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input' })
  @ApiResponse({ status: 409, description: 'Conflict - Account already exists' })
  @Post()
  async createAccount(@Body() createAccountDto: CreateUserAccountDto) {
    return this.userAccountsService.createAccount(createAccountDto);
  }

  @ApiOperation({ summary: 'Get user account details' })
  @ApiResponse({ status: 200, description: 'Account details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user to get account for',
    example: '507f1f77bcf86cd799439011'
  })
  @Get('my-account/:userId')
  async getMyAccount(@Param('userId') userId: string) {
    return await this.userAccountsService.getMyAccount(userId);
  }
}
