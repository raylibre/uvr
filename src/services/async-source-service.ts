import AsyncSource from 'async-source';
import { reactive } from 'vue';

// Storage for shared AsyncSource instances
const sharedSources = new Map<string, any>();
const sourceReferences = new Map<string, number>();

/**
 * Get or create a shared AsyncSource instance
 * @param key - Unique key for the shared instance
 * @param serviceFunction - API service function to use
 * @param errorHandler - Error handler function
 * @returns Reactive AsyncSource instance
 */
export function getSharedAsyncSource(
  key: string,
  serviceFunction: (...args: any[]) => Promise<any>,
  errorHandler: (error: any) => void
) {
  if (sharedSources.has(key)) {
    // Increment reference count
    const currentRefs = sourceReferences.get(key) || 0;
    sourceReferences.set(key, currentRefs + 1);
    
    return sharedSources.get(key);
  }

  // Create new shared instance
  const source = reactive(new AsyncSource(serviceFunction, errorHandler));
  sharedSources.set(key, source);
  sourceReferences.set(key, 1);

  return source;
}

/**
 * Remove a shared AsyncSource instance reference
 * @param key - Unique key for the shared instance
 * @param serviceFunction - API service function (for validation)
 */
export function removeSharedAsyncSource(
  key: string,
  serviceFunction: (...args: any[]) => Promise<any>
): void {
  if (!sharedSources.has(key)) {
    return;
  }

  const currentRefs = sourceReferences.get(key) || 0;
  const newRefs = Math.max(0, currentRefs - 1);
  
  if (newRefs === 0) {
    // No more references, remove the shared instance
    sharedSources.delete(key);
    sourceReferences.delete(key);
  } else {
    sourceReferences.set(key, newRefs);
  }
}

/**
 * Clear all shared AsyncSource instances (useful for cleanup or testing)
 */
export function clearAllSharedSources(): void {
  sharedSources.clear();
  sourceReferences.clear();
}

/**
 * Get current count of shared instances (for debugging)
 */
export function getSharedSourcesCount(): number {
  return sharedSources.size;
} 