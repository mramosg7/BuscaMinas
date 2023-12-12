

var numFlag = 10;
let timer =0;
var Flag = [10];
    for (var i = 0; i < 10; i++) Flag[i] = [10];
    // for (var i = 0; i < 10; i++) {
    //     for (var h = 0; h < 10; h++) {
    //         Flag[i][h] = 0;
    //     }
    // }
var color = ['#237ace', '#d32f2f', '#388f3d'];
var tablero = [10];
    for (var i = 0; i < 10; i++) tablero[i] = [10];
var visualizar = [10];
    for (var i = 0; i < 10; i++) visualizar[i] = [10];
var tdcolor = [10];
    for (var i = 0; i < 10; i++) tdcolor[i] = [10];
IniciarTablero();
IniciarVisualizado();
var tabla = [10];
    for (var i = 0; i < 10; i++) tabla[i] = [10];

function iniciarjuego() {
    document.querySelector('.background-before').id = "main-secundario";
    document.querySelector('.background-game').style.visibility = "visible";
    let table = document.createElement('table');

    for (let i = 0; i < 10; i++) {
        let tr = document.createElement('tr');
        for (let h = 0; h < 10; h++) {
            let td = document.createElement('td');
            td.addEventListener('click', (e) => prueba(e, i, h));
            td.addEventListener('contextmenu', (e) => InsertFlag(e,i,h));
            tabla[i][h] = td;
            tr.appendChild(td);


            if ((i + h) % 2 === 0) {
                td.style.backgroundColor = '#a2d149';
            } else {
                td.style.backgroundColor = '#aad650';
            }
        }
        table.appendChild(tr);
    }
    document.querySelector('#container').appendChild(table);
}

function upTimer(){
    timer++;
    document.getElementById('setTimer').innerHTML= timer;
}

function startTimer(){
    setInterval(upTimer, 1000);
    
}

function InsertFlag(e,fila,columna) {
    if(Flag[fila][columna]<0){
       Flag[fila][columna]=0;
        numFlag++;
        e.target.innerHTML ='';
    }else{
        if (numFlag >= 1){
            numFlag--;
            tabla[fila][columna].innerHTML ='🚩';
            // e.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pennant" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <line x1="8" y1="21" x2="12" y2="21"></line> <line x1="10" y1="21" x2="10" y2="3"></line> <path d="M10 4l9 4l-9 4"></path> </svg>';
            Flag[fila][columna]=1;
            
        }
     }
     document.getElementById('banderas').innerHTML = numFlag;
}

function prueba(e, fila, columna) {
    startTimer();
    comprobar(fila, columna);
    var hola;
    for (var i = 0; i < 10; i++) {
        for (var h = 0; h < 10; h++) {
            hola = tabla[i][h];
            if (visualizar[i][h]) {
                if (tablero[i][h] === 0) {
                    if ((i + h) % 2 === 0) {
                        hola.style.backgroundColor = '#e4c29e';
                    } else {
                        hola.style.backgroundColor = '#d7b998';
                    }
                } else if (tablero[i][h] === 9) {
                    hola.style.backgroundColor = 'red';
                } else {
                    if ((i + h) % 2 === 0) {
                        hola.style.backgroundColor = '#e4c29e';
                    } else {
                        hola.style.backgroundColor = '#d7b998';
                    }
                    hola.innerText = tablero[i][h];

                    if (tdcolor[i][h] !== 1) {
                        hola.style.color = color[Math.floor(Math.random() * 3)];
                        tdcolor[i][h] = 1;
                    }


                }
            }
        }
    }
}

function PonerMinas() {
    var minas = 0;
    while (minas < 10) {
        var fila = Math.floor(Math.random() * 10);
        var columna = Math.floor(Math.random() * 10);
        if (tablero[fila][columna] !== 9) {
            tablero[fila][columna] = 9;
            for (var i = 0; i < 10; i++) {
                if (i >= fila - 1 && i <= fila + 1) {
                    for (var h = 0; h < 10; h++) {
                        if (h >= columna - 1 && h <= columna + 1) {
                            // if (tablero[i][h]!==9)tablero[i][h]=tablero[i][h]+1;
                            if (tablero[i][h] !== 9) {
                                tablero[i][h] = tablero[i][h] + 1;
                            }
                        }
                    }
                }
            }
        }
        minas = minas + 1;
    }

}

function IniciarTablero() {
    for (var i = 0; i < 10; i++) {
        for (var h = 0; h < 10; h++) {
            tablero[i][h] = 0;
        }
    }
    PonerMinas();

}

function IniciarVisualizado() {
    for (var i = 0; i < 10; i++) {
        for (var h = 0; h < 10; h++) {
            visualizar[i][h] = false;
        }
    }

}

function verificador() {
    let cont = 0;
    for (i = 0; i < 10; i++) {
        for (h = 0; h < 10; h++) {
            if (visualizar[i][h]) cont++;
        }
    }
    return cont != 90;
}

function EnseñarMinas() {
    for (i = 0; i < 10; i++) {
        for (h = 0; h < 10; h++) {
            if (tablero[i][h] === 9) visualizar[i][h] = true;
        }
    }
}

function comprobar(fila, columna) {
    if (tablero[fila][columna] === 9) {
        EnseñarMinas();
        alert("has perdido");
    }
    DestaparCasillas(fila, columna);
}

function DestaparCasillas(fila, columna) {
    if (!(visualizar[fila][columna])) {
        visualizar[fila][columna] = true;
        if (tablero[fila][columna] === 0) {
            for (var i = 0; i < 10; i++) {
                if (i >= fila - 1 && i <= fila + 1) {
                    for (var h = 0; h < 10; h++) {
                        if (h >= columna - 1 && h <= columna + 1) {
                            if (tablero[i][h] !== 9) {
                                DestaparCasillas(i, h);
                            }
                        }
                    }
                }
            }
        }
    }
}