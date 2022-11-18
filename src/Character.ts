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

  get race():string {
    return this._race;
  }

  get archetype():string {
    return this._archetype;
  }

  get maxLifePoints():number {
    return this._maxLifePoints;
  }

  set maxLifePoints(payload: number) {
    this._maxLifePoints = payload;
  }

  get lifePoints():number {
    return this._lifePoints;
  }

  set lifePoints(payload: number) {
    this._lifePoints = payload;
  }

  get strength():number {
    return this._strength;
  }

  private set strength(payload: number) {
    this._strength = payload;
  }

  get defense():number {
    return this._defense;
  }

  private set defense(payload: number) {
    this._defense = payload;
  }
  
  get dexterity():number {
    return this._dexterity;
  }

  private set dexterity(payload: number) {
    this._dexterity = payload;
  }

  get energy():Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  // get energy():Energy {
  //   return this._energy;
  // }
  // pq esse getter não passa no teste

  // private set energy(payload: number) {
  //   this.energy = { type_: this._energy.type_, amount: payload };
  // }
  // pq esse setter está dando problema?

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) { this.lifePoints -= damage; }
    if (this.lifePoints < 0) { this.lifePoints = -1; }
    console.log(`${this.name} takes ${damage} damage,\
and has ${this.lifePoints} lifepoints left`);
    return this.lifePoints;
  }

  attack(target: Fighter | SimpleFighter): void {
    const damage = this.strength + 10;
    target.receiveDamage(damage);
  }

  levelUp(): void {
    // const statsToIncrement = [
    //   this.maxLifePoints,
    //   this.strength,
    //   this.defense,
    //   this.dexterity,
    // ];
    // como fazer isso num forEach?
    this.maxLifePoints += getRandomInt(1, 10);
    this.strength += getRandomInt(1, 10);
    this.defense += getRandomInt(1, 10);
    this.dexterity += getRandomInt(1, 10);
    this._energy.amount = 10;
  }

  special?(enemy: Fighter): void;

  get energyType():string {
    const { energyType, name } = this._archetypeInstance;
    return `O personagem ${name} tem energia do tipo: ${energyType}`;
  }
}

// const newChar = new Character('Murlok', 'Mage', 'Elf');
// console.log(newChar);
// newChar.levelUp();
// console.log(newChar.energy);