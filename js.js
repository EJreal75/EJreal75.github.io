
var pasoR;
var pasoL;

var block = 1;

$(function () {
  dibujarGrafo(0);
  $("#iniciar").click(function () {

    dibujarGrafo(1);
    if (block == 1) {
      block = 0;
      completarPreliminares();

    }
  });
});

function dibujarGrafo(num) {
  var container = document.getElementById("mynetwork");
  switch (num) {
    case 0:
      var dot = 'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L" color=blue]; 2 -> 3[label=" B / B / R" color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue]; 3[ borderWidth=7]}';
      break;
    case 1:
      var dot = 'dinetwork {node[shape=circle];1[color = red];1 -> 2 [label=" B / B / L " color=blue]; 2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" a / a / R " color=red]; 2 -> 2[label=" a / a / L" color=blue]; 3[ borderWidth=7]}';
      break;
    case 2:
      var dot = 'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L " color=red];2[color = red];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue]; 3[ borderWidth=7]}';
      break;
    case 3:
      var dot = 'dinetwork {node[shape=circle];1->2[color=red];1 -> 2 [label=" B / B / L " color=blue];2 -> 3[label=" B / B / R " color=red]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue];3[color = red]; 3[ borderWidth=7]}';
      break;
    case 4:
      var dot = 'dinetwork {node[shape=circle];1[color = red];1 -> 2 [label=" B / B / L " color = blue]; 2 -> 3[label=" B / B / R " color = blue]; 1 -> 1[label=" b / a / R " color = red]; 2 -> 2[label=" a / a / L " color = blue]; 3[ borderWidth=7]}';
      break;
    case 5:
      var dot = 'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L " color=blue];2[color = red];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a > a / R " color=blue]; 2 -> 2[label=" a / a / L " color=red]; 3[ borderWidth=7]}';
      break;
    case 6:
      var dot = 'dinetwork {node[shape=circle];1->2[color=red];1 -> 2 [label=" B / B / L " color=blue];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue];3[color = red]; 3[ borderWidth=7]}';
      break;
    default:
      break;
  }

  var data = vis.parseDOTNetwork(dot);

  var options = {
    nodes: {
      shape: "dot",
      size: 50,
      font: {
        size: 32,
      },
      borderWidth: 1,
      shadow: true,
    },
    layout: {
      hierarchical: {
        sortMethod: "directed",
      },
    },
    edges: {
      width: 3,
      length: 190,
      font: {
        size: 16,
      },
      shadow: true,
      //color: "blue",
    },
  };
  var network = new vis.Network(container, data, options);
}

function leerCadena() {
  $("#carrete").html('');
  var texto = $("#entrada").val();
  return texto;
}

function convertirCadenaEnArreglo(texto) {
  var arreglo = texto.split("");
  return arreglo;
}

function limpiarCinta() {
  $("#carrete").html('');
}

function dibujarCinta(arreglo) {
  let tam = contarArreglo(arreglo);
  $("#carrete").append('<div id = "elemento0" class="circulo"></div>');
  let i;
  for (i = 0; i < tam; i++) {
    $("#carrete").append('<div class="circulo" id = "elemento">' + arreglo[i] + '</div>');
    $("#elemento").attr("id", "elemento" + (i + 1));
  }
  $("#carrete").append('<div class="circulo" id = "elemento"></div>');
  $("#elemento").attr("id", "elemento" + (i + 1));
}

function contarArreglo(arreglo) {
  var tam = arreglo.length;
  return tam;
}

function animarCinta() {
  anime({
    targets: '.circulo',
    translateY: 50,
    loop: false,
    delay: function (el, i, l) {
      return i * 100;
    },
    endDelay: function (el, i, l) {
      return (l - i) * 100;
    }
  });
}

function completarPreliminares() {
  limpiarCinta();
  var texto = leerCadena();
  var arreglo = convertirCadenaEnArreglo(texto);
  pasoL = contarArreglo(arreglo);
  pasoR = 1;
  dibujarCinta(arreglo);
  animarCinta();
  $("#correr").click(function () {
    recorrerDerecha(0, contarArreglo(arreglo));
  });
  $("#paso").click(function () {
    recorrerPaso(contarArreglo(arreglo));
  });


}

