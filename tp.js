function animar_carrusel(milliseconds_carrusel, id_div){

    /*------------------------------Variables----------------------------------*/

    var imagenActual = 0;
    var indice = 0;
    var cantImagenes = 0;
    var intervaloImagen = setInterval(cambiarImagenAdelante, milliseconds_carrusel);
    var intervaloBarra = setInterval(animarBarra,0);
    var ancho_div;
    var alto_div;
    var ancho_actual;
    var alto_actual;

    function animarBarra(){
	    if (indice == 0) {
	    indice = 1;
	    var elem = document.getElementById("miBarra");
	    var width = 0;
	    var opacity = 0;
	    if (milliseconds_carrusel>5000) {
	    	intervaloBarra = setInterval(frame, milliseconds_carrusel/1000);
	    }
	    else{
	    	intervaloBarra = setInterval(frame, milliseconds_carrusel/500);	    	
	    }
	        function frame() {
		        if (width >= 100) {
		            clearInterval(id);
		             indice = 0;
		        } 
		        else {
		        	if(milliseconds_carrusel > 5000){
		        		width=width+0.1;
						opacity=opacity+0.1;
		        	}
		            else{
		            	width=width+0.2;
		            	opacity=opacity+0.2;		
		            }
		            elem.style.width = width + "%";
		            elem.style.opacity = opacity + "%";
		    	}
			}
		}	
	}

    function cambiarImagenAdelante(){
        indice = 0;
        clearInterval(intervaloBarra);
        animarBarra();
        clearInterval(intervaloImagen);
        $("#"+id_div).find('img').each(function(index){
            if(index == imagenActual){
                $(this).css('display','none');
            }
        });

        $("#circulo"+(imagenActual+1)).css('background','lightgrey');

        if (imagenActual == cantImagenes) {
            imagenActual = 0;
        }
        
        else{

            imagenActual++;
        }

        $("#"+id_div).find('img').each(function(index) {    
            if(index == imagenActual){
                $(this).fadeIn("slow");
            }
        });

        console.log(imagenActual);
        $("#circulo"+(imagenActual+1)).css('background','red');

        intervaloImagen = setInterval(cambiarImagenAdelante, milliseconds_carrusel);
    }

    function cambiarImagenAtras(){
        indice = 0;
        clearInterval(intervaloBarra);
        animarBarra();
        clearInterval(intervaloImagen);

        $("#"+id_div).find('img').each(function(index) {
            if(index == imagenActual){
                $(this).css('display','none');
            }
        });

        $("#circulo"+(imagenActual+1)).css('background','lightgrey');

        if (imagenActual == 0) {
            imagenActual = cantImagenes;
        }
        else{
            imagenActual--;

        }  
        $("#"+id_div).find('img').each(function(index) {
            if(index == imagenActual){
                $(this).fadeIn("slow");
            }
        });
        console.log(imagenActual);
        $("#circulo"+(imagenActual+1)).css('background','red');

        intervaloImagen = setInterval(cambiarImagenAdelante, milliseconds_carrusel);
    }


    function OcultarDemasImagenes(){
        $("#"+id_div).find('img').each(function(index) {
            
        	if(index == 0){
        		ancho_div=$(this).width();
    			alto_div=$(this).height();
        	}
            else{
                alto_actual=$(this).height();
                ancho_actual=$(this).width();
                $(this).css('height', alto_div+'px');
                $(this).css('width', (alto_div*ancho_actual/alto_actual)+'px');
                if((alto_div*ancho_actual/alto_actual) > ancho_div){
                    $(this).css('width', ancho_div+'px');
                    $(this).css('height', (ancho_div*alto_actual/ancho_actual)+'px');
                }

            }
        	
            if(index!=0){
                $(this).css("display","none");
            }

        });    
    }

    function CreacionBarraCirculosYFlechas(){
        var barraDeCirculosYBotones="<div id='barraDeCirculosYBotones'>"+
        "<button id='atras'><</button>"+"<div id='barraCirculos'>";
        $("#"+id_div).find('img').each(function(index) {
            
        if (index==0) {
            barraDeCirculosYBotones = barraDeCirculosYBotones + "<div id='circulo"+(index+1)+"'class='circulo1'></div>";
        }
        else{
            barraDeCirculosYBotones = barraDeCirculosYBotones + "<div id='circulo"+(index+1)+"'class='otrosCirculos'></div>";
        } 
        if(index > cantImagenes){
            cantImagenes++;
        }
        });    
        barraDeCirculosYBotones = barraDeCirculosYBotones + "</div>" + "<button id='adelante'>></button>"+"</div>";
        var barraDeProgreso="<div id='miProgreso'><div id='miBarra'></div></div>";
        $(barraDeCirculosYBotones).appendTo("#"+id_div);
        $(barraDeProgreso).appendTo("#"+id_div);
    }
    
    OcultarDemasImagenes();
    $("#"+id_div).css({"margin":"4% auto","width":ancho_div,"display":"block", "text-align":"center"});
    CreacionBarraCirculosYFlechas();
    $("#atras").click(cambiarImagenAtras);
    $("#adelante").click(cambiarImagenAdelante);
    animarBarra();
}