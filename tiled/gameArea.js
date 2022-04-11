import Levels from "./Levels.js";
import Level1 from "./livello1.js";
import AnimatedObject from "./ AnimatedObject.js";
import NinjaSprites from "./NinjaSprites.js";
export default class GameArea {
  constructor() {
    this.ninja = new AnimatedObject(NinjaSprites.running, 60,60,10,120);
    this.level = new Levels(
      20,
      20,
      32,
      32,
      Level1.water,
      Level1.livello,
      Level1.blocco,
      Level1.ponte,      
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

    document.addEventListener("keydown", this.move);
    document.addEventListener("keyup", this.clearmove);
  }
  
  clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  drawAnimatedObject(gameObject) {
    this.context.drawImage(
      gameObject.image,
      gameObject.x,
      gameObject.y,
      gameObject.width,
      gameObject.height
    );
  }
  clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  updateGameArea = () => {
    this.clear();
    this.level.draw(this.context);
    this.obstaclesVector = this.level.obstaclesVector;
    this.ninja.update(this.obstaclesVector);
    this.ninja.draw(this.context);
    
  };

  move = e => {
    switch (e.key) {
      case "w":
        this.ninja.speedY = -2;
        break;
      case "s":
        this.ninja.speedY = 2;
        break;
      case "a":
        this.ninja.speedX = -2;
        break;
      case "d":
        this.ninja.speedX = 2;
        break;
    }
  };

  clearmove = () => {
    this.ninja.speedX = 0;
    this.ninja.speedY = 0;
  };
}