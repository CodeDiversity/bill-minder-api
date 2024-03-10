// customErrors.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameAlreadyTakenException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.CONFLICT,
        error: 'Username already taken',
        code: 'USERNAME_ALREADY_EXISTS',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class EmailAlreadyTakenException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.CONFLICT,
        error: 'Email already taken',
        code: 'EMAIL_ALREADY_EXISTS',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidCredentials extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
