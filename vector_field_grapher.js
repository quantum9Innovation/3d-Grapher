var x_Ra = [-5, 5]
var y_Ra = [-5, 5]
var z_Ra = [-5, 5]

var alpha = 1
var steps = 10
var colorMax = 2
var max = 1
var min = 0.5

var theta = 0
var rotationSpeed = Math.PI/75

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


var brightness = function(x, y, z)
{

  avgx = x_Ra[1]/2
  avgy = y_Ra[1]/2
  dist = (Math.pow(avgx, 2)+Math.pow(avgy, 2))
  return dist/Math.max(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2), 0.01)

};
var blend = function(p)
{

  if ( p <= 0.25 )
  {

      return [0, 255*4*p, 255]

  }
  else if ( p <= 0.5 )
  {

      return [0, 255, 255*(1-4*(p-0.25))]

  }
  else if ( p <= 0.75 )
  {

      return [255*(4*(p-0.5)), 255, 0]

  }
  else {

      return [255, 255*(1-4*(p-0.75)), 0]

  }

};
var mini = function(mag, max)
{

  return Math.sign(mag)*((Math.abs(mag)*max)/(Math.abs(mag)+1))

}
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


var evalPts = []
var iy = 0
var iz = 0
for ( var x = x_Ra[0]; x <= x_Ra[1]; x+=(x_Ra[1]-x_Ra[0])/steps )
{

  evalPts.push([])
  iz = 0
  for ( var y = y_Ra[0]; y <= y_Ra[1]; y+=(y_Ra[1]-y_Ra[0])/steps )
  {

      evalPts[iy].push([])
      for ( var z = z_Ra[0]; z <= z_Ra[1]; z+=(z_Ra[1]-z_Ra[0])/steps )
      {

          evalPts[iy][iz].push(f(x, y, z))

      }
      iz++

  }
  iy++

}

c.scale(1, -1)
c.translate(0, -h)


var graph = function(f)
{

  var ix = 0
  var iy = 0
  var iz = 0
  for ( var x = x_Ra[0]; x < x_Ra[1]; x+=(x_Ra[1]-x_Ra[0])/steps )
  {

      iy = 0
      for ( var y = y_Ra[0]; y < y_Ra[1]; y+=(y_Ra[1]-y_Ra[0])/steps )
      {

          iz = 0
          for ( var z = z_Ra[0]; z < z_Ra[1]; z+=(z_Ra[1]-z_Ra[0])/steps )
          {

              light = brightness(x, y, z)
              dist = Math.sqrt(Math.pow(evalPts[ix][iy][iz][0], 2)+Math.pow(evalPts[ix][iy][iz][1], 2)+
              Math.pow(evalPts[ix][iy][iz][2], 2))
              maxDist = Math.sqrt(3*Math.pow(max, 2))
              co = blend(dist/(maxDist*colorMax))
              c.strokeStyle = "rgba("+co[0]+","+co[1]+","+co[2]+","+light+")"
              c.fillStyle = "rgba("+co[0]+","+co[1]+","+co[2]+","+light+")"

              p1 = project(x, y, z)
              xm = mini(evalPts[ix][iy][iz][0], max)
              ym = mini(evalPts[ix][iy][iz][1], max)
              zm = mini(evalPts[ix][iy][iz][2], max)
              xm = Math.sign(xm)*Math.min(xm*Math.sign(xm), max*min)
              ym = Math.sign(ym)*Math.min(ym*Math.sign(ym), max*min)
              zm = Math.sign(zm)*Math.min(zm*Math.sign(zm), max*min)
              p2 = project(x+xm, y+ym, z+zm)

              c.beginPath()
              c.moveTo(w/4+w/2*p1[0], h/4+h/2*p1[1])
              c.lineTo(w/4+w/2*p2[0], h/4+h/2*p2[1])
              c.stroke()

              c.beginPath()
              c.moveTo(w/4+w/2*(2/3*p2[0]+1/3*p1[0]), h/4+h/2*(2/3*p2[1]+1/3*p1[1]))
              c.lineTo(w/4+w/2*(2/3*p2[0]+1/3*p1[0])-7, h/4+h/2*(2/3*p2[1]+1/3*p1[1]))
              c.lineTo(w/4+w/2*p2[0], h/4+h/2*p2[1])
              c.lineTo(w/4+w/2*(2/3*p2[0]+1/3*p1[0])+7, h/4+h/2*(2/3*p2[1]+1/3*p1[1]))
              c.fill()

              iz++

          }

          iy++

      }

      ix++

  }

}
