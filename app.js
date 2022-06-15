//inicializacion

let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;

let winAudio = new Audio(`./sonidos/win.wav`);
let looseAudio = new Audio(`./sonidos/lose.wav`);
let rightAudio = new Audio(`./sonidos/right.wav`);
let errorAudio = new Audio(`./sonidos/error.wav`);
let clickAudio = new Audio(`./sonidos/click.wav`);

//Docs html
let mostrarMovimientos = document.getElementById("movimientos");
let mostarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo");

//Generacion de numeros aleatorios: 
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random() -0.5});
console.log(numbers)


//Funciones

//Restar Tiempo:
function contarTiempo(){
   tiempoRegresivo = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas()
            looseAudio.play();
        }
    },1000);
}

function  bloquearTarjetas(){
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./icons/${numbers}.png" alt="">`;
        tarjetaBloqueada.disabled = true; 
    }
}



//Funcion Principal:

function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
 tarjetasDestapadas++;
 console.log(tarjetasDestapadas)

  if(tarjetasDestapadas == 1){
      //mostrar primer numero
      tarjeta1= document.getElementById(id);
      primerResultado = numbers[id];
      tarjeta1.innerHTML = `<img src="./icons/${primerResultado}.png" alt="">`;
      clickAudio.play();

      //deshabilitar primer boton
     tarjeta1.disabled = true;
 }else if(tarjetasDestapadas == 2){
     //mostrar 2do numero
     tarjeta2 = document.getElementById(id);
     segundoResultado = numbers[id];
     tarjeta2.innerHTML = `<img src="./icons/${segundoResultado}.png" alt="">`;

     //deshabilitar 2do boton
     tarjeta2.disabled = true;

     //incrementar movimiento 
     movimientos ++;
     mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if(primerResultado == segundoResultado){
        //encerar contador tarjetas destapadas
        tarjetasDestapadas = 0;
        
        //aumentar aciertos
        aciertos ++;
        mostarAciertos.innerHTML =  `Aciertos: ${aciertos}`;
        rightAudio.play();
        
        if(aciertos == 8){
            clearInterval(tiempoRegresivo);
            winAudio.play();
        mostarAciertos.innerHTML =  `Aciertos: ${aciertos}😎🎉`;
        mostrarTiempo.innerHTML = `Genial!🎉 Sólo demoraste ${timerInicial - timer} segundos 😎 `
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}😁✨`;   
        }
    
    }else{
        errorAudio.play();
        //Mostrar momentaneamente valores y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML = " ";
            tarjeta2.innerHTML = " ";
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        },700);
    
    }
  }
    
 }