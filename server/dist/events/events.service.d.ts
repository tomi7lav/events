import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsService {
    private eventRepository;
    constructor(eventRepository: Repository<Event>);
    create(createEventDto: CreateEventDto): Promise<CreateEventDto & Event>;
    findAll(): Promise<Event[]>;
    findOne(id: number): Promise<Event>;
    update(id: number, updateEventDto: UpdateEventDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
