import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymService } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 01',
      description: null,
      phone: null,
      latitude: -23.5007322,
      longitude: -46.4510693,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});