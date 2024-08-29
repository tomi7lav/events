import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
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

describe('EventsService', () => {
  let service: EventsService;
  let repo: Repository<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: {
            save: jest.fn().mockResolvedValue(event),
            find: jest.fn().mockResolvedValue(events),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    repo = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an event', async () => {
      expect(await service.create(dto)).toEqual(event);
      expect(repo.save).toHaveBeenCalledTimes(1);
      expect(repo.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      expect(await service.findAll()).toEqual(events);
      expect(repo.find).toHaveBeenCalledTimes(1);
    });
  });

  // Add more test cases as needed
});
