//canvas resolution:
var myWidth = 900;
var myHeigth = 450;

var resolution = 40; //will be used to calculate size of cells, relative to canvas
var shroom_pic; //picture of living mushroom
var shroom_pic_bw; //dead mushroom in black_white


//initialize cells:
var rows = Math.floor(myWidth / resolution);
var cols = Math.floor(myHeigth / resolution);
var cells = new Array(rows);
for (p = 0; p < rows; p++) {
  cells[p] = new Array(cols);
  for (q = 0; q < cols; q++) {
    cells[p][q] = new Cell(p, q, resolution); //indice p and q will be used to calculate a cells position.
  }
}

//is called before setup, to make sure pictures are loaded already
function preload() {
  shroom_pic = loadImage("pictures/pilz_lebendig.jpg");
  shroom_pic_bw = loadImage("pictures/pilz_tot.jpg");
}

//this function is called once when setting up
function setup() {
  var canvas = createCanvas(myWidth, myHeigth);
  canvas.parent('canvas_container'); //put canvas in its html div container

}

//is called every interval (by p5), executes the actual visual presentation
function draw() {

  //draw red box around canvas:
  strokeWeight(4);
  stroke("red");
  rect(0, 0, width - 10, height - 5);
  translate(6, 3);

  //show all cells
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      cells[i][j].show();
    }
  }
}



//switch status (kill/revive) clicked cell
function mouseClicked() {
  var clicked_i = Math.floor(mouseX / resolution); //since a cells position_x is calculated as i * resolution -> i = position_x / resolution.
  var clicked_j = Math.floor(mouseY / resolution); //Same for j.

  cells[clicked_i][clicked_j].switchStatus(mouseX, mouseY);
}


function keyPressed() {
  if (keyCode == ENTER) {
    startSimulation();
  }
}

//run one cycle of live (checking the games rules and adjusting cells statuses)
function startSimulation() {
  var cellsToChange = [] //cells of which to switch status will be stored here. Switching status will be executed after the loop

  //loop searching for cells to change:
  for (k = 0; k < rows; k++) {
    for (l = 0; l < cols; l++) {
      var neighboursAlive = countNeighbours(k, l); //count neighbours that are alive

      //kill
      if (neighboursAlive < 2 || neighboursAlive > 3) {
        //only kill if alive
        if (cells[k][l].alive == true) {
          cellsToChange.push({
            cell: cells[k][l],
            value: false
          });
        }
      }
      //revive
      else if (neighboursAlive == 3) {
        //only revive if dead
        if (cells[k][l].alive == false) {
          cellsToChange.push({
            cell: cells[k][l],
            value: true
          });
        }
      }
    }
  }

  //kill or revive now (to not influence neighbour counting)
  for (k = 0; k < cellsToChange.length; k++) {
    var cell = cellsToChange[k].cell;
    var value = cellsToChange[k].value;
    cell.alive = value;
  }
}


//bound to thre buttons under canvas. This will initialize the cells, depending on what button has been pressed.
//parameter status: if null := initialize random with % alive from html input.;
// 									if true := initiialize with all alive
//									if false:= initialize with all dead
function setAlive(status) {
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      if (boolean != null) { //if nut null, kill/revive all
        cells[i][j].alive = status;
      } else {
        var alive_percentage = $("#alive_percentage").val() / 100; //fetch input from html input

        if (Math.random() <= alive_percentage) {
          cells[i][j].alive = true;
        } else {
          cells[i][j].alive = false;
        }
      }
    }
  }
}

//counting neighbours alive with respect to overlapping borders
function countNeighbours(my_i, my_j) {
  var count = 0;
  //check around my_i
  for (i = my_i - 1; i <= my_i + 1; i++) {
    var clean_i;
    //depending if surrounded index overlaps the border, maybe set new i on other side
    if (i < 0) { //if overlapping at top
      clean_i = rows - 1;
    } else if (i > rows - 1) { //if overlapping at bottom
      clean_i = 0;
    } else { //if in boundaries
      clean_i = i;
    }

    //for around my_j
    for (j = my_j - 1; j <= my_j + 1; j++) {
      var clean_j;
      //set clean_j with respect to borders
      if (j < 0) {
        clean_j = cols - 1;
      } else if (j > cols - 1) {
        clean_j = 0;
      } else {
        clean_j = j;
      }

      if (!(clean_i == my_i && clean_j == my_j)) { //if not myself
        if (cells[clean_i][clean_j].alive == true) { //if cell is alive, increase count
          count++;
        }
      }

    }
  }
  return (count);
}
