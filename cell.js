class Cell {
  constructor(i, j, resolution) {
    this.i = i;
    this.j = j;

    //initialize status random
    if (Math.random() <= 0.5) {
      this.alive = false;
    } else {
      this.alive = true;
    }

    //params for drawin:
    this.resolution = resolution; //equals to length and width of drawn rectangle
    this.position_x = this.i * this.resolution; //starting position x
    this.position_y = this.j * this.resolution; //starting position y
  }

  //depending on alive status, draw according image
  show() {
    if (this.alive == true) {
      image(shroom_pic, this.position_x, this.position_y, this.resolution, this.resolution);
    } else {
      image(shroom_pic_bw, this.position_x, this.position_y, this.resolution, this.resolution);
    }
  }

  //flip status
  switchStatus(x, y) {
    this.alive = !this.alive;
  }
}
