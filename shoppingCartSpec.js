/**
 * Created by maine on 14/03/2020.
 */
describe('Testing the functionality, this is the checklist', ()=>{
    it('should add an item', ()=>{
    let cart = new ShoppingCart()
    var item = {
        code: "example_code",
        title: "example title",
        price: 23
    }

    const done = cart.add(item)
    expect(cart.items.length).toBe(1)
})

it('should check first rule', ()=>{
    let cart = new ShoppingCart([firstRule])
    var items = [
        {
            code: "ult_small",
            title: "Unlimited 1GB",
            price: 24.90
        },
        {
            code: "ult_small",
            title: "Unlimited 1GB",
            price: 24.90
        },
        {
            code: "ult_small",
            title: "Unlimited 1GB",
            price: 24.90
        }
    ]
    cart.items = items
const done = cart.applyRules(cart, false)

expect(cart.total).toBe(49.8)
})

it('should check second rule', ()=>{
    let cart = new ShoppingCart([secondRule])
    var items = [
        {
            code: "ult_large",
            title: "Unlimited 5GB",
            price: 44.90
        },
        {
            code: "ult_large",
            title: "Unlimited 5GB",
            price: 44.90
        },
        {
            code: "ult_large",
            title: "Unlimited 5GB",
            price: 44.90
        },
        {
            code: "ult_large",
            title: "Unlimited 5GB",
            price: 44.90
        }
    ]
    cart.items = items
const done = cart.applyRules(cart, false)

expect(cart.total).toBe(159.6)
})

it('should check third rule', ()=>{
    let cart = new ShoppingCart([thirdRule])
    var items = [
        {
            code: "ult_medium",
            title: "Unlimited 2GB",
            price: 29.90
        },
        {
            code: "ult_medium",
            title: "Unlimited 2GB",
            price: 29.90
        }
    ]
    cart.items = items
const done = cart.applyRules(cart, false)

expect(cart.items.length).toBe(4)
})

it('should check fourth rule', ()=>{
    let cart = new ShoppingCart([fourthRule])
    var items = [
        {
            code: "1gb",
            title: "1 GB Data-pack",
            price: 0
        },
        {
            code: "1gb",
            title: "1 GB Data-pack",
            price: 9.90
        },
        {
            code: "1gb",
            title: "1 GB Data-pack",
            price: 9.90
        }
    ]
    cart.items = items
const done = cart.applyRules(cart, true)

expect(cart.total).toBe(17.82)
})
})