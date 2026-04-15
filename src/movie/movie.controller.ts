import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return this.movieService.update(Number(id), body);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return this.movieService.put(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(Number(id));
  }
}
