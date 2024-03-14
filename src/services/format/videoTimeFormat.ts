export function formatDuration(duration) {
    const minutes = Math.floor(duration / 60).toString().padStart(2, '0');
    const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}