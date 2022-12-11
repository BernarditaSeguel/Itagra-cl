console.log('este es el archivo para hacer la peticion de los emial')
    
    const btnSendEmail = document.getElementById('btnSendEmail');
    btnSendEmail.addEventListener('click', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('name').value;
        const apellido = document.getElementById('last-name').value;
        const telefono = document.getElementById('mail').value;
        const mail = document.getElementById('phone').value;
        const mensaje = document.getElementById('message').value;

        const data = {
            nombre,
            apellido,
            telefono,
            mail,
            mensaje
        }
        console.log('data del formulario');
        console.log(data);


        // usar socket para enviar emial.
    // var socket = io('http://localhost:3000');
    var socket = io('http://localhost:3000', {
        transports: ['websocket']
    });
    socket.emit('message', 'Hello World');
    socket.emit('sendMail', data);
    });



const handleSubmit = (event) => {
    event.preventDefault();
    const myForm = event.target;
    const formData = new FormData(myForm);
    
    fetch("https://api-itagra.herokuapp.com/demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
    
    })
    .then(() => console.log("Form successfully submitted"))
    .catch((error) => alert(error));
};

// document
//     .querySelector("form")
//     .addEventListener("submit", handleSubmit);