//use canvas name `c` or replace `c` in code

var x_Ra = [-5, 5]
var y_Ra = [-5, 5]

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

var genEval = function(f, steps)
{

    evalPts = []
    var i = 0
    for ( var x = x_Ra[0]; x <= x_Ra[1]; x+=(x_Ra[1]-x_Ra[0])/steps )
    {

        evalPts.push([])
        for ( var y = y_Ra[0]; y <= y_Ra[1]; y+=(y_Ra[1]-y_Ra[0])/steps )
        {

            evalPts[i].push(f(x, y))

        }
        i++

    }

}

c.scale(1, -1)
c.translate(0, -h)

var graph = function(f, steps, c1, c2)
{

    genEval(f, steps)
    var ix = 0
    var iy = 0
    for ( var x = x_Ra[0]; x < x_Ra[1]; x+=(x_Ra[1]-x_Ra[0])/steps )
    {

        iy = 0
        for ( var y = y_Ra[0]; y < y_Ra[1]; y+=(y_Ra[1]-y_Ra[0])/steps )
        {

            light = brightness(x, y, evalPts[ix][iy])
            if ( ix%2 == iy%2 )
            {

                c.fillStyle = "rgba("+c1[0]+","+c1[1]+","+c1[2]+","+light+")"

            }
            else {

                c.fillStyle = "rgba("+c2[0]+","+c2[1]+","+c2[2]+","+light+")"

            }

            p1 = project(x, y, evalPts[ix][iy])
            p2 = project(x+(x_Ra[1]-x_Ra[0])/steps, y, evalPts[ix+1][iy])
            p3 = project(x+(x_Ra[1]-x_Ra[0])/steps, y+(y_Ra[1]-y_Ra[0])/steps, evalPts[ix+1][iy+1])
            p4 = project(x, y+(y_Ra[1]-y_Ra[0])/steps, evalPts[ix][iy+1])

            c.beginPath()
            c.moveTo(w/4+w/2*p1[0], h/4+h/2*p1[1])
            c.lineTo(w/4+w/2*p2[0], h/4+h/2*p2[1])
            c.lineTo(w/4+w/2*p3[0], h/4+h/2*p3[1])
            c.lineTo(w/4+w/2*p4[0], h/4+h/2*p4[1])
            c.lineTo(w/4+w/2*p1[0], h/4+h/2*p1[1])
            c.fill()
            iy++

        }

        ix++

    }

}
