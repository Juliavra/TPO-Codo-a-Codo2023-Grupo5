let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let mensaje = "Error inicial",
  nombre = document.getElementById("nombre"),
  email = document.getElementById("email"),
  asunto = document.getElementById("asunto"),
  comentario = document.getElementById("comentario"),
  terminos = document.getElementById('terminos'),
  spam = document.getElementById('spam'),
  errorMsg = classes("error"),
  successIcon = classes("success-icon"),
  failureIcon = classes("failure-icon");

/*---una manera de enviar el formulario------*/
/*
document.getElementById("submit").onclick = function () {
validateForm();
}
*/
/*--otra manera de enviar el formulario------ */
/*
function validarFormulario(evento){
  evento.preventDefault();
  alert("todo lo que la validacion requiera se agrega debajo a esta funcion ");
     this.submit();// PARA ENVIAR
}
*/
/*UNA TERCERA------------------------- */
/*
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("form").addEventListener('submit', validarFormulario());
});*/

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  var formulario = new Object();
  formulario.nombre = document.getElementById("nombre");
  formulario.email = document.getElementById("email");
  formulario.asunto = document.getElementById("asunto");
  formulario.comentario = document.getElementById("comentario");
  formulario.terminos = document.getElementById('terminos');
  formulario.spam = document.getElementById('spam');
  let email_trim = email.value.trim();
  let nombre_trim = nombre.value.trim();
  let asunto_trim = asunto.value.trim();
  let comentario_trim = comentario.value.trim();
  let mensaje = "Error inicial";
  const queryAllSuccess = document.querySelectorAll(".success-icon");
  const queryAllFailure = document.querySelectorAll(".failure-icon");
  /* CON ESTO SE PUEDE APAGAR ENCENDER POR GRUPOS????*/
  queryAllSuccess[0].style.opacity = "0";
  queryAllFailure[0].style.opacity = "0";

  if (nombre_trim != "") {
    if (nombre_trim.length >= 3) {
      failureIcon[0].style.opacity = "0";
      successIcon[0].style.opacity = "1";
      errorMsg[0].innerHTML = "";
      if (email_trim.value != "" && email_trim.value != "undefined") {
        if (email_trim.search('@') >= 1) {
          let from = email_trim.search('@');
          let dot = email_trim.indexOf('.', from);
          if (dot > from) {
            failureIcon[1].style.opacity = "0";
            successIcon[1].style.opacity = "1";
            errorMsg[1].innerHTML = "";
            if (asunto_trim.length > 0) {
              failureIcon[2].style.opacity = "0";
              successIcon[2].style.opacity = "1";
              errorMsg[2].innerHTML = "";
              if (comentario_trim.length > 0) {
                failureIcon[3].style.opacity = "0";
                successIcon[3].style.opacity = "1";
                errorMsg[3].innerHTML = "";
                if (terminos.checked) {
                  errorMsg[4].innerHTML = "";
                  if (spam.checked) {
                    errorMsg[5].innerHTML = "";
                    mensaje = "todoOk";
                  }
                  else {/* "spam NO PUEDE SER NULO";*/
                    mensaje = "SPAM NO PUEDE SER NULO";
                    errorMsg[5].innerHTML = mensaje;
                  }
                }
                else {/* "terminos NO PUEDE SER NULO";*/
                  mensaje = "TÉRMINOS NO PUEDE SER NULO";
                  errorMsg[4].innerHTML = mensaje;
                }
              }
              else {
                mensaje = "COMENTARIO NO PUEDE SER NULO";
                errorMsg[3].innerHTML = mensaje;
                failureIcon[3].style.opacity = "1";
                successIcon[3].style.opacity = "0";
              }
            }
            else {/* "asunto NO PUEDE SER NULO";*/
              mensaje = "ASUNTO NO PUEDE SER NULO";
              errorMsg[2].innerHTML = mensaje;
              failureIcon[2].style.opacity = "1";
              successIcon[2].style.opacity = "0";
            }
          }
          else {/* Falta un punto luego de @*/
            mensaje = "Falta un punto luego de @";
            errorMsg[1].innerHTML = mensaje;
            failureIcon[1].style.opacity = "1";
            successIcon[1].style.opacity = "0";
          }
        }
        else {/* "Email DEBE CONTENER @";*/
          mensaje = "Email DEBE CONTENER @";
          errorMsg[1].innerHTML = mensaje;
          failureIcon[1].style.opacity = "1";
          successIcon[1].style.opacity = "0";
        }
      }
      else {/*"Email NO PUEDE SER NULO";*/
        mensaje = "Email NO PUEDE SER NULO";
        errorMsg[1].innerHTML = mensaje;
        failureIcon[1].style.opacity = "1";
        successIcon[1].style.opacity = "0";
      }
    }
    else {/* "Nombre menor que tres";*/
      mensaje = "Nombre menor que tres";
      errorMsg[0].innerHTML = mensaje;
      failureIcon[0].style.opacity = "1";
      successIcon[0].style.opacity = "0";
    }
  }
  else {/* "nombre NO PUEDE SER NULO "*/
    mensaje = "NOMBRE NO PUEDE SER NULO ";
    errorMsg[0].innerHTML = mensaje;
    failureIcon[0].style.opacity = "1";
    successIcon[0].style.opacity = "0";

  }
  /* alert(mensaje);*/
  if (mensaje == "todoOk") {
    

    let form = document.createElement('form');
    form.action = 'https://formspree.io/f/mvondkre';
    form.method = 'POST';
    
    let nombre_inner = `<input name = "nombre" value=${nombre_trim}>`;
    let email_inner = `<input name = "email" value=${email_trim}>`;
    let asunto_inner = `<input name = "asunto" value=${asunto_trim}>`;
    let comentario_inner = `<input name = "comentario" value=${comentario_trim}>`;
    let terminos_inner = `<input name = "terminos" value=${terminos.value}>`;
    let spam_inner = `<input name = "spam" value=${spam.value}>`;


    var test_cadena =nombre_inner+ " "+ email_inner+" "+asunto_inner+" "+comentario_inner+" "+terminos_inner+" "+spam_inner; 

    form.innerHTML = test_cadena;

   document.body.append(form);
    form.submit();
    alert(`${mensaje} + "Mensaje Enviado"`);
  }
}