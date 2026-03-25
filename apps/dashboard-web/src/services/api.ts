const API_BASE_URL =
  import.meta.env.VITE_QUERY_API_URL ?? "http://localhost:3334";

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
