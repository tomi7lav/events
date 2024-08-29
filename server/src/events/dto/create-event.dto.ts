import {
  IsNotEmpty,
  IsString,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Event name is required' })
  @IsString({ message: 'Event name must be a string' })
  @MinLength(3, { message: 'Event name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Event name must not exceed 100 characters' })
  name: string;

  @IsNotEmpty({ message: 'Event date is required' })
  @IsDateString({}, { message: 'Invalid date format. Please use YYYY-MM-DD' })
  date: Date;

  @IsNotEmpty({ message: 'Event description is required' })
  @IsString({ message: 'Event description must be a string' })
  @MinLength(10, {
    message: 'Event description must be at least 10 characters long',
  })
  @MaxLength(1000, {
    message: 'Event description must not exceed 1000 characters',
  })
  description: string;
}
