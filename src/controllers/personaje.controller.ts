// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/context';
import {get, param} from '@loopback/rest';
import {RestStarwars} from '../services/rest-starwars.service';

export class PersonajeController {
  constructor(@inject('services.RestStarwars')protected starwars: RestStarwars) {}


  @get('starwars/personaje/{id}')
  async personaje(@param.path.string('id') id: string): Promise<any>{
    return await this.starwars.getCharacter(id);
  }

}
