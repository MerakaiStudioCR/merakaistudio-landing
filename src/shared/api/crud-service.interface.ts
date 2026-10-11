/**
 * Interface for CRUD service operations.
 */
export interface ICrudService {
  getAll(...args: unknown[]): Promise<unknown>
  getById?(...args: unknown[]): Promise<unknown>
  create?(...args: unknown[]): Promise<unknown>
  update?(...args: unknown[]): Promise<unknown>
  delete?(...args: unknown[]): Promise<boolean>
}
