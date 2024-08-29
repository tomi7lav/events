import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

const date = new Date('2024-08-27');
const dto: CreateEventDto = {
  name: 'Test Event',
  date: date,
  description: 'This is a test event description',
};
const event = { id: 1, ...dto };

const events = [
  {
    id: 1,
    name: 'Event 1',
    date: new Date(),
    description: 'Description 1',
  },
  {
    id: 2,
    name: 'Event 2',
    date: new Date(),
    description: 'Description 2',
  },
];

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        EventsService,
        {
          provide: EventsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(events),
            create: jest.fn().mockResolvedValue(event),
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should find all events', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(events);

    expect(await controller.findAll()).toEqual(events);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should create an event', async () => {
    expect(await controller.create(dto)).toEqual(event);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
