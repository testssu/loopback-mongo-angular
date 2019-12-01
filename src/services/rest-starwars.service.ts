import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {StarwarsapiDataSource} from '../datasources';

export interface RestStarwars {
  getCharacter(personId:string): Promise<any>;
}

export class RestStarwarsProvider implements Provider<RestStarwars> {
  constructor(
    // starwarsapi must match the name property in the datasource json file
    @inject('datasources.starwarsapi')
    protected dataSource: StarwarsapiDataSource = new StarwarsapiDataSource(),
  ) {}

  value(): Promise<RestStarwars> {
    return getService(this.dataSource);
  }
}
