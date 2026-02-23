import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateMovieDto) {
    return this.prisma.movie.create({
      data,
    });
  }

  findAll() {
    return this.prisma.movie.findMany({
      include: {
        director: true,
        reviews: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        director: true,
        reviews: true,
      },
    });
  }

  update(id: number, data: UpdateMovieDto) {
    return this.prisma.movie.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}
