import * as Tone from 'tone';

// --- 1. Create the instruments ---
// We use Tone.Players to load multiple samples
export const players = new Tone.Players({
  // Update these paths to your sound files
  kick: "/src/assets/sounds/kick.wav",
  snare: "/src/assets/sounds/snare.wav",
  hihat: "/src/assets/sounds/hihat.wav",
  tom: "/src/assets/sounds/tom.wav",
}).toDestination(); // Connects all players to your computer's speakers

// --- 2. Create our playback function ---
export function playSound(instrumentName) {
  // Wait for all sounds to be loaded before playing
  if (players.loaded) {
    players.player(instrumentName).start();
  } else {
    console.log("Sounds not loaded yet!");
  }
}

// --- 3. A function to start Tone.js (required by browsers) ---
// Browsers won't let audio play until the user interacts with the page.
// We'll call this from a button click.
export async function startAudio() {
  if (Tone.context.state !== 'running') {
    await Tone.start();
    console.log("AudioContext started!");
  }
}