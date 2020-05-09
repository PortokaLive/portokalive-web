export class IError extends Error {
  constructor(
    public code: number = 0,
    public name: string = "",
    public message: string = ""
  ) {
    super();
  }
}
