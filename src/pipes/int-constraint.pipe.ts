import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IntConstraintPipe implements PipeTransform {
  private min?: number;
  private max?: number;
  private optional?: boolean;
  private defaultValue?: number;

  constructor({
    min,
    max,
    defaultValue,
    optional,
  }: {
    min?: number;
    max?: number;
    optional?: boolean;
    defaultValue?: number;
  } = {}) {
    this.min = min;
    this.max = max;
    this.optional = optional;
    this.defaultValue = defaultValue;
  }

  transform(value: any) {
    if (value == null || isNaN(value)) {
      if (!this.optional)
        throw new BadRequestException('value must be defined');
      return this.defaultValue;
    }

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
