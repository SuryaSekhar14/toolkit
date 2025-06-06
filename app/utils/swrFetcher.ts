/**
 * Default SWR fetcher that handles response validation and error handling
 * @param url - The URL to fetch from
 * @returns The parsed JSON response
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error(`Failed to fetch: ${response.statusText}`);
    error.name = `${response.status}`;
    throw error;
  }
  
  return response.json() as Promise<T>;
};

/**
 * Default SWR configuration options
 */
export const defaultSWROptions = {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 3,
}; 