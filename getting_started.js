//create canvas called `c` before loading script!
//create a function called refresh and copy the following code inside it!

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

theta+=rotationSpeed
window.requestAnimationFrame(refresh)
