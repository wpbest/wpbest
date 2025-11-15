import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private functions: Functions) {}

  async getGeminiKey(): Promise<string> {
    const getGeminiKey = httpsCallable(this.functions, 'getGeminiKey');
    const result = await getGeminiKey();
    return (result.data as {key: string}).key;
  }
}
