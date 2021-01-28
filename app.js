
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')

// templates
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCart= document.getElementById('template-cart').content

//fragments
const fragment = document.createDocumentFragment()

let cart = {} //items added to cart

document.addEventListener('DOMContentLoaded', () => fetchData())

// listen to btn clicks
cards.addEventListener('click', e => {
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
  cards.appendChild(fragment)
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
    price: obj.querySelector('p').textContent,
    amount: 1,
  }
  if (cart.hasOwnProperty(product.id)) {
    product.amount = cart[product.id].amount + 1
  }
  cart[product.id] = {...product}
  //console.log(cart);
  pintarCart()
}

const pintarCart = () => {
  //console.log(cart);
  items.innerHTML = ''
  Object.values(cart).forEach(product => {
    templateCart.querySelector('th').textContent = product.id
    templateCart.querySelector('td').textContent = product.title
    templateCart.querySelectorAll('td')[1].textContent = product.amount
    templateCart.querySelector('.btn-info').dataset.id = product.id
    templateCart.querySelector('.btn-danger').dataset.id = product.id
    templateCart.querySelector('span').textContent = product.amount * product.price

    const clone = templateCart.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
  pintarFooter()

}
// this is something small so it doesn't require the use of fragment, it barely affects the reflow
const pintarFooter = () => {
  footer.innerHTML = ''
  if (Object.keys.length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `
  } 
  
  const nAmount = Object.values(cart).reduce( (mem, {amount}) => mem + amount, 0)
  const nPrice = Object.values(cart).reduce((mem, {amount, price}) => mem + amount*price, 0)
  //console.log(cart, nAmount, nPrecio);
  templateFooter.querySelector('td').textContent = nAmount
  templateFooter.querySelector('span').textContent = nPrice

  const clone = templateFooter.cloneNode(true)
  footer.appendChild(clone)
}