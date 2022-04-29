const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');
myCanvas.width = 800;
myCanvas.height = 600;
myCanvas.setAttribute('style','background-color:grey');

//a is minimun and b is the maximum
/*function roll(a,b){
  return Math.floor(Math.random()*(b - a))+ 1 + a
}*/
function roll(a,b){
  let stop = false
  let urMom = 0
  if(b < 1){
    while(!stop){
      urMom = (Math.floor(Math.random() * (b)) + 0.1)
      if (urMom>=a){
        stop = true
        return urMom
      }
    }
  }
  if(b >=1) {
    while(!stop){
      urMom = (Math.floor(Math.random() * (b)) + 1)
      if (urMom>=a){
        stop = true
        return urMom
      }
    }
  }
}




class Branch{
  constructor(x,y,w,l,a){
    this.startingX = x;
    this.startingY = y; 
    this.width = w;
    this.length = l;
    this.angle = a;
    this.calculateEndPoint()
    this.canGrow = this.length > 10
  }
  
  draw(ctx){
    ctx.beginPath()
    ctx.lineWidth = this.width;
    ctx.moveTo(this.startingX,this.startingY)
    ctx.lineTo(this.endX,this.endY)
    ctx.stroke()
    ctx.closePath()
    
  }
  calculateEndPoint(){
    const radians = this.angle * (Math.PI/180)
    this.endX = this.startingX + (this.length * Math.cos(radians))
    this.endY = this.startingY - (this.length * Math.sin(radians))
    
  }
  grow(){
    if(this.canGrow){
      let rBranch = new Branch (this.endX,this.endY,this.width,this.length * .67,this.angle - 45)
      let lBranch = new Branch (this.endX,this.endY,this.width,this.length * .67,this.angle + 45)
      return [rBranch, lBranch];
    }else{
     /* let  rBranch = new Branch(this.endX,this.endY,this.width,this.length * .067,this.angle - 45)
      let  lBranch = new Branch(this.endX,this.endY,this.width,this.length * .067,this.angle + 45)*/
      return[];
    }
  }
}
/*for(let i = 0; i < 10; i++) {
 
 // ctx.fillStyle = `#${i + 4}${i + 2}${i - 6}`;
  //ctx.fillRect(i * 10,i * 10,10,10);
 
}
*/
let tree = []
const oneBranch = new Branch(100,400,5,200,90);
tree.push(oneBranch)
let treeCanGrow = true
let newGrowth = [];
while(treeCanGrow){
  tree.forEach(b=>{
  newGrowth =newGrowth.concat(b.grow())
  })
  tree = tree.concat(newGrowth)
}
if(newGrowth.lenth===0){
  treeCanGrow = false
}else{
  tree = tree.concat(newGrowth)
}



//draw tree
tree.forEach(b=>{
  b.draw(ctx)
})

class Leaf {
  constructor(sX,sY) {
    this.startX = sX
    this.startY = sY
    }
  draw(ctx){
    if(roll(0,5) === 1){
    ctx.fillStyle = 'red'
    ctx.fillRect(this.startX, this.startY, 9,9)  
    }
    ctx.fillStyle = 'green'
    ctx.fillRect(this.startX, this,startY, 10,10)
   } 
  grow(){
    return[];
    }
}
// const oneBranch = new Branch(branchx,branchY,branchWidth,branchLength,branchAngle)
// tree.push(oneBranch)

//let treeCanGrow = true