export class ApiResponse<T = null> {
  error = null;
  constructor(public result: T | null) {}
}

export class ServerErrorResponse<E = string> {
  result = null;
  constructor(public error: E) {}
}
