import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

enum UIMode {
  Default,
  Dictate,
  Voice,
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule], // Removed HttpClientModule, added FormsModule
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly UIMode = UIMode; // Expose enum to template
  protected currentMode = signal(UIMode.Default);
  protected inputText = signal('');
  protected isVoiceModeEnabled = signal(false);
  protected chatMessages = signal<Array<{ type: 'user' | 'assistant', text: string }>>([]);
  protected isTyping = signal(false);

  protected isMicMuted = signal(false); // New signal for microphone mute state

  // Removed ApiService and HttpClient injections as they are no longer used
  // private apiService = inject(ApiService);
  // private http = inject(HttpClient);

  startDictateMode() {
    this.currentMode.set(UIMode.Dictate);
    // Removed simulated speech recognition text as requested.
  }

  acceptDictation() {
    if (this.inputText().trim()) {
      this.chatMessages.update(messages => [...messages, { type: 'user', text: this.inputText() }]);
      this.inputText.set('');
      this.simulateAssistantResponse();
    }
    this.currentMode.set(UIMode.Default);
  }

  cancelDictation() {
    this.inputText.set('');
    this.currentMode.set(UIMode.Default);
  }

  toggleVoiceMode() {
    this.isVoiceModeEnabled.update(value => !value);
    if (this.isVoiceModeEnabled()) {
      this.currentMode.set(UIMode.Voice);
      this.simulateVoiceConversation();
    } else {
      this.currentMode.set(UIMode.Default);
      // Stop voice conversation simulation when voice mode is disabled
      // (The simulateVoiceConversation function needs to be updated to handle this)
    }
  }

  toggleMicMute() {
    this.isMicMuted.update(value => !value);
  }

  cancelVoiceMode() {
    this.isVoiceModeEnabled.set(false);
    this.currentMode.set(UIMode.Default);
    this.isMicMuted.set(false); // Reset mute state when exiting voice mode
  }

  private simulateAssistantResponse() {
    this.isTyping.set(true);
    setTimeout(() => {
      this.chatMessages.update(messages => [...messages, { type: 'assistant', text: 'This is a mocked assistant response.' }]);
      this.isTyping.set(false);
    }, 3000);
  }

  private simulateVoiceConversation() {
    // Removed simulated incoming messages functionality as requested.
    // This method will now only manage the voice mode state without adding chat messages.
  }
}
