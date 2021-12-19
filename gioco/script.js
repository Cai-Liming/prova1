function startGame() {
    myGameArea.start();
    myGameArea.draw(redSquare);
    animatedObject.loadImages();
}
function updateGameArea() {
    myGameArea.draw(redSquare);
  }
var redSquare = {
    width: 20,
    height: 20,
    x: 10,
    y: 120,
    color: "red" ,
    speedY:0,
    speedX:0,
  }; 
  
var myGameArea = {  
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea

    
    },
    drawGameObject: function(gameObject) {
      this.context.drawImage(
        gameObject.image,
        gameObject.x,
        gameObject.y,
        gameObject.width,
        gameObject.height
      );
    },
  

    draw: function (component) {
     
        this.context.fillStyle = component.color;
        this.context.fillRect(component.x, component.y, component.width, component.height);
      },
     
      clear: function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
      },
    move: function(){
         redSquare.y = redSquare.y + redSquare.speedY;
         redSquare.x = redSquare.x + redSquare.speedX;
      },
      
}
function updateGameArea() {
  myGameArea.clear();
  myGameArea.move();
  myGameArea.draw(redSquare);
  myGameArea.drawGameObject(animatedObject);
}

function moveup() {
    redSquare.speedY -= 10;
  }
  
  function movedown() {
    redSquare.speedY += 10;
  }
  
  function moveleft() {
    redSquare.speedX -= 10;
  }
  
  function moveright() {
    redSquare.speedX += 10;
  }
  function clearmove() {
    redSquare.speedX = 0; 
    redSquare.speedY = 0; 
}
var animatedObject = {
  speedX: 0,
  speedY: 0,
  width: 60,
  height: 60,
  x: 10,
  y: 120,

loadImages: function() {
    this.image = new Image(this.width, this.height);
    this.image.src = "https://i.ibb.co/M7WMMSF/Run-000.png"; //Qui metti una tua immagine
  }
};




     