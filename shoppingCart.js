/**
 * Created by maine on 13/03/2020.
 */
class ShoppingCart {
    pricingRules = []
    items = []
    total = 0

    constructor(pricingRules) {
        this.pricingRules = pricingRules;
    }

    get items() {
        return this.items;
    }

    get total() {
        return this.total;
    }

    add(item) {
        this.items.push(item)
    }

    applyRules(cart, promoCode) {
        var rules = this.pricingRules
        for (var i = 0; i < rules.length; i++) {
            rules[i](cart, promoCode)
        }
        console.log(cart.items)
    }
}

// A 3 for 2 deal on Unlimited 1GB Sims. So for example, if you buy 3
// Unlimited 1GB Sims, you will pay the price of 2 only for the first month.
function firstRule(cart) {
    var items = cart.items
    var size = 0, price = 0
    for (index in items) {
        if (items[index].code == "ult_small") {
            size = size + 1
            price = items[index].price
        }
    }
    var totalDiscounted = size / 3
    cart.total = price * (size - Math.floor(totalDiscounted))
}

// The Unlimited 5GB Sim will have a bulk discount applied; whereby the
// price will drop to $39.90 each for the first month, if the customer buys
// more than 3.
function secondRule(cart) {
    var total = cart.total
    var items = cart.items
    var size = 0, price = 0
    for (index in cart.items) {
        if (items[index].code == "ult_large") {
            size = size + 1
            price = items[index].price
        }
    }
    if (size > 3) {
        price = 39.90
    }
    cart.total = total + (price * size)
}

// We will bundle in a free 1 GB Data-pack free-of-charge with every
// Unlimited 2GB sold.
function thirdRule(cart) {
    var total = cart.total
    var items = cart.items
    var size = 0, freeCount = 0, price = 0
    for (index in items) {
        if (items[index].code == "ult_medium") {
            size = size + 1
            price = items[index].price
        }
        if (items[index].code == "1gb" && items[index].price == 0) {
            freeCount = freeCount + 1
        }
    }
    if (size > freeCount) {
        var diff = size - freeCount
        for(i = 1; i <= diff; i++) {
            cart.items.push({
                code: "1gb",
                title: "1 GB Data-pack",
                price: 0
            })
        }
    }
    cart.total = total + (price * size)
}

// Adding the promo code 'I<3AMAYSIM' will apply a 10% discount across
// the board.
function fourthRule(cart, promoCode) {
    var total = cart.total
    var items = cart.items
    var size = 0, price = 0, discount = 0
    for (index in items) {
        price = items[index].price
        if (items[index].code == "1gb" && price != 0) {
            size = size + 1
        }
    }

    total = total + (price * size)
    if (promoCode) {
        discount = total * .10
    }
    cart.total = total - discount
}

