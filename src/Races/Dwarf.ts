import Race from './Race';

export default class Dwarf extends Race {
  private _maxLifePoints: number;
  constructor(
    name: string,
    dexterity: number,
  ) {
    super(name, dexterity);
    Dwarf.instances += 1;
    this._maxLifePoints = 80;
  }

  static instances = 0;

  static createdRacesInstances():number {
    return Dwarf.instances;
  }

  get maxLifePoints():number {
    return this._maxLifePoints;
  }
}
