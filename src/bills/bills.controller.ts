import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { GetUserId } from 'src/decorators/get-use-id.decorator';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) { }

  // Get bills for the authenticated user
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUserBills(@GetUserId() userId: string) {
    return this.billsService.getUserBills(userId);
  }

  // Get a specific bill by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsService.findOne(id);
  }
  // Create a new bill
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createBillDto: CreateBillDto, @GetUserId() userId: string) {
    return this.billsService.create(createBillDto, userId);
  }
  // Update a specific bill
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(id, updateBillDto);
  }
  // Mark a bill as paid
  @Patch('paid/:id')
  @UseGuards(AuthGuard('jwt'))
  markAsPaid(@Param('id') id: string) {
    return this.billsService.markBillAsPaid(id);
  }
}
