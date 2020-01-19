var x_Ra = [-5, 5]
var y_Ra = [-5, 5]

var theta = 1
var alpha = 0.5
var rotationSpeed = alpha*Math.PI/30

var lightSource = [0, 0, 1]
var luminosity = 20

var f1 = function(x)
{return Math.sqrt(-Math.pow(x, 2)+1)}
var f2 = function(x)
{return -Math.sqrt(-Math.pow(x, 2)+1)}

var i_hat = [1, 0]
var j_hat = [0, 1]

  if ( Math.tan(theta) >= 0 )
  {

      if ( theta > Math.PI )
      {

          i_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f2(i_hat[0])

      }
      else {

          i_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f1(i_hat[0])

      }

  }
  else
  {

      if ( theta > Math.PI )
      {

          i_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f2(i_hat[0])

      }
      else {

          i_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f1(i_hat[0])

      }  

  }

  var nTheta = theta+Math.PI/2
  if ( Math.tan(nTheta) >= 0 )
  {

      if ( nTheta > Math.PI )
      {

          j_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f2(j_hat[0])

      }
      else {

          j_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f1(j_hat[0])

      }

  }
  else
  {

      if ( nTheta > Math.PI )
      {

          j_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f2(j_hat[0])

      }
      else {

          j_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f1(j_hat[0])

      }  

  }


var mini = function(x)
{

  return x/(x+1)

}
var blend = function(c, int)
{

  var mi = 0
  var max = 0
  for ( var i = 0; i < c.length; i++ )
  {

      if ( c[i] > max )
      {

          mi = i
          max = c[i]

      }

  }
  r = [255*int*c[0]/c[mi], 255*int*c[1]/c[mi], 255*int*c[2]/c[mi]]
  return r

}
var co = function(rad)
{

  if ( rad > Math.PI ){ return rad-Math.PI }
  else if ( rad < -Math.PI ){ return rad+Math.PI }
  else { return rad }

}
var brightness = function(x, y, z, lTheta, lPhi)
{

  avgx = x_Ra[1]/2
  avgy = y_Ra[1]/2
  dist = (Math.pow(avgx, 2)+Math.pow(avgy, 2))
  displacement = dist/Math.max(Math.pow(x-lightSource[0], 2)+Math.pow(y-lightSource[1], 2)+
  Math.pow(z-lightSource[2], 2), 0.01)
  angSTheta = -co(Math.atan(lightSource[2]/Math.max(lightSource[0], 0.01)))
  angSPhi = -co(Math.atan(lightSource[2]/Math.max(lightSource[1], 0.01)))
  angLTheta = 1/Math.max(Math.pow(angSTheta-co(lTheta), 2), 0.01)
  angLPhi = 1/Math.max(Math.pow(angSPhi-co(lPhi), 2), 0.01)
  return mini(luminosity*mini(displacement)*mini(angLTheta)*mini(angLPhi))

};
var project2d = function(x, y, z)
{

  away = (y-y_Ra[0])/(y_Ra[1]-y_Ra[0])
  avg = (y_Ra[1]-y_Ra[0]+x_Ra[1]-x_Ra[0])/2
  return [1/4*away+(-1/2*away+1)*(x-x_Ra[0])/(x_Ra[1]-x_Ra[0]),away+z/avg]

}
var project = function(x, y, z)
{

  return project2d(i_hat[0]*x+j_hat[0]*y, i_hat[1]*x+j_hat[1]*y, z)

}


c.scale(1, -1)
c.translate(0, -h)

var plane = function(x1, y1, z1, x2, y2, z2, x3, y3, z3, co)
{

  var avg = [(x1+x2+x3)/3, (y1+y2+y3)/3, (z1+z2+z3)/3]
  var thetaDen = [x2-x1, x3-x1, x3-x2]
  var phiDen = [y2-y1, y3-y1, y3-y2]
  for ( var i = 0; i < 3; i++ )
  {

      if ( thetaDen[i] == 0 ){ thetaDen[i] = 0.01 }
      if ( phiDen[i] == 0 ){ phiDen[i] = 0.01 }

  }
  var lTheta = Math.atan(((z2-z1)/thetaDen[0]+(z3-z1)/thetaDen[1]+(z3-z2)/thetaDen[2])/3)
  var lPhi = Math.atan(((z2-z1)/phiDen[0]+(z3-z1)/phiDen[1]+(z3-z2)/phiDen[2])/3)
  var intensity = brightness(avg[0], avg[1], avg[2], lTheta, lPhi)
  co = blend(co, intensity)
  c.fillStyle = "rgb("+co[0]+","+co[1]+","+co[2]+")"
  var p1 = project(x1, y1, z1)
  var p2 = project(x2, y2, z2)
  var p3 = project(x3, y3, z3)
  c.beginPath()
  c.moveTo(w/4+w/2*p1[0], h/4+h/2*p1[1])
  c.lineTo(w/4+w/2*p2[0], h/4+h/2*p2[1])
  c.lineTo(w/4+w/2*p3[0], h/4+h/2*p3[1])
  c.lineTo(w/4+w/2*p1[0], h/4+h/2*p1[1])
  c.fill()

}

var refresh = function()
{

  if ( theta >= 2*Math.PI )
  {

      theta = 0+theta-2*Math.PI

  }

  if ( Math.tan(theta) >= 0 )
  {

      if ( theta > Math.PI )
      {

          i_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f2(i_hat[0])

      }
      else {

          i_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f1(i_hat[0])

      }

  }
  else
  {

      if ( theta > Math.PI )
      {

          i_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f2(i_hat[0])

      }
      else {

          i_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f1(i_hat[0])

      }  

  }

  var nTheta = (theta+Math.PI/2)%(2*Math.PI)
  if ( Math.tan(nTheta) >= 0 )
  {

      if ( nTheta > Math.PI )
      {

          j_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f2(j_hat[0])

      }
      else {

          j_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f1(j_hat[0])

      }

  }
  else
  {

      if ( nTheta > Math.PI )
      {

          j_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f2(j_hat[0])

      }
      else {

          j_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f1(j_hat[0])

      }  

  }


  c.fillStyle = "white"
  c.fillRect(0, 0, w, h)

  plane(0, 0, 0, 1, 1, 1, 0, 1, 0, [211, 117, 80])

  theta+=rotationSpeed
  window.requestAnimationFrame(refresh)

}

refresh()
