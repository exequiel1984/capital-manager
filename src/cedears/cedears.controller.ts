import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CedearsService } from './cedears.service';
import { CreateCedearDto } from './dto/create-cedear.dto';
import { UpdateCedearDto } from './dto/update-cedear.dto';

@Controller('cedears')
export class CedearsController {
  constructor(private readonly cedearsService: CedearsService) {}

  @Post()
  create(@Body() createCedearDto: CreateCedearDto) {
    return this.cedearsService.create(createCedearDto);
  }

  @Get()
  findAll() {
    return this.cedearsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cedearsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCedearDto: UpdateCedearDto) {
    return this.cedearsService.update(+id, updateCedearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cedearsService.remove(+id);
  }
}
