// funcion para validar un email.
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// funcion para validar que el numero no contega letras, si permite el caracter +
const validateNumber = (number) => {
  const re = /^[0-9+]+$/;
  return re.test(number);
};



console.log("archivo de js para enviar formulario y conexion a servidor.");

const btnSendEmail = document.getElementById("btnSendEmail");
const name = document.getElementById("name");
const lastName = document.getElementById("last-name");
const mail = document.getElementById("mail");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const formLabel = "parcelasForm";

let alertPlaceholder = document.getElementById("liveAlertPlaceholder");
let alertTrigger = document.getElementById("liveAlertBtn");

function alert(message, type) {
  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert" >' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  alertPlaceholder.append(wrapper);
}

if (alertTrigger) {
  alertTrigger.addEventListener("click", function () {
    // alert("Nice, you triggered this alert message!", "success");
    alert("Error, ocurrio un error con el formuliario, intente nuevamente!", "danger");
  });
}

btnSendEmail.addEventListener("click", async () => {
  const data = {
    name: name.value,
    lastName: lastName.value,
    mail: mail.value,
    phone: phone.value,
    message: message.value,
    formLabel,
  };
  // console.log(data);

  // validate that all fields are filled
  if (
    name.value === "" ||
    lastName.value === "" ||
    mail.value === "" ||
    phone.value === "" ||
    message.value === ""
  ) {
    alert("Error, todos los campos son obligatorios!", "warning");
    return;
  } else if (!validateEmail(mail.value)) {
    alert("Error, el formato del email es incorrecto!", "warning");
    return;
  } else if (!validateNumber(phone.value)) {
    alert("Error, el formato del numero es incorrecto!", "warning");
    return;
  }


  /** const apiResponse = await fetch("https://ec2-54-209-94-151.compute-1.amazonaws.com:5000/demo", {
  method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch(err => {
      console.log("error conexion api aws");
      console.log(err);
    }) 

    */
  const apiResponse = await fetch("https://itagra-api.herokuapp.com/demo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await apiResponse.json();
  console.log("response");
  console.log(response);

  if (response.status === "ok") {
    alert("Alguien del equipo de ventas te contactará lo más pronto posible.", "success");
    name.value = "";
    lastName.value = "";
    mail.value = "";
    phone.value = "";
    message.value = "";
  } else if (response.status === "error") {
    alert(
      "Ocurrio un error al enviar el formulario, por favor intente nuevamente"
    );
  }





  // fetch("https://itagra-api.herokuapp.com/demo", {
  // fetch("http://localhost:3000/demo", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //     if (data.status === "success") {
  //       alert("Email enviado");
  //       name.value = "";
  //       lastName.value = "";
  //       mail.value = "";
  //       phone.value = "";
  //       message.value = "";
  //     } else if (data.status === "error") {
  //       alert("Error al enviar el email");
  //     }
  //   }).catch((err) => {
  //     alert('Ocurrio un error inesperado, porfavor recargue e intente nuevamente');
  //   });
});