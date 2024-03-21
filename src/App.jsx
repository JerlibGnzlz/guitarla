import { useEffect, useState } from "react";
import { Guitar } from "./Guitar";
import { Header } from "./components/Header";
import { db } from "./data/db";


function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // useEffect(() => {
  //   const cartString = JSON.stringify(cart);
  //   localStorage.setItem("cart", cartString);
  // }, [cart]);



  function addTocart(item) {

    const itemExist = cart.findIndex(guitar => guitar.id === item.id);

    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      const copyCart = [...cart];
      copyCart[itemExist].quantity++;
      setCart(copyCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }

  }

  function removeFronCart(id) {
    setCart(cart => cart.filter(guitar => guitar.id !== id));
  }


  function incrementarQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function uncrementarQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    setCart(updatedCart);
  }


  function clearCart() {
    setCart([]);
  }





  return (
    <>
      <Header
        cart={cart}
        removeFronCart={removeFronCart}
        incrementarQuantity={incrementarQuantity}
        uncrementarQuantity={uncrementarQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {db.map((guitar) => (
            <>
              <Guitar
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addTocart={addTocart}
              />
            </>
          ))}
        </div>
      </main >


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

export default App;
