import {DefaultCrudRepository} from '@loopback/repository';
import {Bookmark, BookmarkRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BookmarkRepository extends DefaultCrudRepository<
  Bookmark,
  typeof Bookmark.prototype.id,
  BookmarkRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Bookmark, dataSource);
  }
}
