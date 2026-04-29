import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { CreateDirectorDto } from 'src/director/dto/create-director.dto';
import { UpdateDirectorDto } from 'src/director/dto/update-director.dto';

@Injectable()
export class ExternalApiService {
  EXTERNAL_URL =
    'http://apidevops-prod.eba-hiqy8jtp.us-east-2.elasticbeanstalk.com/api/v2/empleados';

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
    const res = await fetch(this.EXTERNAL_URL, {
      method: 'POST',
      body: JSON.stringify(fullJson),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error('External API error', { cause: await res.text() });
    }

    return res.json();
  }

  async updateEmployee(id: number, updateDirectorDto: UpdateDirectorDto) {
    /* 
    const res = await fetch(`${this.EXTERNAL_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateDirectorDto),
      headers: { 'Content-Type': 'application/json' },
    });
    */
    return JSON.stringify(updateDirectorDto);
  }
}
