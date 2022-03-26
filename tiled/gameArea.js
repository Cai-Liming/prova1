import Levels from "./Levels.js";
import Level1 from "./livello1.js";
export default class GameArea {
  constructor() {
    this.level = new Levels(
      20,
      20,
      32,
      32,
      Level1.water,
      Level1.livello,
      Level1.ponte,   
      Level1.blocco,
      Level1.terraMare,
      Level1.barca,
      Level1.vasi,
      "title.png",
      512,
      512
    );

    this.canvas = document.getElementById("gameArea");
    this.canvas.width = 640;
    this.canvas.height = 640;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(this.updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea
  }

  clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  updateGameArea = () => {
    this.clear();
    this.level.draw(this.context);
  };
}