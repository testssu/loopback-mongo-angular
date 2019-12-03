import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Bookmark extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Bookmark>) {
    super(data);
  }
}

export interface BookmarkRelations {
  // describe navigational properties here
}

export type BookmarkWithRelations = Bookmark & BookmarkRelations;
