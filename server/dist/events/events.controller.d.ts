import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto): Promise<CreateEventDto & import("./entities/event.entity").Event>;
    findAll(): Promise<import("./entities/event.entity").Event[]>;
    findOne(id: string): Promise<import("./entities/event.entity").Event>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
