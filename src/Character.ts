import { Mage, Necromancer, Ranger, Warrior } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import { Dwarf, Elf, Halfling, Orc } from './Races';
import getRandomInt from './utils';

type IArchetype = (Mage | Necromancer | Warrior | Ranger);
type IRace = (Orc | Elf | Halfling | Dwarf);

const archetypes = { Mage, Necromancer, Warrior, Ranger };
const races = { Orc, Elf, Halfling, Dwarf };

export default class Character implements Fighter {
  private readonly _raceInstance: IRace;
  private readonly _archetypeInstance: IArchetype;
  private _archetype: string;
  private _race: string;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private readonly _energy: Energy;

  constructor(
    public name: string,
    archetype: ('Mage' | 'Necromancer' | 'Warrior' | 'Ranger') = 'Mage',
    race: ('Orc' | 'Elf' | 'Halfling' | 'Dwarf') = 'Elf',
  ) {
    this._race = race;
    this._archetype = archetype;
    this._dexterity = getRandomInt(1, 10);
    this._raceInstance = new races[race](name, this._dexterity);
    this._archetypeInstance = new archetypes[archetype](name);
    // https://stackoverflow.com/questions/34655616/create-an-instance-of-a-class-in-es6-with-a-dynamic-name
    this._maxLifePoints = this._raceInstance.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { 
      type_: this._archetypeInstance.energyType,
      amount: getRandomInt(1, 10),
    } as Energy;
  }

  get race():IRace { return this._raceInstance; }
  get archetype():string { return this._archetype; }
  get maxLifePoints():number { return this._maxLifePoints; }
  get lifePoints():number { return this._lifePoints; }
  get strength():number { return this._strength; }
  get defense():number { return this._defense; }
  get dexterity():number { return this._dexterity; }
  get energy():Energy { return this._energy; }
  // get energy():Energy {
  //   return {
  //     type_: this._energy.type_,
  //     amount: this._energy.amount,
  //   };
  // }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) { 
      this._lifePoints -= damage; 
    } else {
      this._lifePoints -= 1;
    }
    if (this.lifePoints < 0) { this._lifePoints = -1; }
    console.log(
      `${this.name} takes ${damage} damage, has ${this.lifePoints} lifepoints`,
    );
    return this.lifePoints;
  }

  attack(target: Fighter | SimpleFighter): void {
    const damage = this.strength;
    target.receiveDamage(damage);
  }

  // levelUp(): void {
  //   this._maxLifePoints += getRandomInt(1, 10);
  //   if (this.maxLifePoints > this._raceInstance.maxLifePoints) { 
  //     this._maxLifePoints = this._raceInstance.maxLifePoints;
  //   }
  //   this._lifePoints = this.maxLifePoints;
  //   this._strength += getRandomInt(1, 10);
  //   this._defense += getRandomInt(1, 10);
  //   this._dexterity += getRandomInt(1, 10);
  //   this._energy.amount = 10;
  // }

  levelUp(): void {
    const statsToIncrement = [
      this._maxLifePoints,
      this._strength,
      this._defense,
      this._dexterity,
    ];
    statsToIncrement.forEach((stat) => {
      stat += getRandomInt(1, 10);
    });
  }

  special?(enemy: Fighter): void;

  get energyType():string {
    const { energyType, name } = this._archetypeInstance;
    return `O personagem ${name} tem energia do tipo: ${energyType}`;
  }
}
