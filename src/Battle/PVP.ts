import Character from '../Character';
import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(
    public player: (Character | Fighter),
    public enemy: (Character | Fighter),
  ) {
    super(player);
  }

  fight(): number {
    while (this.player.lifePoints > 0 && this.enemy.lifePoints > 0) {
      this.player.attack(this.enemy);
      // if (this.enemy.lifePoints < 0) { return 1; }
      this.enemy.attack(this.player);
      // if (this.enemy.lifePoints < 0) { return -1; }
      // console.log(this.player.lifePoints);
      console.log('--------- Turn Ends ----------');
      console.log(`${this.player.lifePoints > 0 ? 'PLAYER' : 'ENEMY'} wins!`);
    }
    return this.player.lifePoints > 0 ? 1 : -1;
  }
}
