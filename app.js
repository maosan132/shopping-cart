

const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

let cart = {} //items added to cart

document.addEventListener('DOMContentLoaded', () => fetchData())

// listen to btn clicks
items.addEventListener('click', e => {
  addCart(e)
})

const fetchData = async () => {
  try {
    const res = await fetch('api.json')
    const data = await res.json()
    console.log(data);
    pintarCards(data)
  } catch (error) {
    console.log(error)
  } 
}

const pintarCards = data => {
  data.forEach(producto => {
    templateCard.querySelector('h5').textContent = producto.title
    templateCard.querySelector('p').textContent = producto.precio
    templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl)
    templateCard.querySelector('button').dataset.id = producto.id

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
}
// Actions on btn clicks
const addCart = e => {
  // console.log(e.target)
  // console.log(e.target.classList.contains('btn-dark'))
  if (e.target.classList.contains('btn-dark')) {
    //console.log(e.target.parentElement)
    setCart(e.target.parentElement)
  } 
  e.stopPropagation()
}
//add new products to cart object 
const setCart = obj => {
  //console.log(obj)
  const product = {
    id: obj.querySelector('.btn-dark').dataset.id,
    title: obj.querySelector('h5').textContent,
    precio: obj.querySelector('p').textContent,
    amount: 1,
  }
  if (cart.hasOwnProperty(product.id)) {
    product.amount = cart[product.id].amount + 1
  }
  cart[product.id] = {...product}
  console.log(cart);
}