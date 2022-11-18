import Race from './Race';

export default class Halfling extends Race {
  private _maxLifePoints: number;
  constructor(
    name: string,
    dexterity: number,
  ) {
    super(name, dexterity);
    Halfling.instances += 1;
    this._maxLifePoints = 60;
  }

  static instances = 0;

  static createdRacesInstances():number {
    return Halfling.instances;
  }

  get maxLifePoints():number {
    return this._maxLifePoints;
  }
}
