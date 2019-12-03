import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Bookmark} from '../models';
import {BookmarkRepository} from '../repositories';

export class BookmarksController {
  constructor(
    @repository(BookmarkRepository)
    public bookmarkRepository : BookmarkRepository,
  ) {}

  @post('/bookmarks', {
    responses: {
      '200': {
        description: 'Bookmark model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bookmark)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookmark, {
            title: 'NewBookmark',
            exclude: ['id'],
          }),
        },
      },
    })
    bookmark: Omit<Bookmark, 'id'>,
  ): Promise<Bookmark> {
    return this.bookmarkRepository.create(bookmark);
  }

  @get('/bookmarks/count', {
    responses: {
      '200': {
        description: 'Bookmark model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Bookmark)) where?: Where<Bookmark>,
  ): Promise<Count> {
    return this.bookmarkRepository.count(where);
  }

  @get('/bookmarks', {
    responses: {
      '200': {
        description: 'Array of Bookmark model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Bookmark, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Bookmark)) filter?: Filter<Bookmark>,
  ): Promise<Bookmark[]> {
    return this.bookmarkRepository.find(filter);
  }

  @patch('/bookmarks', {
    responses: {
      '200': {
        description: 'Bookmark PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookmark, {partial: true}),
        },
      },
    })
    bookmark: Bookmark,
    @param.query.object('where', getWhereSchemaFor(Bookmark)) where?: Where<Bookmark>,
  ): Promise<Count> {
    return this.bookmarkRepository.updateAll(bookmark, where);
  }

  @get('/bookmarks/{id}', {
    responses: {
      '200': {
        description: 'Bookmark model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Bookmark, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Bookmark)) filter?: Filter<Bookmark>
  ): Promise<Bookmark> {
    return this.bookmarkRepository.findById(id, filter);
  }

  @patch('/bookmarks/{id}', {
    responses: {
      '204': {
        description: 'Bookmark PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookmark, {partial: true}),
        },
      },
    })
    bookmark: Bookmark,
  ): Promise<void> {
    await this.bookmarkRepository.updateById(id, bookmark);
  }

  @put('/bookmarks/{id}', {
    responses: {
      '204': {
        description: 'Bookmark PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bookmark: Bookmark,
  ): Promise<void> {
    await this.bookmarkRepository.replaceById(id, bookmark);
  }

  @del('/bookmarks/{id}', {
    responses: {
      '204': {
        description: 'Bookmark DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bookmarkRepository.deleteById(id);
  }
}
