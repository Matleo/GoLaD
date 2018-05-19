
var myWidth = 900;
var myHeigth = 450;
var resolution = 40;


class Cell {
	constructor(i,j,resolution){
		this.i = i;
		this.j = j;

		
		if(Math.random() <=0.5){
			this.alive = false;
		}else{
			this.alive = true;
		}
		this.changed = false;
		this.neighboursAlive = 0;

		//params for drawin:


		this.resolution = resolution;
		this.position_x = this.i * this.resolution;
		this.position_y = this.j * this.resolution;
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

		rect(this.position_x, this.position_y, this.resolution, this.resolution, 4);
		fill(0);
		textSize(9);
		text("("+i+","+j+")", this.position_x + this.resolution/4, this.position_y + this.resolution/2);
	}

	maybeClicked(x,y){
		var xDrinne = x>=this.position_x && x<this.position_x + this.resolution;
		var yDrinne = y>=this.position_y && y<this.position_y + this.resolution;

		if(xDrinne && yDrinne){
			this.alive = !this.alive; //flip status
		}
	}
}

//initialize cells:
var rows = Math.floor(myWidth / resolution);
var cols = Math.floor(myHeigth / resolution);
var cells = new Array(rows);
for(p = 0; p<rows;p++){
	cells[p] = new Array(cols);
	for(q = 0; q<cols;q++){
		cells[p][q] = new Cell(p,q,resolution);
	}
}


function preload()
{

}

function setup() {
  var canvas = createCanvas(myWidth, myHeigth);
  canvas.parent('canvas_container');

}

function draw() {
  for(i = 0; i<rows;i++){
    for(j = 0; j<cols;j++){
      cells[i][j].show();
	}
  }

}



function drawPetals(ellipseWide,ellipseShort,shift){
  //Blätter malen
  for(i = 0; i<rows;i++){
    for(j=0;j<col;j++){

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
  for(i = 0; i<rows; i++){
	  for(j=0; j<cols; j++){
			//TODO: calculate i and j and just send click to that. And implement mouseDragged
		  cells[i][j].maybeClicked(mouseX,mouseY);
	  }
  }
}

function keyPressed() {
  if(keyCode == ENTER){
    startSimulation();
  }
}


function startSimulation(){
  var cellsToChange = []
  for(k = 0; k<rows; k++){
    for(l=0; l<cols; l++){
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
      clean_i = rows-1;
    }else if(i>rows-1){
      clean_i = 0;
    }else{
      clean_i = i;
    }

    for(j = my_j-1; j<=my_j+1;j++){
      var clean_j;
      if(j<0){
        clean_j = cols-1;
      }else if(j>cols-1){
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
