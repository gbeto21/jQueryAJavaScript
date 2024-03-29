console.log('Hola mundo.')

// const cambiarAMayusculas = (pCadena) => pCadena.toUpperCase()
const getUser = new Promise(function (usuarioCorrecto, usuarioIncorrecto) {

  setTimeout(function () {
    //Después de 3 segundos ejecutará lo que ponemos aquí.
    usuarioCorrecto('Se obtuvo el usuario correctamente')
    // usuarioIncorrecto('Se acabó el tiempo de respuesta.')
  }, 3000)

})

const getUserDelay = new Promise(function (usuarioCorrecto, usuarioIncorrecto) {

  setTimeout(function () {
    // usuarioCorrecto()
    usuarioCorrecto('Se obtuvo el usuario delay correctamente.')
  }, 5000)

})

// getUser
//   .then(function () { console.log('Usurio obtenido correcto.') })
//   .catch(function (pMensaje) { console.log(pMensaje) })

// Promise.all([getUser, getUserDelay])
//   .then(function (pMensaje) {
//     console.log(pMensaje)
//   })
//   .catch(function (pMensaje) {
//     console.log(pMensaje)
//   })

//.race: obtendrá ejecutará la promesa que termine primero, las demás 
//no se ejecutarán.
// Promise.race([getUser, getUserDelay])
//   .then(function (pMensaje) {
//     console.log(pMensaje)
//   })
//   .catch(function (pMensaje) {
//     console.log(pMensaje)
//   })

//Intérvalos en JS
//setInverval
//setTimeout

//En jQuery se tiene una variable local llamada: $

//UTILIZAR AJAX PARA OBTENER UN USUARIO RANDOM.
//Configuración ajax:
//$.ajax('url', configuracionObjeto) 
//$.ajax('url', {})
const ObtenerUsuarioAjax = () => {

  $.ajax('https://randomuser.me/api/qiefoj', {
    method: 'GET',
    /*Primer manera*/
    // success: function (data) {
    //   console.log(data)
    // },
    success: data => console.log(data),//2da manera.
    error: datoError => { console.log(datoError) }
  })
}

//UTILIZAR JS PARA OBTENER UN USUARIO
//XMLHttpRequest - fetch
let usuarioObtenido;
// function ObtenerUsuarioJS() {

// const cambiarAMayusculas = (pCadena) => pCadena.toUpperCase()

fetch('https://randomuser.me/api/')
  .then(
    // (respuesta) => respuesta.json()
    function (response) {
      return response.json()
    })
  .then(function (user) {
    console.log('Usuario: ', user.results[0].name.first)
  })
  .catch(function () {
    console.log('algo falló')
  });
// .then(usuario => { 
//   console.log('usuario:', usuario.results[0])
//   // usuarioObtenido = usuario 
// })//El método response, 
//tiene la propiedad: JSON que es la información obtenida.
//Segunda forma.
// .then(function (respuesta) {
//   console.log(respuesta)
// })
//}

// ObtenerUsuarioJS()


async function LoadUsers() {

  console.log('Obtener usuarios')

  const urlUsuarios = 'https://randomuser.me/api/'
  const $playListFriends = document.getElementById('playlistFriends')

  async function getUser(url) {
    const promerUser = await fetch(urlUsuarios)
    const userData = await promerUser.json()
    if (userData.results.length > 0)
      return userData

    throw new Error('Error obteniendo el usuario')
  }

  function crearHTMLUsuario(usuario) {
    return (`
      <li class="playlistFriends-item">
        <a href="#">
          <img src="${usuario.picture.medium}" alt="echame la culpa" />
          <span>
            ${usuario.name.first} ${usuario.name.last}
          </span>
        </a>
      </li>`)
  }

  let htmlUsuarios = ''
  for (let cantidadUsuarios = 0; cantidadUsuarios < 8; cantidadUsuarios++) {
    let informacionUsuario = await getUser(urlUsuarios)
    let usuario = informacionUsuario.results[0]
    htmlUsuarios += crearHTMLUsuario(usuario)
  }

  $playListFriends.innerHTML = htmlUsuarios
}

