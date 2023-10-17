import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod('OrderService')
  CreateOrder(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @GrpcMethod('OrderService')
  async FindAllOrders(@Payload()  findAllOrderDto: {accont_id: string}) {
     const orders = await this.ordersService.findAll(findAllOrderDto.accont_id);
     return{
      orders: orders.map(order =>({
        order_id: order.id.toString(),
        account_id: order.account_id,
        asset_id: order.asset_id,
        quantity: order.quantity,
        status: order.status,

      }))
     }
  }

  @GrpcMethod('OrderService')
  FindOneOrder(@Payload() findOneOrderDto: {order_id: number}) {
    return this.ordersService.findOne(findOneOrderDto.order_id);
  }

  @MessagePattern('updateOrder')
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }
}
