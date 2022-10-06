let idActualizar = "";

function obtenerListaPersonas() {

    const registro = document.getElementById("registro");
    const ocultar = document.getElementById("ocultar");
    let input = document.getElementById("inputRegistro");
    const idTable = document.getElementById("idTabla")
    .addEventListener('click', function (e) {
        console.log(e.target.classList[1]);
        if (e.target.classList[1] === "btn") {
            const id = e.target.id;
            const modal = document.getElementById("modalAct");
            idActualizar = id;
            modal.classList.add("hid");
        }
    })

    registro.addEventListener('click', () => {
        input.classList.remove("hid")
        ocultar.classList.remove('hid')
        registro.classList.add("hid")
    })

    ocultar.addEventListener('click', () => {
        input.classList.add("hid")
        ocultar.classList.add('hid')
        registro.classList.remove("hid")
    })
    fetch("http://localhost:8080/api/usuarios")
    .then(respuesta => 
        respuesta.json()
    )
    .then((persona) => mostrarTabla(persona))
}


function obtenerPersona() {
    
    let documento = document.getElementById("documento").value;
    let url="http://localhost:8080/api/usuarios/"+documento;

    if(documento == ""){
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'el campo de documento es requerido',
            confirmButtonText: 'OK'
        })
    }
    else{
        fetch(url)
        .then((respuesta)=>{
            console.log(respuesta);
            if(respuesta.status == 404){
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'el Usuario con este documento no existe',
                    confirmButtonText: 'OK'
                })
                limpiar();
            }
            return respuesta.json();
        }).then( (respuest) => {
            document.getElementById("nombre").value = respuest.nombre;
            document.getElementById("apellido").value = respuest.apellido;
            document.getElementById("telefono").value = respuest.telefono;
            document.getElementById("correo").value = respuest.correo;
        })
    }
}

