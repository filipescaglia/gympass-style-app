import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInService } from './check-in';

let usersRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(usersRepository);
  });

  it('should be able to check in', async () => {
    const {checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});