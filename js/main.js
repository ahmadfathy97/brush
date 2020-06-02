var can    = document.querySelector('canvas'),
    colors = document.querySelector('#colors'),
    lcolors = document.querySelector('#forcolors'),
    width  = document.querySelector('#width'),
    rand   = document.querySelector('#rand'),
    line   = document.querySelector('#line'),
    rect   = document.querySelector('#rect'),
    free   = document.querySelector('#free'),
    rectbg = document.querySelector('#rectbg'),
    triangle = document.querySelector('#triangle'),
    trianglebg = document.querySelector('#trianglebg'),
    araser  = document.querySelector('#araser'),
    newp    = document.querySelector('#new'),
    help    = document.querySelector('#help'),
    helpCon = document.querySelector('#helpContent'),
    audio  = document.querySelector('#audio'),
    c      = can.getContext('2d');
/******************************************/
can.width = window.innerWidth - 100;
can.height = window.innerHeight - 100;
c.fillStyle = '#fff';
c.fillRect(0,0,can.width,can.height);
c.fillStyle = '#000';
c.lineJoin = 'round';
c.lineCap = 'round';
c.lineWidth = 10;
/*****************************************/
var x,
    y,
    isdraw     = false,
    randcolors = false,
    shape      = 'free',
    xx,yy;
/****************************************/

line.onclick = function(){
  shape = 'line';
  can.style.cursor = "crosshair";
  audio.play();
}
rect.onclick = function(){
  shape = 'rect';
  can.style.cursor = "crosshair";
  audio.play();
}
rectbg.onclick = function(){
  shape = 'rectbg';
  can.style.cursor = "crosshair";
  audio.play();
}
triangle.onclick = function(){
  shape = 'triangle';
  can.style.cursor = "crosshair";
  audio.play();
}
trianglebg.onclick = function(){
  shape = 'trianglebg';
  can.style.cursor = "crosshair";
  audio.play();
}
free.onclick = function(){
  shape = 'free';
  can.style.cursor = "pointer";
  audio.play();
}
araser.onclick = function(){
  shape = 'araser';
  can.style.cursor = "pointer";
  audio.play();
}

newp.onclick = function(){
  audio.play();
  var confirming = confirm('are you sure?\nyou want a new white page?');
  if(confirming == true) {
    c.fillStyle = '#fff';
    c.fillRect(0,0,can.width,can.height);
    c.fillStyle = '#000';
    c.strokeStyle = '#000';
  }
}
colors.onchange = function() {
  c.strokeStyle = this.value;
  c.fillStyle = this.value;
  lcolors.style.background = this.value;
}
colors.onclick = function() {
  c.strokeStyle = this.value;
  c.fillStyle = this.value;
  lcolors.style.background = this.value;
  audio.play();
}
width.onchange = function() {
  c.lineWidth = this.value;
}
  
rand.onclick = function() {
  if(randcolors) {
    randcolors = false;
    rand.style.background = '#fff';
    rand.style.border= '2px solid #0080ff';
    rand.style.color= '#0080ff';
  } else {
    randcolors = true;
    rand.style.border= '2px solid #0080ff';
    rand.style.background = 'linear-gradient(90deg,#f33,#00c5ff,#ffff1f)';
    rand.style.color= '#fff';

  }
  audio.play();
}

help.onclick = function(){
  helpCon.style.height = '100vh';
  audio.play();
}

helpCon.onclick = function(){
  this.style.height = '0';
}

/*************************************/
  
