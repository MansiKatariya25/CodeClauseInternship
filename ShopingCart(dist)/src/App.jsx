
import { useState } from 'react'
import './App.css'

function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }; 

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  let [product , setProductlist] = useState(
    [
      { id: 1, name: 'White Casual Sneaker', price: 70, image: './shoe1.png' },
      { id: 2, name: "Mid Top Ankle Boots", price: 90, image: './shoe2.png' },
      { id: 3, name: "Casual slip sneakers", price: 75, image: './shoe3.png' },
      { id: 4, name: "Campus Men's Sneakers", price: 50, image: './shoe4.png' },
      { id: 5, name: 'White Casual Sneaker', price: 70, image: './shoe5.png' },
      { id: 6, name: "Mid Top Ankle Boots", price: 90, image: './shoe6.png' },
      { id: 7, name: "Men's OG-03 Sneakers", price: 75, image: './shoe7.png' },
      { id: 8, name: "Campus Men's Sneakers", price: 50, image: './shoe8.png' }
    ]
  )

  return (
    <>
      <header>
      <nav>
        <div>
          <img src="./logo.png" class="logo" />
        </div>
        <ul className="nav-links">
            <li><a href="3">Home</a></li>
            <li><a href="3">Categories</a></li>
            <li><a href="3">About Us</a></li>
          </ul>
      </nav>
      </header>
      <section className="container">

        <div className="left">
          <section className="row1">
          {product.map(product => (
            <div className="card" key={product.id}>
              <img src={product.image} class="product-image" />
                <div class="card-content">
                    <h3>{product.name}</h3>
                    <p class="price">${product.price}</p>
                    <button class="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>))}
              
          </section>

        </div>

        <div className="right">
          <div className="card-right">
            <h1>Cart</h1>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} className="cart-item-image" alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)} class="minus">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} class="plus">+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
            <h2 className="total">Total: ${totalPrice.toFixed()}</h2>
          </div>
          </div>
      </section>
      
    </>
  )
}
export default App
