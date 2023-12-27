import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IntConstraintPipe implements PipeTransform {
  private min?: number;
  private max?: number;

  constructor({ min, max }: { min?: number; max?: number } = {}) {
    this.min = min;
    this.max = max;
  }

  transform(value: any) {
    if (!Number.isInteger(value)) {
      throw new BadRequestException('value must be an integer');
    }
    const num = Number(value);
    if (this.min != null && num < this.min) {
      throw new BadRequestException(
        `value must not be smaller than ${this.min}`,
      );
    }
    if (this.max != null && num > this.max) {
      throw new BadRequestException(
        `value must not be larger than ${this.max}`,
      );
    }
    return num;
  }
}
