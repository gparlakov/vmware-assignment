import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard {
  constructor() {}

  public canActivate(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
  }
}