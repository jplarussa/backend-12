// CommonJS
const socket = io();


const textIn = document.getElementById("textIn");
const log = document.getElementById("log");

Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
})

textIn.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {

        socket.emit("message", textIn.value);

        textIn.value = "";
    }
});

socket.on("log", data => {

    let logs = "";

    data.logs.forEach(log => {

        logs += `${log.socketid} dice: ${log.message}<br/>`;
    });
    log.innerHTML = logs;
});


