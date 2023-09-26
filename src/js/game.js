export default class Game {
  constructor(board, character) {
    this.board = board;
    this.character = character;
    this.cells = [];
    this.cellsClick = [];
  }

  init() {
    this.redrawBoard();
    setInterval(() => {
      this.generate();
    }, 1000);
    Game.addEventClick();
  }

  redrawBoard() {
    const board = this.board.createBoard();
    const container = document.querySelector('.container');
    container.append(board);
    document.querySelectorAll('.cell').forEach((el) => {
      this.cells.push(el);
    });
  }

  generate() {
    const position = Math.floor(Math.random() * 16);
    if (position === this.position) {
      this.generate();
      return;
    }
    this.deletedCharacter();
    this.position = position;
    this.activeCharacter();
  }

  activeCharacter() {
    this.activeChar = this.character.createCharacter();
    const cell = this.cells[this.position];
    cell.append(this.activeChar);
  }

  deletedCharacter() {
    if (this.activeChar) {
      const cell = this.cells[this.position];
      cell.firstChild.remove();
    }
  }

  static addEventClick() {
    let count = 0;
    let counter = 0;
    const player = document.querySelector('.player');
    const goblin = document.querySelector('.goblin');
    document.addEventListener('click', (event) => {
      const index = event.target;
      const char = document.querySelector('.char');
      if (char === index) {
        char.classList.add('showCursor');
        char.classList.remove('char');
        count += 1;
      }
      if (char !== index) {
        counter += 1;
        if (counter > 5) {
          alert('Вы проиграли');
          count = 0;
          counter = 0;
        }
      }
      player.innerHTML = `<div class="player">Игрок: ${count} </div>`;
      goblin.innerHTML = `<div class="goblin">Гоблин: ${counter} </div>`;
    });
  }
}
