import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wpbest-website');
  protected readonly error = signal<unknown | undefined>(undefined);

  async onTestButtonClick() {
    this.error.set(undefined);
    try {
      console.log('Start of Test button clicked');
    } catch (err) {
      this.error.set(err);
      console.error('Error:', err);
    } finally {
      console.log('End of Test button clicked');
    }
  }

}

