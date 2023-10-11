import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>
    ){}


  create(createOrderDto: CreateOrderDto) {
    
    return this.orderModel.create({
      ...CreateOrderDto,
      status: 'PENDING',
    })
  }

  findAll(acconunt_id: string) {
    return this.orderModel.find({
      acconunt_id
    });
  }

  findOne(id: number) {
    return this.orderModel.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
