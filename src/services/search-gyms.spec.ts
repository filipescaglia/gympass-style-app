import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsService } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Gym 01',
      description: null,
      phone: null,
      latitude: -23.5007322,
      longitude: -46.4510693,
    });
    await gymsRepository.create({
      title: 'Gym 02',
      description: null,
      phone: null,
      latitude: -23.5007322,
      longitude: -46.4510693,
    });

    const { gyms } = await sut.execute({
      query: '01',
      page: 1
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 01' }),
    ]);
  });

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5007322,
        longitude: -46.4510693,
      });
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' })
    ]);
  });
});