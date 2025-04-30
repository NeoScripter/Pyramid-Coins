export function playAudio(audioSrc: string, quiet = false) {
    const audio = new Audio(audioSrc);
    if (quiet) {
        audio.volume = 0.25;
    }
    audio.play();
}
