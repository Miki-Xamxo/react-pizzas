import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Categories, PizzaBlock, SortPopup, LoadingBlock} from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart'



const categoryName = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ]
const sortName = [  
    { name: 'популярности', type: 'popular', order: 'desc'}, 
    {name: 'цене', type: 'price', order: 'desc'}, 
    { name: 'алфавиту', type: 'name', order: 'asc'}
]


function Home() {
  
  const items  = useSelector(({ pizzas }) => pizzas.items)
  const cartItems = useSelector(({ cart }) => cart.items)
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy))
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback(((index) => {
    dispatch(setCategory(index))
  }), [])
  
  const onSelectSortType = React.useCallback(((type) => {
    dispatch(setSortBy(type))
    console.log(type)
  }), [])

  const handleAddPizzaToCart = obj => {
    dispatch(addPizzaToCart(obj))
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={category} onClickCategory={onSelectCategory}  items={categoryName} />
        <SortPopup activeSortType={sortBy.type} items={sortName} onClickSortType={onSelectSortType}  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
      {
        isLoaded 
        ? items.map(elem => <PizzaBlock addedCoount={cartItems[elem.id] && cartItems[elem.id].items.length} onClickAddPizza={handleAddPizzaToCart} key={elem.id}  {...elem}/>)
        : Array(12).fill(0).map((_, index) => <LoadingBlock key={index} />)
      }
      </div>
    </div>
  )
}

export default Home
