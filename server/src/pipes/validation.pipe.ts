import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length) {
            const resp = errors.map(({ property, constraints }) =>
                Object.values(constraints).join(', '),
            );
            throw new ValidationException(resp);
        }

        return value;
    }
}