function registrar(){

    let documento = document.getElementById("documento").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let input = document.getElementById("inputRegistro");

    input.classList.remove("hid");

    if(documento === "" || nombre === "" || apellido === "" || telefono === "" || correo === ""){
        Swal.fire({
            title: 'Error!',
            text: 'asegurse de llenar todos los campos',
            icon: 'info',
            confirmButtonText: 'OK'
        })
    }
    else{
        let url="http://localhost:8080/api/usuarios";

        fetch(url,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                documento: documento,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                correo: correo,
            })
        })
        .then((respuesta)=> {
            if(respuesta.status == 201){
                Swal.fire({
                    title: 'Usuario Registrado',
                    text: 'la persona se registro',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                mostrarTabla({documento, nombre, apellido, telefono, correo});
                limpiar();
                obtenerListaPersonas();
            }
            else{
                if(respuesta.status == 404){
                    Swal.fire({
                        title: 'Error!',
                        text: 'la persona se no se pudo resgistrar',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
                else if(respuesta.status == 400){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Verifique el documento no se repita y correo y telefono tengan un formato valido',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
                else{
                    Swal.fire({
                        title: 'Error!',
                        text: 'llene los campos',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }
        })
    }    
}

// const act = document.getElementById("actualizartar")
// .addEventListener('click', actualizar)

function actualizar(e){

    e.preventDefault();
    const form = document.getElementById("formActualizar");
    const data = new FormData(form);
    const info = {
        "documento": data.get("documento"),
        "nombre": data.get("nombre")
    }

    console.log(info);

    // let documento = document.getElementById("documento").value;

    // if(documento == ""){
    //     Swal.fire({
    //         title: 'Error!',
    //         icon: 'error',
    //         text: 'el campo de documento es requerido',
    //         confirmButtonText: 'OK'
    //     })
    // }

    // let nombre = document.getElementById("nombre").value;
    // let apellido = document.getElementById("apellido").value;
    // let telefono = document.getElementById("telefono").value;
    // let correo = document.getElementById("correo").value;

    // if(documento == "" || nombre == "" || apellido == "" || telefono == "" || correo == ""){
    //     Swal.fire({
    //         title: 'Error!',
    //         text: 'asegurse de llenar todos los campos',
    //         icon: 'info',
    //         confirmButtonText: 'OK'
    //     })
    // }else{
    //     let url="http://localhost:8080/api/usuarios/"+documento;
    //     fetch(url,{
    //         method:"PUT",
    //         headers:{
    //             "content-type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             nombre: nombre,
    //             apellido: apellido,
    //             telefono: telefono,
    //             correo: correo
    //         })
    //     })
    //     .then((respuesta)=>{
    //         console.log(respuesta);
    //         if(respuesta.status == 201){
    //             Swal.fire({
    //                 title: 'Usuario Actualizado!',
    //                 text: 'El usuario se actualizo correctamente',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK'
    //             })
    //             limpiar();
    //         }
    //         else if(respuesta.status == 400){
    //             Swal.fire({
    //                 title: 'Error!',
    //                 text: 'El correo es invalido',
    //                 icon: 'warning',
    //                 confirmButtonText: 'OK'
    //             })
    //         }
    //         else{
    //             if(respuesta.status == 404){
    //                 Swal.fire({
    //                     title: 'Error!',
    //                     text: 'Tiene que llenar el campo de documento buscar y actualizar',
    //                     icon: 'warning',
    //                     confirmButtonText: 'OK'
    //                 })
    //             }
    //             else{
    //                 Swal.fire({
    //                     title: 'Error!',
    //                     icon: 'error',
    //                     text: 'Verifique que todo los campos esten llenos y el correo tenga un formato valido',
    //                     confirmButtonText: 'OK'
    //                 })
    //             }
    //         }
    //     }) 
    // }
    
}

function eliminar(){
    let documento=document.getElementById("documento").value;
    let url="http://localhost:8080/api/usuarios/"+documento;

    if(documento == ""){
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Primero busque a la persona que desea eliminar',
            confirmButtonText: 'OK'
        })
    }
    else{
        fetch(url,{
            method:"DELETE",
        })
        .then((respuesta) => {
            console.log(respuesta);
            if(respuesta.status == 200){
                limpiar();
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'la persona se elimino correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
            else if(respuesta.status === 404){
                Swal.fire({
                    title: 'Error!',
                    text: 'No hay ninguna persona con este documento',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
            }
            else{
                if(respuesta.status==204){
                    Swal.fire({
                        title: 'Error!',
                        text: 'la persona se no se pudo eliminar',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
                else{
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }      
        })  
    }
}

function limpiar(){
    document.getElementById("documento").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
}

function mostrarTabla(persona) {
    const divTabla = document.getElementById("data");

    persona.map((elemento, i) => {
        const tr = document.createElement("tr");
        const campo = `
        <td>${elemento.documento}</td>
        <td>${elemento.nombre}</td>
        <td>${elemento.apellido}</td>
        <td>${elemento.telefono}</td>
        <td>${elemento.correo}</td>
        <td>
        <button class="actualizar btn" onclick="actualizar()" id="${elemento.documento}">Actualizar</button>
        <button class="eliminar btn" onclick="eliminar()" id="${elemento.documento}">Eliminar</button>
        </td>
        `;

        tr.innerHTML = campo;
        divTabla.appendChild(tr);
    })

    // let tabla;
    // for (let i = 0; i < persona.length; i++) {
    //     tabla += `
    //         <tr>
    //             <td>${persona[i].documento}</td>
    //             <td>${persona[i].nombre}</td>
    //             <td>${persona[i].apellido}</td>
    //             <td>${persona[i].telefono}</td>
    //             <td>${persona[i].correo}</td>
    //             <td>
    //                 <button class="actualizar" onclick="actualizar()" >Actualizar</button>
    //                 <button class="eliminar" onclick="eliminar()" >Eliminar</button>
    //             </td>
    //         </tr>
    //        `
    // }
    divTabla.innerHTML = tabla;
}

obtenerListaPersonas();