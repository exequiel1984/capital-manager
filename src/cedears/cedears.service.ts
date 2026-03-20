import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCedearDto } from './dto/create-cedear.dto';
import { Cedear } from './entities/cedear.entity';

@Injectable()
export class CedearsService {
  constructor(
    @InjectRepository(Cedear)
    private cedearRepository: Repository<Cedear>,
  ) {}

  async create(createCedearDto: CreateCedearDto): Promise<Cedear> {
    // We simply save the ticker and company directly. No more prices here!
    const newCedear = this.cedearRepository.create(createCedearDto);
    return await this.cedearRepository.save(newCedear);
  }

  async findAll(): Promise<Cedear[]> {
    return await this.cedearRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} cedear`;
  }

  update(id: number, updateCedearDto: any) {
    return `This action updates a #${id} cedear`;
  }

  remove(id: number) {
    return `This action removes a #${id} cedear`;
  }
}