import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { CreateDirectorDto } from 'src/director/dto/create-director.dto';

@Injectable()
export class ExternalApiService {
  async createEmployee(createDirectorDto: CreateDirectorDto) {
    const fullJson = {
      cedula: randomInt(10000000, 99999999),
      nombre: createDirectorDto.name,
      rol: 'Director',
      jsonDirector: {
        nombre: createDirectorDto.name,
        jsonDoctor: { ...createDirectorDto.jsonDoctor },
      },
    };
    const res = await fetch(
      'http://apidevops-prod.eba-hiqy8jtp.us-east-2.elasticbeanstalk.com/api/v2/empleados',
      {
        method: 'POST',
        body: JSON.stringify(fullJson),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!res.ok) {
      throw new Error('External API error', { cause: await res.text() });
    }

    return res.json();
  }
}
