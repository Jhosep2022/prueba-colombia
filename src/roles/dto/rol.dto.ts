export class RolDto {
  private _description: string;
  private _status: boolean;

  constructor(description: string, status?: boolean) {
    this._description = description;
    this._status = status ?? true;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Description cannot be empty');
    }
    this._description = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }
}
