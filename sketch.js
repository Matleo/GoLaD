
var myWidth = 900;
var myHeigth = 450;
var resolution = 40;
var cell;
var cell_bw;


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

		//TODO: not working
		strokeWeight(4);
		if(this.changed==-1){
			stroke("red");
		}else if(this.changed==1){
			stroke("#8ff959"); //green
		}else{
			stroke("black");
		}


		if(this.alive == true){
		image(cell,this.position_x, this.position_y, this.resolution, this.resolution);
		}else{
		image(cell_bw,this.position_x, this.position_y, this.resolution, this.resolution);
		}
	}

	maybeActivate(x,y){
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
	cell = loadImage("pictures/pilz_lebendig.jpg");
	cell_bw = loadImage("pictures/pilz_tot.jpg");
}

function setup() {
  var canvas = createCanvas(myWidth, myHeigth);
  canvas.parent('canvas_container');

}

function draw() {

	strokeWeight(4);
	stroke("red");
	rect(0,0,width-10,height-5);
	translate(6,3);
	for(i = 0; i<rows;i++){
    for(j = 0; j<cols;j++){
      cells[i][j].show();
		}
  }
}




function mouseClicked() {
  activate();
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

function activate(){
	for(i = 0; i<rows; i++){
	  for(j=0; j<cols; j++){
		  cells[i][j].maybeActivate(mouseX,mouseY);
	  }
  }
}

function setAlive(boolean){
	for(i=0;i<rows;i++){
		for(j=0;j<cols;j++){
			if(boolean != null){
				cells[i][j].alive = boolean;
			}else{
				var alive_percentage = $("#alive_percentage").val() / 100;

					if(Math.random() <=alive_percentage){
							cells[i][j].alive = true;
					}else{
							cells[i][j].alive = false;
					}
			}
		}
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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
		var newTime = new Date().getTime();
    if ((newTime - start) > milliseconds){
      break;
    }
  }
}
