/**
 * Created by maine on 13/03/2020.
 */
var promoCodeVal = false
var totalAmount = 0
var cart = new ShoppingCart([firstRule, secondRule, thirdRule, fourthRule])

// Add to Cart UI
function addToCart(code) {
    var shopItem = event.target.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var item = addItemToCart(code, title, parseFloat(price))
    updateCartTotal(item)
    document.getElementById("cart").style.display = ''
}

function addItemToCart(code, title, price) {
    var item = {
        code: code,
        title: title,
        price: price
    }

    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var quantityItem = document.getElementById(code)
    if (quantityItem) {
        var updatedQuantity = parseInt(quantityItem.value) + 1
        quantityItem.value = updatedQuantity
        if (code == "ult_medium") {
            var freeItem = document.getElementById("1gb_free")
            var gbFreeVal = parseInt(freeItem.value) + 1
            freeItem.value = gbFreeVal
        }
    } else {
        var cartRowContents = `
            <div class="cart-item cart-column">
                <span class="cart-item-title">${title} (${code})</span>
            </div>
            
            <div class="cart-quantity cart-column">
                <input id="${code}" disabled class="cart-quantity-input" value="1">
            </div>`

        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)

        if (code == "ult_medium") {
            cartRow = document.createElement('div')
            cartRow.classList.add('cart-row')
            var cartRowFreeContents = `
            <div class="cart-item cart-column">
                <span class="cart-item-title">1 GB Data-pack (1gb) - Free</span>
            </div>
            
            <div class="cart-quantity cart-column">
                <input id="1gb_free" disabled class="cart-quantity-input" value="1">
            </div>`
            cartRow.innerHTML = cartRowFreeContents
            cartItems.append(cartRow)
        }
    }
    return item
}

function updateCartTotal(item) {
    cart.add(item)
    cart.applyRules(cart, promoCodeVal)
    totalAmount = cart.total.toFixed(2)
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + totalAmount
}

function applyPromo(promoCode) {
    promoCodeVal = promoCode == "I<3AMAYSIM"
    if (promoCodeVal) {
        var discount = totalAmount * .10
        cart.total = totalAmount - discount
        document.getElementsByClassName("cart-total-price")[0].innerText = '$' + cart.total.toFixed(2)
        document.getElementById("btnPromoCode").disabled = true;
        document.getElementById("promoCode").disabled = true;
    } else {
        alert("Invalid promo code")
    }
}