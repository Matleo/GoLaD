var myWidth = 960;
var myHeigth = 640;
var alive = [[0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]];
var changed = [[0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]];

function setup() {
  var canvas = createCanvas(myWidth, myHeigth);
  canvas.parent('canvas_container');
  rect(0,0,myWidth-1,myHeigth-1);
  background("#f7eccf");
  textSize(32);
  text("Game of Life and Death 2018",myWidth/4,myHeigth/8);

  textSize(14);
  var spielregeln ="Spielregeln: Sie sehen eine Ansammlung von 5x5 Zellen vor sich. Jede dieser Zelle kann entweder lebendig(blau) oder tot(weiß) sein. ";
  var spielregeln2 = "Durch anklicken einer Zelle können sie den aktuellen Status ändern. "
  var spielregeln3 = "Mit dem betätigen des Enter-Buttons, wird ein Zyklus der folgenden Regeln durchlaufen: ";
  var spielregeln4 = "1. Jede lebende Zelle, welche nicht 2 oder 3 lebende Nachbarzellen hat, stirbt";
  var spielregeln5 = "2. Jede tote Zelle, die genau 3 lebende Nachbarzellen hat, wird wiederbelebt";
  var spielregeln6 = "(Eine Zelle am Rand des Spielfeldes hat dabei ihre Nachbarzellen auch auf der gegenüberliegenden Seite)"
  text(spielregeln,myWidth/15, 24*myHeigth/30);
  text(spielregeln2,myWidth/15, 25*myHeigth/30);
  text(spielregeln3,myWidth/15, 26*myHeigth/30);
  text(spielregeln4,myWidth/14, 27*myHeigth/30);
  text(spielregeln5,myWidth/14, 28*myHeigth/30);
  text(spielregeln6,myWidth/14, 29*myHeigth/30);
  text("Autor: Matthias Leopold",myWidth*0.82, 59*myHeigth/60)
}

function draw() {
  drawField();
}

function drawField(){
  var curve = 5;
  noSmooth();
  for(i = 0; i<5;i++){
    for(j=0;j<5;j++){
      if(alive[i][j]==0){
        fill(255);
      }else{
        fill("#d1eeff");
      }
      if(changed[i][j]==-1){
        stroke("red");
      }else if(changed[i][j]==1){
        stroke("green");
      }else{
        stroke("black");
      }
      rect(myWidth/3 + i*myWidth/15, myHeigth/5 + j*myHeigth/15, myWidth/15, myHeigth/15, curve);
      fill(0);
      textSize(14);
      text("("+i+","+j+")",myWidth/3 + i*myWidth/15 + myWidth/40, myHeigth/5 + j*myHeigth/15 + myWidth/30);
    }
  }
}

function mouseClicked() {
  killOrRevive();
}

function keyPressed() {
  if(keyCode == ENTER){
    startSimulation();
  }
}

function killOrRevive(){
  var xDrinne = mouseX>=myWidth/3 && mouseX<myWidth/3 + 5*myWidth/15;
  var yDrinne = mouseY>=myHeigth/5 && mouseY<myHeigth/5 + 5*myHeigth/15;

  if(xDrinne && yDrinne){
    var i = Math.floor((mouseX - myWidth/3)/(myWidth/15));
    var j = Math.floor((mouseY - myHeigth/5)/(myHeigth/15));
    if(alive[i][j]==0){
      alive[i][j]=1;
    }else{
      alive[i][j]=0;
    }
  }
}

function startSimulation(){
  var new_alive = [[0,0,0,0,0],
              [0,0,0,0,0],
              [0,0,0,0,0],
              [0,0,0,0,0],
              [0,0,0,0,0]];
  for(k = 0; k<5; k++){
    for(l=0; l<5; l++){
      changed[k][l] = 0; //dirty..
      new_alive[k][l]= alive[k][l];
    }
  }
  for(k = 0; k<5; k++){
    for(l=0; l<5; l++){
      var neighboursAlive = countNeighbours(k,l);
      //alert(k+","+l+"hat "+neighboursAlive+" nachbarn")
      if(neighboursAlive<2 || neighboursAlive>3){
        new_alive[k][l]=0;
        if(alive[k][l] != new_alive[k][l]){
          changed[k][l] = -1;
        }
      }else if(neighboursAlive ==3){
        new_alive[k][l]=1;
        if(alive[k][l] != new_alive[k][l]){
          changed[k][l] = 1;
        }
      }
    }
  }
  alive = new_alive;
}

function countNeighbours(my_i,my_j){
  var count = 0;
  for(i = my_i-1; i<=my_i+1; i++){
    var clean_i;
    if(i<0){
      clean_i = 4;
    }else if(i>4){
      clean_i = 0;
    }else{
      clean_i = i;
    }

    for(j = my_j-1; j<=my_j+1;j++){
      var clean_j;
      if(j<0){
        clean_j = 4;
      }else if(i>4){
        clean_j = 0;
      }else{
        clean_j = j;
      }
      if(!(clean_i == my_i && clean_j == my_j)){
        if(alive[clean_i][clean_j]==1){
          count++;
        }
      }
    }
  }
  return(count);
}