(async function load() {
  //await
  //action
  //teror
  //animation
  const proxy = "https://cors-anywhere.herokuapp.com/";
  async function getData(url) {
    const respuesta = await fetch(proxy + url)
    const data = await respuesta.json()
    if (data.data.movie_count > 0)
      return data

    throw new Error('No se encontró ningun resultado')
    // debugger
  }

  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  const $featuringContainer = document.getElementById('featuring')

  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  const BASE_API = 'https://yts.am/api/v2/'

  function featuringTemplate(peli) {
    return (
      `
  <div class="featuring">
                <div class="featuring-image">
                    <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
                </div>
                <div class="featuring-content">
                    <p class="featuring-title">Pelicula encontrada</p>
                    <p class="featuring-album">${peli.title}</p>
                </div>
            </div>
      `
    )
  }

  $form.addEventListener('submit', async (event) => {
    event.preventDefault()
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    // debugger
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    // debugger
    $featuringContainer.append($loader)

    const data = new FormData($form)

    try {

      const {
        data: {
          movies: pelis
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term= ${data.get('name')}`)
      const HTMLString = featuringTemplate(pelis[0])
      $featuringContainer.innerHTML = HTMLString

    }
    catch (error) {
      alert(error.message)
      $loader.remove()
      $home.classList.remove('search-active')
    }

  })

  //https://yts.am/api/v2/list_movies.json?genre=action


  // let terrorList;
  // getData('https://yts.lt/api/v2/list_movies.json')
  //   .then(function (data) {
  //     console.log('Lista terror:', data)
  //     terrorList = data
  //   })
  // console.log(actionList, dramaList, animationList)

  /* Selectores utilizando jQuery.*/
  // const $home = $('.home .list #item')

  /* Selectores utilizando JS */
  // const $home = document.getElementById('modal')

  /*Formas de obtener los elementos:
  .getElementById()
  .getElementsByClassName('modal')[0]: se accede al primer elemento obtenido.
  .getElementsByTagName()
  .getElementsBy
  .querySelector('.myPlaylist-item') -> obtiene el primer elemento que coincide.
  .querySelectorAll('.myPlaylist-item') -> Obtiene todos los elementos que coincidan con la especificación.
  
  */

  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')

  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')

  function findById(list, id) {
    return list.find(movie => movie.id === parseInt(id, 10))
  }

  function findMovie(id, category) {
    switch (category) {
      case 'action': {
        return findById(actionList, id)
      }

      case 'drama': {
        return findById(dramaList, id)
      }

      case 'animation': {
        return findById(animationList, id)
      }
    }
  }

  function showModal($element) {

    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const category = $element.dataset.category
    const data = findMovie(id, category)
    $modalTitle.textContent = data.title
    $modalImage.setAttribute('src', data.medium_cover_image)
    $modalDescription.textContent = data.description_full
  }

  function hideModal() {

    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'

  }

  $hideModal.addEventListener('click', hideModal)



  function videoItemTemplate(movie, category) {
    return (
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
     <div class="primaryPlaylistItem-image">
     <img src="${movie.medium_cover_image}">
     </div>
     <h4 class="primaryPlaylistItem-title">
     ${movie.title}
     </h4>
     </div>`
    )
  }

  function createTemplate(HTMLString) {

    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML = HTMLString
    return html.body.children[0]
  }

  function addEventClick($element) {
    $element.addEventListener('click', () => {
      showModal($element)
    })
  }

  function renderMovieList(list, $container, category) {
    $container.children[0].remove()
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
      const image = movieElement.querySelector('img')
      image.addEventListener('load', (event) => {
        event.srcElement.classList.add('fadeIn')
      })
      movieElement.classList.add('fadeIn')
      addEventClick(movieElement)
    })
  }

  async function cacheExist(category) {
    const listName = `${category}List`
    const cacheList = window.localStorage.getItem(listName)
    if (cacheList)
      return JSON.parse(cacheList)

    const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
    window.localStorage.setItem(listName, JSON.stringify(data))
    return data
  }

  // const { data: { movies: actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`)
  const actionList = await cacheExist('action')
  // window.localStorage.setItem('actionList', JSON.stringify(actionList))
  const $actionContainer = document.querySelector('#action')
  renderMovieList(actionList, $actionContainer, 'action')

  // const { data: { movies: dramaList } } = await getData(`${BASE_API}list_movies.json?genre=drama`)
  const dramaList = await cacheExist('drama')
  // window.localStorage.setItem('dramalist', JSON.stringify(dramaList))
  const $dramaContainer = document.getElementById('drama')
  renderMovieList(dramaList, $dramaContainer, 'drama')

  // const { data: { movies: animationList } } = await getData(`${BASE_API}list_movies.json?genre=animation`)
  // window.localStorage.setItem('animationList', JSON.stringify(animationList))
  const animationList = await cacheExist('animation')
  const $animationContainer = document.getElementById('animation')
  renderMovieList(animationList, $animationContainer, 'animation')

  //Crear un elemento html en el browser con jQuery.
  // '<div class="primaryPlaylistItem">' +
  //   '< div class="primaryPlaylistItem-image" >' +
  //   '<img src="src/images/covers/midnight.jpg">' +
  //   '</div>' +
  //   '<h4 class="primaryPlaylistItem-title">' +
  //   'Titulo de la peli' +
  //   '</h4></div> '

  LoadUsers()

})()