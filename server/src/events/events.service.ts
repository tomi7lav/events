import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = new Event();
    event.name = createEventDto.name;
    event.date = createEventDto.date;
    event.description = createEventDto.description;
    return this.eventRepository.save(event);
  }

  findAll() {
    return this.eventRepository.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const result = await this.eventRepository.update(id, updateEventDto);

    if (!result.affected) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    return result;
  }

  async remove(id: number) {
    const result = await this.eventRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    return result;
  }
}