function recorrerPaso(tam) {
  console.log(pasoR);
  if (pasoR <= (tam + 1)) {

    console.log("iteracion" + pasoR);

    setTimeout(function () {
      anime({
        targets: '#elemento' + (pasoR - 1),
        backgroundColor: '#b9b3f5',
      });
    }, 100);
    setTimeout(function () {
      anime({
        targets: '#elemento' + pasoR,
        backgroundColor: '#3f51b5',
      });
      if ($('#elemento' + (pasoR)).text() == "a") {
        $('#elemento' + (pasoR)).text("a");
        dibujarGrafo(1);
      }
      if ($('#elemento' + (pasoR)).text() == "b") {
        $('#elemento' + (pasoR)).text("a");
        dibujarGrafo(4);
      }
      if (pasoR == (tam + 1)) {
        dibujarGrafo(2);
      }
      pasoR++;
    }, 500);


  }
  else if (pasoL == -1) {
    setTimeout(function () {
      dibujarGrafo(6);
      anime({
        targets: '#elemento' + 0,
        backgroundColor: '#b9b3f5',
      });

    }, 100);
    setTimeout(function () {
      anime({
        targets: '#elemento' + 1,
        backgroundColor: '#3f51b5',
      });

    }, 500);
  }
  else {
    console.log("iteracionL" + pasoL);
    setTimeout(function () {
      anime({
        targets: '#elemento' + (pasoL + 1),
        backgroundColor: '#b9b3f5',
      });
    }, 100);
    setTimeout(function () {
      dibujarGrafo(5);
      anime({
        targets: '#elemento' + pasoL,
        backgroundColor: '#3f51b5',
      });
      if (pasoL == 0) {
        dibujarGrafo(3);
      }
      pasoL--;
    }, 500);

  }

}

function recorrerDerecha(i, tam) {
  let delay = 3000 - $("#myRange").val();
  if (i < tam) {

    console.log("iteracionf" + i);
    setTimeout(function () {
      anime({
        targets: '#elemento' + (i - 1),
        backgroundColor: '#b9b3f5',
      });

    }, (i * delay) + 100);
    setTimeout(function () {

      if ($('#elemento' + i).text() == "a") {
        $('#elemento' + i).text("a");
        dibujarGrafo(1);
      }
      if ($('#elemento' + i).text() == "b") {
        $('#elemento' + i).text("a");
        dibujarGrafo(4);
      }
      anime({
        targets: '#elemento' + i,
        backgroundColor: '#3f51b5',
      });

    }, (i * delay) + 500);
    i++;
    recorrerDerecha(i, tam);
  } else {
    leerVacioDerecha(i);
  }
}

function leerVacioDerecha(i) {
  console.log(i);
  let delay = 3000 - $("#myRange").val();
  setTimeout(function () {
    anime({
      targets: '#elemento' + (i),
      backgroundColor: '#b9b3f5',
    });
  }, (i * delay) + 100);
  setTimeout(function () {
    dibujarGrafo(2);
    anime({
      targets: '#elemento' + (i + 1),
      backgroundColor: '#3f51b5',
    });

  }, (i * delay) + 500);
  console.log(i);

  recorrerIzquierda(i + 1, i + 1);
}

function recorrerIzquierda(i, j) {
  let delay1 = 3000 - $("#myRange").val();
  console.log(i, j);
  if (i > 1) {
    console.log("iteracion" + (i + 1));
    setTimeout(function () {
      dibujarGrafo(5);
      anime({
        targets: '#elemento' + (i + 1),
        backgroundColor: '#b9b3f5',
      });
    }, (j * delay1) + 100);
    setTimeout(function () {
      anime({
        targets: '#elemento' + (i),
        backgroundColor: '#3f51b5',
      });
    }, (j * delay1) + 500);
    i--;
    j++;
    recorrerIzquierda(i, j);
  } else {
    leerVacioIzquierda(j);
  }


}


function leerVacioIzquierda(i) {
  let delay2 = 3000 - $("#myRange").val();
  setTimeout(function () {
    dibujarGrafo(3);
    anime({
      targets: '#elemento1',
      backgroundColor: '#b9b3f5',
    });
  }, (i * delay2) + 100);
  setTimeout(function () {
    anime({
      targets: '#elemento0',
      backgroundColor: '#3f51b5',
    });
  }, (i * delay2) + 500);

  i++;
  setTimeout(function () {
    anime({
      targets: '#elemento0',
      backgroundColor: '#b9b3f5',
    });
  }, (i * delay2) + 100);
  setTimeout(function () {
    dibujarGrafo(6);
    anime({
      targets: '#elemento1',
      backgroundColor: '#3f51b5',
    });
  }, (i * delay2) + 500);

}