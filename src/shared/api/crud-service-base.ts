import { ApiServiceUtilities } from './service-utilities'
import type { ICrudService } from './crud-service.interface'

/**
 * All services that perform CRUD operations should extend this class.
 */
abstract class CrudServiceBase
  extends ApiServiceUtilities
  implements ICrudService
{
  // Abstract method that must be implemented by subclasses
  abstract getAll(...args: unknown[]): Promise<unknown>

  // Optional methods
  getById?(...args: unknown[]): Promise<unknown>
  create?(...args: unknown[]): Promise<unknown>
  update?(...args: unknown[]): Promise<unknown>
  delete?(...args: unknown[]): Promise<boolean>
}

export default CrudServiceBase
