import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { NotFoundException } from '@nestjs/common';

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
            findOneBy: jest.fn().mockImplementation((query) => {
              const event = events.find((e) => e.id === query.id);
              return event ? event : null;
            }),
            update: jest.fn(),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
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

  describe('findOne', () => {
    it('should return a single event', async () => {
      expect(await service.findOne(1)).toEqual(events[0]);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if event is not found', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateDto: UpdateEventDto = { name: 'Updated Event' };
      jest.spyOn(repo, 'update').mockResolvedValue({
        affected: 1,
        raw: null,
        generatedMaps: [],
      });

      const result = await service.update(1, updateDto);
      expect(result).toEqual({ affected: 1, raw: null, generatedMaps: [] });
      expect(repo.update).toHaveBeenCalledWith(1, { ...updateDto });
    });

    it('should throw NotFoundException if event to update is not found', async () => {
      jest
        .spyOn(repo, 'update')
        .mockResolvedValue({ affected: 0, raw: null, generatedMaps: [] });

      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1, raw: null });

      await service.remove(1);
      expect(repo.delete).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if event to remove is not found', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 0, raw: null });
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
  // Add more test cases as needed
});
