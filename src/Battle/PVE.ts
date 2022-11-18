import Character from '../Character';
import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

type EnemyType = [(SimpleFighter | Fighter), ...(SimpleFighter | Fighter)[]];

export default class PVE extends Battle {
  constructor(
    public player: (Character | Fighter),
    public enemyGroup: EnemyType,
  ) {
    super(player);
  }

  private shouldStartNewTurn():boolean {
    const isPlayerAlive = this.player.lifePoints > 0;
    const areEnemiesAlive = this.enemyGroup
      .some((enemy) => enemy.lifePoints > 0);
    const shouldThereBeAnotherTurn = isPlayerAlive && areEnemiesAlive;
    return shouldThereBeAnotherTurn;
  }

  private handlePlayerTurn():void {
    let playerHasAction = true;
    this.enemyGroup.forEach(((enemy) => {
      if (enemy.lifePoints > 0 && playerHasAction) {
        this.player.attack(enemy); playerHasAction = false;
      }
    }));
  }

  fight(): number {
    while (this.shouldStartNewTurn()) {
      this.handlePlayerTurn();
      this.enemyGroup.forEach((enemy) => enemy.attack(this.player));
      console.log('--------- Turn Ends ----------');
      console.log(`${this.player.lifePoints > 0 ? 'PLAYER' : 'ENEMIES'} wins!`);
    }
    return this.player.lifePoints > 0 ? 1 : -1;
  }
}
