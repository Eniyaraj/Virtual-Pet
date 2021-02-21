var database, dog, dog1, dog2;
var position, feed, add, foodObject, Feedtime, lastFed;

function preload(){
  dogImg1 = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodObject=new Food()
  dog = createSprite(650,250,10,10);
  dog.addImage(dogImg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DRAGO");
  feed.position(500,15);
  feed.mousePressed(FeedDog);
  add = createButton("ADD FOOD");
  add.position(400,15);
  add.mousePressed(AddFood);
} 

function draw(){
 background(46,139,87);
 foodObject.display()
  
 fill(255,255,254);
 textSize(15);
 if(lastFed >= 12){
   text("Last Feed : " + lastFed%12 + " PM", 150, 30);
 } else if (lastFed == 0){
   text("Last Feed : 12 AM", 150, 30);
 } else{
   text("Last Feed : "+ lastFed + " AM", 150, 30);
 }

 drawSprites();
}

function readPosition(data){
  position = data.val();
  foodObject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function AddFood(){
position++
database.ref('/').update({
  Food:position
}
)}

function FeedDog(){
   dog.addImage(dogImg2);
   foodObject.updateFoodStock(foodObject.getFoodStock()-1);
   database.ref('/').update({
   Food:foodObject.getFoodStock(),
   FeedTime:hour ()
 })

}