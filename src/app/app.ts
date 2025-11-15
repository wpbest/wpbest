import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wpbest');
  protected readonly geminiKey = signal<string | undefined>(undefined);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<unknown | undefined>(undefined);
   
  private apiService = inject(ApiService);
  private http = inject(HttpClient);

  async onTestButtonClick() {
    this.isLoading.set(true);
    this.error.set(undefined);
    try {
      const key = await this.apiService.getGeminiKey();
      this.geminiKey.set(key);
      console.log('Gemini API Key:', key);

      if (key) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`;
        const payload = {
          contents: [{
            role: "user",
            parts: [{
              text: "Hello Gemini, this is a test."
            }]
          }]
        };
        this.http.post(url, payload).subscribe(response => {
          console.log("LLM text:", (response as any)?.candidates?.[0]?.content?.parts?.[0]?.text);
        });
      }
    } catch (err) {
      this.error.set(err);
      console.error('Error getting Gemini API Key:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

}
