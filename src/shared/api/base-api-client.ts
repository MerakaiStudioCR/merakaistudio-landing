/**
 * All API clients should implement this interface to ensure consistency.
 * This interface enforces standardized method naming across all API clients.
 * Only getAll is required; other methods are optional based on entity capabilities.
 */
export interface BaseApiClient {
  getAll(...args: unknown[]): Promise<unknown>
  getById?(...args: unknown[]): Promise<unknown | null>
  create?(...args: unknown[]): Promise<unknown>
  update?(...args: unknown[]): Promise<unknown>
  delete?(...args: unknown[]): Promise<void>
}
