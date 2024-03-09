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
@UseGuards(AuthGuard('jwt'))
export class BillsController {
  constructor(private readonly billsService: BillsService) { }

  // Get bills for the authenticated user
  @Get()
  getUserBills(@GetUserId() userId: string) {
    return this.billsService.getUserBills(userId);
  }

  // Get a specific bill by ID
  // bills/123
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.billsService.findOne(id);
  }
  // Create a new bill
  @Post()
  create(@Body() createBillDto: CreateBillDto, @GetUserId() userId: string) {
    return this.billsService.create(createBillDto, userId);
  }
  // Update a specific bill
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(id, updateBillDto);
  }
  // Mark a bill as paid
  @Patch('paid/:id')
  markAsPaid(@Param('id') id: string) {
    return this.billsService.markBillAsPaid(id);
  }

  // delete bill soft
  @Patch('delete/:id')
  deleteBill(@Param('id') id: string) {
    return this.billsService.deleteBillSoft(id);
  }
}
