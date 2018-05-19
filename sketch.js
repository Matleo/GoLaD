var numberCells = 6;
var myWidth = 1024;
var myHeigth = 640;
var bg;


class Cell {
	constructor(i,j,canvas_width,canvas_height){
		this.i = i;
		this.j = j;

		this.alive = false;
		this.changed = 0;
		this.neighboursAlive = 0;

		//params for drawin:
		this.canvas_width = canvas_width;
		this.canvas_height = canvas_height;

		this.width = this.canvas_width/15;
		this.height = this.canvas_height/15;
		this.margin_left = this.canvas_width / 3.5;
		this.margin_top = this.canvas_height / 5;
		this.position_x = this.margin_left + this.i * this.width;
		this.position_y = this.margin_top + this.j * this.height;
	}

	show(){
		if(this.alive == true){
			fill("#ffd700");//gelb;
		}else{
			fill("#cd853f");//braun
		}

		if(this.changed==-1){
			stroke("red");
		}else if(this.changed==1){
			stroke("#8ff959"); //green
		}else{
			stroke("black");
		}

		rect(this.position_x, this.position_y, this.width, this.height, 4);
		fill(0);
		textSize(14);
		text("("+i+","+j+")", this.position_x + myWidth/40, this.position_y + myWidth/30);
	}

	maybeClicked(x,y){
		var xDrinne = x>=this.position_x && x<this.position_x + this.width;
		var yDrinne = y>=this.position_y && y<this.position_y + this.height;

		if(xDrinne && yDrinne){
			this.alive = !this.alive; //flip status
		}
	}
}

//initialize cells:
var cells = new Array(numberCells);
for(p = 0; p<numberCells;p++){
	cells[p] = new Array(numberCells);
	for(q = 0; q<numberCells;q++){
		cells[p][q] = new Cell(p,q,myWidth,myHeigth);
	}
}


function preload()
{
  bg = loadImage("pictures/DNA.jpg");
}

function setup() {
  var canvas = createCanvas(myWidth, myHeigth);
  canvas.parent('canvas_container');
  rect(0,0,myWidth-1,myHeigth-1);
  //background("#037f42");
  background(bg);


  //drawPetals(140,70,25);

  //Heading
  fill(255);
  textSize(36);
  text("Game of Life and Death 2018",myWidth/4,myHeigth/12);

  //Calculation Buttons
  fill(255);
  rect(myWidth*0.33,myHeigth*0.63,myWidth/3.5,myHeigth/12,20);
  fill(0);
  textSize(20);
  text("Lebenszyklus berechnen",myWidth*0.36,myHeigth*0.68);

  //Rules
  textSize(14);
  var spielregeln ="Spielregeln: Sie sehen eine Ansammlung von 6x6 Zellen vor sich. Jede dieser Zelle kann entweder lebendig(gelb) oder tot(braun) sein. ";
  var spielregeln2 = "Durch anklicken einer Zelle können sie den aktuellen Status ändern. "
  var spielregeln3 = "Mit dem betätigen des Enter-Buttons, wird ein Zyklus der folgenden Regeln durchlaufen: ";
  var spielregeln4 = "1. Jede lebende Zelle, welche nicht 2 oder 3 lebende Nachbarzellen hat, stirbt";
  var spielregeln5 = "2. Jede tote Zelle, die genau 3 lebende Nachbarzellen hat, wird wiederbelebt";
  var spielregeln6 = "(Eine Zelle am Rand des Spielfeldes hat dabei ihre Nachbarzellen auch auf der gegenüberliegenden Seite)"
	fill(255);
	rect(myWidth/15-20,23*myHeigth/30 -20,	13*myWidth/15,6*myHeigth/30+10);
	fill(0);
	text(spielregeln,myWidth/15, 23*myHeigth/30);
  text(spielregeln2,myWidth/15, 24*myHeigth/30);
  text(spielregeln3,myWidth/15, 25*myHeigth/30);
  text(spielregeln4,myWidth/14, 26*myHeigth/30);
  text(spielregeln5,myWidth/14, 27*myHeigth/30);
  text(spielregeln6,myWidth/14, 28*myHeigth/30);
  text("Autor: Matthias Leopold",myWidth*0.82, 59*myHeigth/60);
}

function draw() {
  for(i = 0; i<numberCells;i++){
    for(j = 0; j<numberCells;j++){
      cells[i][j].show();
	}
  }

}



function drawPetals(ellipseWide,ellipseShort,shift){
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
  for(i = 0; i<numberCells; i++){
	  for(j=0; j<numberCells; j++){
		  cells[i][j].maybeClicked(mouseX,mouseY);
	  }
  }

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


function startSimulation(){
  var cellsToChange = []
  for(k = 0; k<numberCells; k++){
    for(l=0; l<numberCells; l++){
      cells[k][l].changed = 0; //in the beginning of each cycle, reset changed attribute
	  var neighboursAlive = countNeighbours(k,l);
	  //alert("("+k+","+l+") hat " +neighboursAlive + " Nachbarn");
      if(neighboursAlive<2 || neighboursAlive>3){
        if(cells[k][l].alive != false){//if changed
          cells[k][l].changed = -1;
        }
		cellsToChange.push({cell:cells[k][l],value:false});//kill
      }else if(neighboursAlive ==3){
        if(cells[k][l].alive != true){//if changed
          cells[k][l].changed = true;
        }
		cellsToChange.push({cell:cells[k][l],value:true}); //revive
      }
    }
  }

  //kill or revive now (to not influence neighbour counting)
  for(k = 0; k<cellsToChange.length;k++){
	  var cell = cellsToChange[k].cell;
	  var value = cellsToChange[k].value;
	  cell.alive = value;
  }
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
        if(cells[clean_i][clean_j].alive==true){
          count++;
        }
      }

    }
  }
  return(count);
}
