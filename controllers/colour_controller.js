

exports.pickColour = function(){


   const r = (Math.round(Math.random()* 127) + 127).toString(16);
   const g = (Math.round(Math.random()* 127) + 127).toString(16);
   const b = (Math.round(Math.random()* 127) + 127).toString(16);
   return '#' + r + g + b;
}


exports.rgbColour = function(hex, opacity){
  var h=hex.replace('#', '');
  h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

  for(var i=0; i<h.length; i++)
      h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

  if (typeof opacity != 'undefined')  h.push(opacity);

  return 'rgba('+h.join(',')+')';


}
