import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, userId: number) {
    await this.prisma.review.create({
      data: {
        title: createReviewDto.title,
        reviewText: createReviewDto.reviewText,
        rating: createReviewDto.rating,
        author: createReviewDto.author,
        user: {
          connect: { id: userId },
        },
      },
    });
    return;
  }

  async findAll() {
    const reviews = await this.prisma.review.findMany();
    return reviews;
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id: id },
    });
    return review;
  }

  async findUserReviews(userId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { reviewerID: userId },
    });
    return reviews;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    await this.prisma.review.update({
      where: { id: id },
      data: {
        title: updateReviewDto.title,
        reviewText: updateReviewDto.reviewText,
        rating: updateReviewDto.rating,
        author: updateReviewDto.author,
      },
    });
    const updatedReview = await this.prisma.review.findUnique({
      where: { id },
    });
    return updatedReview;
  }

  async remove(id: number) {
    await this.prisma.review.delete({
      where: { id: id },
    });
  }
}
