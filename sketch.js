var numberCells = 6;
var myWidth = 960;
var myHeigth = 640;

//initialize state arrays with 0s:
var alive = new Array(numberCells);
var changed = new Array(numberCells);
for(n=0; n<numberCells;n++){
  alive[n] = new Array(numberCells);
  changed[n] = new Array(numberCells);
  for(o=0; o<numberCells;o++){
    alive[n][o] = 0;
    changed[n][o] = 0;
  }
}

function setup() {
  var canvas = createCanvas(myWidth, myHeigth);
  canvas.parent('canvas_container');
  rect(0,0,myWidth-1,myHeigth-1);
  background("#037f42");


  drawLeafs(140,70,25);

  fill(255);
  textSize(36);
  text("Game of Life and Death 2018",myWidth/4,myHeigth/12);


  fill(255);
  rect(myWidth*0.33,myHeigth*0.63,myWidth/3.5,myHeigth/12,20);
  fill(0);
  textSize(20);
  text("Lebenszyklus berechnen",myWidth*0.36,myHeigth*0.68);

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
  var curve = 4;
  noSmooth();
  for(i = 0; i<numberCells;i++){
    for(j=0;j<numberCells;j++){
      if(alive[i][j]==0){
        fill("#cd853f");//braun
      }else{
        fill("#ffd700");//gelb
      }
      if(changed[i][j]==-1){
        stroke("red");
      }else if(changed[i][j]==1){
        stroke("#8ff959");
      }else{
        stroke("black");
      }
      rect(myWidth/3.5 + i*myWidth/15, myHeigth/5 + j*myHeigth/15, myWidth/15, myHeigth/15, curve);
      fill(0);
      textSize(14);
      text("("+i+","+j+")",myWidth/3.5 + i*myWidth/15 + myWidth/40, myHeigth/5 + j*myHeigth/15 + myWidth/30);

    }
  }
}

function drawLeafs(ellipseWide,ellipseShort,shift){
  //Blätter malen
  for(i = 0; i<numberCells;i++){
    for(j=0;j<numberCells;j++){

      //links obere Ecke
      if(i==0 && j==0){
        fill("red");
        translate(myWidth/3.5+ i*myWidth/15+shift*1.5, myHeigth/5 + (j+1)*myHeigth/15 + shift);
        rotate(-PI / 3.0);
        ellipse(40,-70,ellipseShort,ellipseWide);
        rotate(PI / 3.0);
        translate(-(myWidth/3.5+ i*myWidth/15+shift*1.5), -(myHeigth/5 + (j+1)*myHeigth/15 + shift))
      }
      //obere Seite
      if(j==0){
        ellipse(myWidth/3.5+ i*myWidth/15+shift*1.5, myHeigth/5 - shift,ellipseShort,ellipseWide);
      }
      //rechts obere Ecke
      if(i==numberCells-1 && j==0){
        translate(myWidth/3.5+ i*myWidth/15+shift*1.5, myHeigth/5 + (j+1)*myHeigth/15 + shift);
        rotate(PI / 3.0);
        ellipse(-40,-60,ellipseShort,ellipseWide);
        rotate(-PI / 3.0);
        translate(-(myWidth/3.5+ i*myWidth/15+shift*1.5), -(myHeigth/5 + (j+1)*myHeigth/15 + shift))
      }
      //rechte Seite
      if(i==numberCells-1){
        ellipse(myWidth/3.5+ (i+1)*myWidth/15+shift, myHeigth/5 + j*myHeigth/15+shift,ellipseWide,ellipseShort);
      }
      //rechts untere Ecke
      if(i==numberCells-1 && j==numberCells-1){
        translate(myWidth/3.5+ i*myWidth/15+shift*1.5, myHeigth/5 + (j+1)*myHeigth/15 + shift);
        rotate(-PI / 3.0);
        ellipse(35,20,ellipseShort,ellipseWide);
        rotate(PI / 3.0);
        translate(-(myWidth/3.5+ i*myWidth/15+shift*1.5), -(myHeigth/5 + (j+1)*myHeigth/15 + shift))
      }
      //untere Seite
      if(j==numberCells-1){
        ellipse(myWidth/3.5+ i*myWidth/15+shift*1.5, myHeigth/5 + (j+1)*myHeigth/15 + shift,ellipseShort,ellipseWide);
      }
      //links untere Ecke
      if(i==0 && j==numberCells-1){
        translate(myWidth/3.5+ i*myWidth/15+shift*1.5, myHeigth/5 + (j+1)*myHeigth/15 + shift);
        rotate(PI / 3.0);
        ellipse(-30,30,ellipseShort,ellipseWide);
        rotate(-PI / 3.0);
        translate(-(myWidth/3.5+ i*myWidth/15+shift*1.5), -(myHeigth/5 + (j+1)*myHeigth/15 + shift))
      }
      //linke Seite
      if(i==0){
        ellipse(myWidth/3.5-shift, myHeigth/5 + j*myHeigth/15+shift,ellipseWide,ellipseShort);
      }

    }
  }
}

function mouseClicked() {
  killOrRevive();

  //Button
  var xDrinne = mouseX>=myWidth*0.33 && mouseX < myWidth*0.33+ myWidth/3.5;
  var yDrinne = mouseY>=myHeigth*0.63 && mouseY < myHeigth*0.63 + myHeigth/12;
  if(xDrinne && yDrinne){
    startSimulation();
  }
}

function keyPressed() {
  if(keyCode == ENTER){
    startSimulation();
  }
}

function killOrRevive(){
  var xDrinne = mouseX>=myWidth/3.5 && mouseX<myWidth/3 + numberCells*myWidth/15;
  var yDrinne = mouseY>=myHeigth/5 && mouseY<myHeigth/5 + numberCells*myHeigth/15;

  if(xDrinne && yDrinne){
    var i = Math.floor((mouseX - myWidth/3.5)/(myWidth/15));
    var j = Math.floor((mouseY - myHeigth/5)/(myHeigth/15));
    if(alive[i][j]==0){
      alive[i][j]=1;
    }else{
      alive[i][j]=0;
    }
  }
}

function startSimulation(){
  var new_alive = new Array(numberCells);
  for(k = 0; k<numberCells; k++){
    new_alive[k] = new Array(numberCells);
    for(l=0; l<numberCells; l++){
      changed[k][l] = 0; //dirty..
      new_alive[k][l]= alive[k][l];
    }
  }
  for(k = 0; k<numberCells; k++){
    for(l=0; l<numberCells; l++){
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
      clean_i = numberCells-1;
    }else if(i>numberCells-1){
      clean_i = 0;
    }else{
      clean_i = i;
    }

    for(j = my_j-1; j<=my_j+1;j++){
      var clean_j;
      if(j<0){
        clean_j = numberCells-1;
      }else if(j>numberCells-1){
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
