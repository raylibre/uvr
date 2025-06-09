/**
 * Generate a fallback avatar URL using a service like DiceBear or similar
 * Uses the person's name to generate a consistent avatar
 */
export function generateFallbackAvatar(name: string, size: number = 200): string {
  // Use DiceBear avatars service with initials style
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
  
  // Use a service that generates avatars based on initials
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=${size}&background=e5e7eb&color=374151&font-size=0.6`;
}

/**
 * Handle image load errors by setting a fallback avatar
 */
export function onImageError(event: Event, name: string): void {
  const img = event.target as HTMLImageElement;
  if (img) {
    img.src = generateFallbackAvatar(name);
  }
}

/**
 * Preload an image and return a promise
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
} 