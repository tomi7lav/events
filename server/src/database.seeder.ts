import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events/entities/event.entity';
import { faker } from '@faker-js/faker';
@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async seed() {
    const count = await this.eventRepository.count();
    if (count > 0) {
      console.log('Database already seeded');
      return;
    }

    const events = this.generateEvents(50);
    await this.eventRepository.save(events);
    console.log('Database seeded with 50 events');
  }

  private generateEvents(numEvents: number): Partial<Event>[] {
    return Array(numEvents)
      .fill(null)
      .map(() => ({
        name: faker.word.words(3),
        description: faker.lorem.sentence(),
        date: faker.date.future(),
      }));
  }
}
