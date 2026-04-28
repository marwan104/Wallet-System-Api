import {
  ClientSession,
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose';
import { PaginatedResult } from '../models/paginated-result.model';

export interface FindPaginatedOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  populate?: string | string[];
}

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>, session?: ClientSession): Promise<T> {
    const entity = new this.model(data);
    return entity.save({ session });
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async find(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async update(
    id: string,
    data: UpdateQuery<T>,
    session?: ClientSession,
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data, { new: true, session })
      .exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async deleteMany(filter: FilterQuery<T>): Promise<boolean> {
    const result = await this.model.deleteMany(filter).exec();
    return result.deletedCount > 0;
  }

  async findPaginated(
    filter: FilterQuery<T> = {},
    options: FindPaginatedOptions = {},
  ): Promise<PaginatedResult<T>> {
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, options.limit || 10);
    const skip = (page - 1) * limit;

    const [items, totalCount] = await Promise.all([
      this.model
        .find(filter)
        .sort(options.sort)
        .populate(options.populate || [])
        .skip(skip)
        .limit(limit)
        .exec(),
      this.model.countDocuments(filter),
    ]);

    return new PaginatedResult<T>(items, totalCount, page, limit);
  }
}
