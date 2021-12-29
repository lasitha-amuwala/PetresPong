function Ball(){
  this.pos = createVector(width/2, height/2);
  this.radius = 50;
  this.maxSpeed = createVector(20,15);
  this.acc = p5.Vector.random2D();
}