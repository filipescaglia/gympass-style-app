import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCheckInService } from '@/services/factories/make-check-in-service';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  });

  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine(value => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine(value => Math.abs(value) <= 180),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const createCheckInService = makeCheckInService();

  await createCheckInService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: request.user.sub,
  });

  return reply.status(201).send();
}