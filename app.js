const formulario = document.querySelector("#formulario");
const contenedorEstudiante = document.querySelector("#cardsEstudiantes");
const contenedorProfesor = document.querySelector("#cardsProfesores");
const templateprofesor = document.querySelector("#templateProfesor");
const templateestudiante = document.querySelector("#templateEstudiante");
// inputs
const camponombre = document.querySelector("#nameUser");
const campoage = document.querySelector("#ageUser");
const optionUser = document.querySelector("#optionUser");
const estudiantes = [];
const profesores = [];
// sumbit del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = camponombre.value;
  const edad = campoage.value;
  const tipo = optionUser.value;
  if (tipo === "Estudiante") {
    const estudiante = new Estudiante(nombre, edad);
    console.log(estudiante);
    estudiantes.push(estudiante);
    persona.mostrarPersona(estudiantes, tipo);
  }
  if (tipo === "Profesor") {
    const profesor = new Profesor(nombre, edad);
    console.log(profesor);
    profesores.push(profesor);
    persona.mostrarPersona(profesores, tipo);
  }
});
// delegacion de eventos
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-primary")) {
    estudiantes.map((item) => {
      if (item.id === parseInt(e.target.dataset.id)) {
        item.setestado = true;
        return item;
      }
    });
    persona.mostrarPersona(estudiantes, "Estudiante");
  }
  if (e.target.matches(".btn-danger")) {
    estudiantes.map((item) => {
      if (item.id === parseInt(e.target.dataset.id)) {
        item.setestado = false;
        return item;
      }
    });
    persona.mostrarPersona(estudiantes, "Estudiante");
  }
});
// creo la plantilla persona
class persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.id = Date.now();
  }
  // creo la static para mostrar la card
  static mostrarPersona(arr, tipo) {
    if (tipo === "Estudiante") {
      contenedorEstudiante.textContent = "";
      const fragment = document.createDocumentFragment();
      arr.forEach((item) => {
        fragment.appendChild(item.agregarnuevoestudiante());
      });
      contenedorEstudiante.appendChild(fragment);
    }
    if (tipo === "Profesor") {
      contenedorProfesor.textContent = "";
      const fragment = document.createDocumentFragment();
      arr.forEach((item) => {
        fragment.appendChild(item.agregarnuevoprofesor());
      });
      contenedorProfesor.appendChild(fragment);
    }
  }
}
// extends de persona pero para estudiante
class Estudiante extends persona {
  constructor(nombre, edad, estado = false) {
    super(nombre, edad);
    this.estado = estado;
  }
  set setestado(estado) {
    this.estado = estado;
  }
  agregarnuevoestudiante() {
    const clone = templateestudiante.content.cloneNode(true);
    clone.querySelector("h5 .text-primary").textContent = this.nombre;
    clone.querySelector(".lead").textContent = this.edad;
    if (this.estado) {
      clone.querySelector(".badge").className = "badge bg-success";
      clone.querySelector(".badge").textContent = "Aprobado";
      clone.querySelector(".btn-primary").disabled = true;
      clone.querySelector(".btn-danger").disabled = false;
    } else {
      clone.querySelector(".badge").className = "badge bg-danger";
      clone.querySelector(".badge").textContent = "Reprobado";
      clone.querySelector(".btn-danger").disabled = true;
      clone.querySelector(".btn-primary").disabled = false;
    }
    clone.querySelector(".btn-danger").dataset.id = this.id;
    clone.querySelector(".btn-primary").dataset.id = this.id;
    return clone;
  }
}
// extends de persona pero para profesor
class Profesor extends persona {
  agregarnuevoprofesor() {
    const clone = templateprofesor.content.cloneNode(true);
    clone.querySelector("h5").textContent = this.nombre;
    clone.querySelector(".lead").textContent = this.edad;
    return clone;
  }
}
