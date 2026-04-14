import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { ExternalApiService } from 'src/external_api/externalApi.service';

@Injectable()
export class DirectorService {
  constructor(
    private prisma: PrismaService,
    private externalApiService: ExternalApiService,
  ) {}

  create(createDirectorDto: CreateDirectorDto) {
    const newDirector = this.prisma.director.create({
      data: createDirectorDto,
    });
    const fullJson = this.externalApiService.createEmployee(createDirectorDto);
    return newDirector;
  }

  findAll() {
    return this.prisma.director.findMany({
      include: { movies: true },
    });
  }

  findOne(id: number) {
    return this.prisma.director.findUnique({
      where: { id },
      include: { movies: true },
    });
  }

  update(id: number, updateDirectorDto: UpdateDirectorDto) {
    return this.prisma.director.update({
      where: { id },
      data: updateDirectorDto,
    });
  }

  remove(id: number) {
    return this.prisma.director.delete({
      where: { id },
    });
  }
}
