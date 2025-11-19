


import { Injectable, inject } from '@angular/core';

import { Functions, httpsCallable } from '@angular/fire/functions';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';



@Injectable({

  providedIn: 'root',

})

export class FirebaseSecrets {

  private functions = inject(Functions);

  private http = inject(HttpClient);



  async getGeminiKey(): Promise<string> {

    const getGeminiKeyFn = httpsCallable(this.functions, 'getGeminiKey');

    const result = await getGeminiKeyFn();

    return (result.data as { key: string }).key;

  }



  async getTtsKey(): Promise<string> {

    const getTtsKeyFn = httpsCallable(this.functions, 'getTtsKey');

    const result = await getTtsKeyFn();

    return (result.data as { key: string }).key;

  }



  getSpeech(text: string): Observable<ArrayBuffer> {

    const functionUrl = 'https://us-central1-wpbest-website.cloudfunctions.net/speak';

    return this.http.post(functionUrl, { text }, {

      responseType: 'arraybuffer'

    });

  }

}
