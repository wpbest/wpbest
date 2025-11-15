import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wpbest');
  protected readonly geminiKey = signal<string | undefined>(undefined);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<unknown | undefined>(undefined);
   
  private apiService = inject(ApiService);

  async onTestButtonClick() {
    this.isLoading.set(true);
    this.error.set(undefined);
    try {
      const key = await this.apiService.getGeminiKey();
      this.geminiKey.set(key);
      console.log('Gemini API Key:', key);
    } catch (err) {
      this.error.set(err);
      console.error('Error getting Gemini API Key:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

}
