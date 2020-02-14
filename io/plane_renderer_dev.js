var x_Ra = [-5, 5]
var y_Ra = [-5, 5]

var theta = 1
var alpha = 0.5
var rotationSpeed = alpha*Math.PI/30

var lightSources = [[1, 1, 0.5], [-1, -1, 0.5]]
var luminosity = 2
var distW = 2.5
var shininess = 4

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

    var avgx = x_Ra[1]/2
    var avgy = y_Ra[1]/2
    var avgz = 0
    for ( var i = 0; i < lightSources.length; i++ )
    {avgz+=lightSources[i][2]}
    avgz/=lightSources.length
    var dist = (Math.pow(avgx, 2)+Math.pow(avgy, 2)+Math.pow(avgz, 2))
    var displacements = []
    var angSThetas = []
    var angSPhis = []
    var angLThetas = []
    var angLPhis = []

    for ( var i = 0; i < lightSources.length; i++ )
    {

        displacements.push(dist/Math.max(Math.pow(x-lightSources[i][0], shininess)+
        Math.pow(y-lightSources[i][1], shininess)+Math.pow(z-lightSources[i][2], shininess), 0.01))
        angSThetas.push(co(Math.PI/2+Math.atan(lightSources[i][2]/Math.max(lightSources[i][0], 0.01))))
        angSPhis.push(co(Math.PI/2+Math.atan(lightSources[i][2]/Math.max(lightSources[i][1], 0.01))))
        angLThetas.push(1/Math.max(Math.pow(co(angSThetas[i])-co(lTheta), 2), 0.01))
        angLPhis.push(1/Math.max(Math.pow(co(angSPhis[i])-co(lPhi), 2), 0.01))

    }

    var displacement = 0
    var angLTheta = 0
    var angLPhi = 0

    for ( var i = 0; i < lightSources.length; i++ )
    {

        displacement+=displacements[i]
        angLTheta+=angLThetas[i]
        angLPhi+=angLPhis[i]

    }

    return mini(luminosity*(mini(displacement)+1/distW*(mini(angLTheta)+mini(angLPhi))))

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

var plane = function(x1, y1, z1, x2, y2, z2, x3, y3, z3, hue)
{

  var thetaDen = [x2-x1, x3-x1, x3-x2]
  var phiDen = [y2-y1, y3-y1, y3-y2]
  for ( var i = 0; i < 3; i++ )
  {

    if ( thetaDen[i] == 0 ){ thetaDen[i] = 0.01 }
    if ( phiDen[i] == 0 ){ phiDen[i] = 0.01 }

  }
  var lTheta = (Math.atan((z2-z1)/thetaDen[0])+Math.atan((z3-z1)/thetaDen[1])+
  Math.atan((z3-z2)/thetaDen[2]))/3
  var lPhi = (Math.atan((z2-z1)/phiDen[0])+Math.atan((z3-z1)/phiDen[1])+
  Math.atan((z3-z2)/phiDen[2]))/3
  var i1 = brightness(x1, y1, z1, lTheta, lPhi)
  var i2 = brightness(x2, y2, z2, lTheta, lPhi)
  var i3 = brightness(x3, y3, z3, lTheta, lPhi)
  var p1 = []
  var b1 = Math.max(i1, i2, i3)
    if ( b1 == i1 ){p1 = project(x1, y1, z1)}
    if ( b1 == i2 ){p1 = project(x2, y2, z2)}
    if ( b1 == i3 ){p1 = project(x3, y3, z3)}
  var p2 = []
  var b2 = Math.min(i1, i2, i3)
    if ( b2 == i1 ){p2 = project(x1, y1, z1)}
    if ( b2 == i2 ){p2 = project(x2, y2, z2)}
    if ( b2 == i3 ){p2 = project(x3, y3, z3)}
  var grad = c.createLinearGradient(w/4+w/2*p1[0], h/4+h/2*p1[1], w/4+w/2*p2[0], h/4+h/2*p2[1])
  hue1 = blend(hue, b1)
  grad.addColorStop(0, "rgb("+hue1[0]+","+hue1[1]+","+hue1[2]+")")
  hue2 = blend(hue, b2)
  grad.addColorStop(1, "rgb("+hue2[0]+","+hue2[1]+","+hue2[2]+")")
  c.fillStyle = grad
  p1 = project(x1, y1, z1)
  p2 = project(x2, y2, z2)
  var p3 = project(x3, y3, z3)
  c.beginPath()
  c.moveTo(w/4+w/2*p1[0], h/4+h/2*p1[1])
  c.lineTo(w/4+w/2*p2[0], h/4+h/2*p2[1])
  c.lineTo(w/4+w/2*p3[0], h/4+h/2*p3[1])
  c.lineTo(w/4+w/2*p1[0], h/4+h/2*p1[1])
  c.fill()

}
