/**
 * Represents a paginated result set.
 * This class encapsulates the data items of type T and the total count of items
 * that match the query criteria, not just the count of items in the current page.
 *
 * @template T - The type of the data items in the result set.
 */
export class PaginatedResult<T> {
  /**
   * The array of data items of type T.
   */
  data: Array<T>;

  /**
   * The total count of items that match the query criteria.
   */
  totalCount: number;
  private page: number;
  private limit: number;
  private pageCount: number;

  /**
   * Constructs an instance of PaginatedResult.
   *
   * @param data - The array of data items.
   * @param totalCount - The total count of items that match the query criteria.
   */
  constructor(
    data: Array<T>,
    totalCount: number,
    page?: number,
    limit?: number,
  ) {
    this.data = data;
    this.totalCount = totalCount;
    this.page = page || 1;
    this.limit = limit || 10;
    this.pageCount = Math.ceil(totalCount / (this.limit || 10));
  }
}
