// let img;
let video;
let detector;
let detection = []

function preload() {
  img = loadImage('images/bird.jpg');
  detector = ml5.objectDetector('cocossd')
}

function gotDetections(error, results){
  if(error){
    console.log(error)
  }
  detection = results
  console.log(results)
  detector.detect(video, gotDetections)
}

function setup() {
  createCanvas(640,480)
  video = createCapture(VIDEO)
  video.size(640, 480)
  video.hide()
  detector.detect(video, gotDetections)
}

function draw() {
  image(video, 0, 0)

  for(let i = 0; i < detection.length; i++) {
    let object = detection[i]
    //Dessine les boxs
    stroke(0,255,0)
    strokeWeight(4)
    noFill()
    rect(object.x, object.y, object.width, object.height)
    //Labels
    noStroke()
    fill(255)
    textSize(24)
    text(object.label, object.x+10, object.y+24)
  }
}