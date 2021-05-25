import React from 'react';
import { Route } from 'react-router';


import { Header } from './components';
import { Home, Cart } from './pages';


function App() {

  // window.test = () => {
  //   axios.get('http://localhost:3000/db.json').then(({ data }) => {
  //     dispatch(setPizzas(data.pizzas));
  //   });
  // }

  return  <div className="wrapper">
    <Header />
    <div className="content">
      <Route  exact path='/'
              component={Home}/>
      <Route  path='/cart'
              component={Cart}/>
    </div>
  </div>
}

export default App;