let r = (Math.random() * 360) || 0;
function draw(e) {
  if(!isdraw) return;
  if (randcolors) {
    if(r >= 360) r = 0;
    r++;
    c.strokeStyle = 'hsl(' + r + ',100%,50%)';
    c.fillStyle = 'hsl(' + r + ',100%,50%)';
  }
  if(shape == 'free') {
    if(!randcolors) c.strokeStyle = colors.value;
    c.beginPath();
    c.moveTo(x,y);
    c.lineTo(e.offsetX,e.offsetY);
    c.stroke();
    x = e.offsetX;
    y = e.offsetY;
  } else if (shape == 'araser') {
    c.strokeStyle = '#fff';
    c.beginPath();
    c.moveTo(x,y);
    c.lineTo(e.offsetX,e.offsetY);
    c.stroke();
    x = e.offsetX;
    y = e.offsetY;
  }
  can.onmouseup = function(e) {
     if (shape === 'rect') {
      if(!randcolors) c.strokeStyle = colors.value;
      xx = e.offsetX;
      yy = e.offsetY;
      c.beginPath();
      c.rect(x,y,xx-x,yy-y);
      c.stroke();
    } else if(shape === 'rectbg') {
      if(!randcolors) c.fillStyle = colors.value;
      xx = e.offsetX;
      yy = e.offsetY;
      c.beginPath();
      c.rect(x,y,xx-x,yy-y);
      c.fill();
    } else if (shape === 'line')  {
      if(!randcolors) c.strokeStyle = colors.value;
      xx = e.offsetX;
      yy = e.offsetY;
      c.beginPath();
      c.moveTo(x,y);
      c.lineTo(xx,yy);
      c.stroke();
    } else if(shape == 'triangle') {
      if(!randcolors) c.strokeStyle = colors.value;
      c.beginPath();
      c.moveTo(x,y);
      c.lineTo(x,e.offsetY);
      c.lineTo(e.offsetX,e.offsetY);
      c.closePath();
      c.stroke();
    } else if(shape == 'trianglebg') {
      if(!randcolors) c.fillStyle = colors.value;
      c.beginPath();
      c.moveTo(x,y);
      c.lineTo(x,e.offsetY);
      c.lineTo(e.offsetX,e.offsetY);
      c.closePath();
      c.fill();
    }
    isdraw = false;
  }
};
can.addEventListener('mousedown', function(e) {
  isdraw = true;
  x = e.offsetX;
  y = e.offsetY;
});
can.addEventListener('mousemove', draw);
//can.addEventListener('mouseout', function (){isdraw = false});

/***************** mob *************/
/*
function draw(e) {
  if(!isdraw) return;
  if (randcolors) {
    var r = (Math.random() * 360) | 0;
    c.strokeStyle = 'hsl(' + r + ',100%,50%)';
    c.fillStyle = 'hsl(' + r + ',100%,50%)';
  }
  if(shape == 'free') {
    if(!randcolors) c.strokeStyle = colors.value;
    c.beginPath();
    c.moveTo(x,y);
    c.lineTo(e.offsetX,e.offsetY);
    c.stroke();
    x = e.offsetX;
    y = e.offsetY;
  } else if (shape == 'araser') {
    c.strokeStyle = '#fff';
    c.beginPath();
    c.moveTo(x,y);
    c.lineTo(e.offsetX,e.offsetY);
    c.stroke();
    x = e.offsetX;
    y = e.offsetY;
  }
  can.ontouchend = function(e) {
     if (shape === 'rect') {
      if(!randcolors) c.strokeStyle = colors.value;
      xx = e.offsetX;
      yy = e.offsetY;
      c.beginPath();
      c.rect(x,y,xx-x,yy-y);
      c.stroke();
    } else if(shape === 'rectbg') {
      if(!randcolors) c.fillStyle = colors.value;
      xx = e.offsetX;
      yy = e.offsetY;
      c.beginPath();
      c.rect(x,y,xx-x,yy-y);
      c.fill();
    } else if (shape === 'line')  {
      if(!randcolors) c.strokeStyle = colors.value;
      xx = e.offsetX;
      yy = e.offsetY;
      c.beginPath();
      c.moveTo(x,y);
      c.lineTo(xx,yy);
      c.stroke();
    } else if(shape == 'triangle') {
      if(!randcolors) c.strokeStyle = colors.value;
      c.beginPath();
      c.moveTo(x,y);
      c.lineTo(x,e.offsetY);
      c.lineTo(e.offsetX,e.offsetY);
      c.closePath();
      c.stroke();
    } else if(shape == 'trianglebg') {
      if(!randcolors) c.fillStyle = colors.value;
      c.beginPath();
      c.moveTo(x,y);
      c.lineTo(x,e.offsetY);
      c.lineTo(e.offsetX,e.offsetY);
      c.closePath();
      c.fill();
    }
    isdraw = false;
  }
};
can.addEventListener('touchstart', function(e) {
  isdraw = true;
  x = e.offsetX;
  y = e.offsetY;
});
can.addEventListener('touchmove', draw);
*/

/**************************************/



/***************************************/
var output = document.querySelector('#insertimg');
var loadFile = function(event) {
  var reader = new FileReader();
  reader.onload = function(){
    output.src = reader.result;
    output.onload = function() {
      c.beginPath();
      c.drawImage(output, 0, 0, can.width, can.height);
    }
  };
  reader.readAsDataURL(event.target.files[0]);
};
/***************************************/
var download = document.querySelector('a');
download.onclick = function() {
  c.font = "10px cursive";
  c.fillText("Ahmad Fathy",5,10);
  c.fillStyle = '#000';
  var data = can.toDataURL();
  this.href = data;
  audio.play();
}
