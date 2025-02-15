type pizza = {
    name: string
    price: number
}

type order = {
    id: number
    pizza: pizza
    status: string
}

const menu = [
    { name: 'Margherita', price: 8 },
    { name: 'Pepperoni', price: 9 },
    { name: 'Hawaiian', price: 10 },
    { name: 'Veggie', price: 11 },
  ]
  
  let cashInRegister = 100;
  let orderId = 1;
  const orderQueue: order[] = [];
  
  function addNewPizza(name: string, price: number) {
    menu.push({name, price})
  }
  
  function pizzaOrder(name: string) {
    for (let pizza of menu) {
      if (name === pizza.name) {
        cashInRegister = cashInRegister + pizza.price;
        orderQueue.push({id: orderId++, pizza, status: 'ordered'})
      }
    }
  }
  
  function completeOrder(orderId: number) {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.log('invalid ID')
        return
    }
    order.status = 'completed';
    console.log(order.pizza.name, order.status)
    return order
  }
  
  pizzaOrder('Margherita')
  pizzaOrder('Pepperoni')
  pizzaOrder('Hawaiian')
  
  completeOrder(3)
  
  console.log('menu ', menu)
  console.log('cashInRegister', cashInRegister)
  console.log('orderQueue', orderQueue)