export class CreateReviewDto {
  readonly productId!: string;
  readonly userId!: string;
  readonly rating!: number;
  readonly comment?: string;
}