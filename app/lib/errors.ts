export class NotImplementedError extends Error {}

export class BackendError extends Error {
  readonly details: string;

  constructor(message: string, details: string) {
    super(message);
    this.details = details;
  }
}

export class InvalidCredentialsError extends BackendError {
  override readonly name = "InvalidCredentialsError";
}

export class UnknownBackendError extends BackendError {
  override readonly name = "UnknownBackendError";
}

export class ValidationError extends BackendError {
  override readonly name = "ValidationError";
}

export class MissedQuestionError extends BackendError {
  override readonly name = "MissedQuestionError";
  readonly questionMissed: number;

  constructor(message: string, details: string, questionMissed: number) {
    super(message, details);
    this.questionMissed = questionMissed;
  }
}
