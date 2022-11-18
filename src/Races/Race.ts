export default abstract class Race {
  private _name: string;
  private _dexterity: number;

  constructor(readonly name: string, readonly dexterity: number) {
    this._name = name;
    this._dexterity = dexterity;
    this.instances += 1;
  }

  instances = 0;

  static createdRacesInstances():number {
    throw new Error('Not implemented');
  }

  abstract get maxLifePoints():number;
}