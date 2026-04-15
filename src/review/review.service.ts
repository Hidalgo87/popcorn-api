import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: createReviewDto,
    });
  }

  findAll() {
    return this.prisma.review.findMany({
      include: { movie: true },
    });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: { movie: true },
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  put(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
