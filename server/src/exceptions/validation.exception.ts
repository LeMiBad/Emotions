import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
    errors;

    constructor(text) {
        super(text, HttpStatus.BAD_REQUEST);
        this.errors = text;
    }
}
