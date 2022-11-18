// import Character from './Character';
import Fighter, { SimpleFighter } from './Fighter';

export default class Monster implements SimpleFighter {
  protected _lifePoints: number;
  protected _strength: number;

  constructor(
    lifePoints = 85,
    strength = 63,
  ) {
    this._lifePoints = lifePoints;
    this._strength = strength;
  }

  get lifePoints():number {
    return this._lifePoints;
  }

  get strength():number {
    return this._strength;
  }

  receiveDamage(attackPoints: number): number {
    if (attackPoints > 0) { this._lifePoints -= attackPoints; }
    if (this._lifePoints < 0) { this._lifePoints = -1; }
    return this._lifePoints;
  }

  attack(target: Fighter): void {
    const damage = this.strength;
    target.receiveDamage(damage);
  }
}
