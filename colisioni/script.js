function startGame() { 
    crateObject.loadImages();
    bushObject.loadImages();
    animatedObject.loadImages();
    myGameArea.start();
    //myGameArea.draw(redSquare);

}

var myGameArea = {  
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea

    
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

      drawGameObject: function(gameObject) {
        this.context.drawImage(
          gameObject.image,
          gameObject.x,
          gameObject.y,
          gameObject.width,
          gameObject.height
        );
      },
      
    
    
      
}

var animatedObject = {
  speedX: 0,
  speedY: 0,
  width: 60,
  height: 60,
  x: 10,
  y: 120,
  imageList: [], //Vettore che conterrà tutte le immagini caricate
  contaFrame: 0, //Tiene conto di quanti frame sono passati
  actualFrame: 0, //Specifica quale frame disegnare

  update: function() {
    this.tryY = this.y + this.speedY;
    this.tryX = this.x + this.speedX;

    
        //Prima di spostarmi realmente verifico che non ci siano collisioni
        collision = false;
        if (collision == false) {
          collision = this.crashWith(bushObject);
          console.log(collision);
        }
        if (collision == false) {
          collision = this.crashWith(crateObject);
        }
    
        if (!collision) {
          this.x = this.tryX;
          this.y = this.tryY;
        }
    this.contaFrame++;
    if (this.contaFrame == 3) {
      this.contaFrame = 0;
      this.actualFrame = (1 + this.actualFrame) % this.imageList.length;
      this.image = this.imageList[this.actualFrame];
    }
    
  },
  loadImages: function() {
     for (imgPath of running) {
      var img = new Image(this.width, this.height);
      img.src = imgPath;
      this.imageList.push(img);
      //console.log(img);
    }
    this.image = this.imageList[this.actualFrame];
  },
  crashWith: function(otherobj) {
    var myleft = this.tryX;
    var myright = this.tryX + this.width -45;
    var mytop = this.tryY;
    var mybottom = this.tryY + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;

    //NON HO COLLISIONI SE: Un oggetto è sopra oppure sotto oppure a destra oppure a sinistra dell’altro
    if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      return false;
    }
    else //HO COLLISIONI MA PER ORA NON FACCIO NIENTE
    {
      return true;
    }
  }
};

var bushObject = {
    width: 100,
    height: 50,
    x: 100,
    y: 270 - 50,
    tryX: 0,
    tryY: 0,
  
    loadImages: function() {
      this.image = new Image(this.width, this.height);
      this.image.src = "https://i.ibb.co/CPdHYdB/Bush-1.png";
    }
  };
  var crateObject = {
    width: 100,
    height: 100,
    x: 200,
    y: 270 - 100,
  
    loadImages: function() {
      this.image = new Image(this.width, this.height);
      this.image.src = "https://i.ibb.co/GMgf32L/Crate.png";
    }
  };



var redSquare = {
  width: 20,
  height: 20,
  x: 10,
  y: 120,
  color: "red" ,
  speedY:0,
  speedX:0,
}; 

function clearmove() {
  animatedObject.speedX = 0; 
  animatedObject.speedY = 0; 
}
function moveup() {
   animatedObject.speedY -= 10;
  }
  
  function movedown() {
    animatedObject.speedY += 10;
  }
  
  function moveleft() {
    animatedObject.speedX -= 10;
  }
  
  function moveright() {
    animatedObject.speedX += 10;
  }

 document.addEventListener('keydown', function(event) {
    //left
    if(event.keyCode == 37) {
        animatedObject.x -= 1;
    }
    //top
    else if(event.keyCode == 38) {
        animatedObject.y -= 1;
    }
    //right
    else if(event.keyCode == 39) {
        animatedObject.x += 1;
    }
    //bottom
    else if(event.keyCode == 40) {
        animatedObject.y += 1;
    }
});
  
  

function updateGameArea() {
  myGameArea.clear();
  myGameArea.move();
  myGameArea.drawGameObject(animatedObject);
  myGameArea.drawGameObject(bushObject);
  myGameArea.drawGameObject(crateObject);
  animatedObject.update();
  //myGameArea.crashWith();
};




     