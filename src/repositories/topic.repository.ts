import {DefaultCrudRepository} from '@loopback/repository';
import {Topic, TopicRelations} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TopicRepository extends DefaultCrudRepository<
  Topic,
  typeof Topic.prototype.id,
  TopicRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Topic, dataSource);
  }
}
