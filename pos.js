var total = 0;
var itemId = document.getElementById("itemId"),
    id = ["Ap01", "ba02", "Or56"];
const name = ["Apple", "Banana", "Orange"];
price = [30, 50, 25];

for (var i = 0; i < id.length; i++) {
    var option = document.createElement("OPTION"),
        txt = document.createTextNode(id[i]);
    option.appendChild(txt);
    option.setAttribute("value", id[i]);
    itemId.insertBefore(option, itemId.lastChild);
}

function myfunction() {
    var itemId = document.getElementById("itemId").value;

    console.log(itemId);
    for (var i = 0; i < id.length; i++) {
        if (id[i] === itemId) {
            var itemname = name[i];
            var itemprice = price[i];
            document.querySelector('#itemName').value = itemname;
            document.querySelector('#itemPrice').value = itemprice;

        }
    }
}


quantity.oninput = function() {
    document.getElementById('amount').value = itemPrice.value * quantity.value;
};

pay.oninput = function() {
    document.getElementById('returnrs').value = pay.value - total;
};

// DATE AND TIME
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;
document.getElementById('date').innerHTML = dateTime;


class Item {
    constructor(itemId, itemName, itemPrice, quantity, subtotal) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static addItemToList(item) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.itemId}</td>
        <td>${item.itemName}</td>
        <td>${item.itemPrice}</td>
        <td>${item.quantity}</td>
        <td>${item.subtotal}</td>
        <td><button class="btn btn-danger btn-sm delete">DELETE</button></td>    
      `;
        list.appendChild(row);
    }

    static deleteItem(el) {
        if (el.classList.contains('delete')) {
            const sub = el.parentElement.parentElement.childNodes[9].innerText;
            total = total - sub;
            document.getElementById('total').value = total;
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#itemId').value = '';
        document.querySelector('#itemName').value = '';
        document.querySelector('#itemPrice').value = '';
        document.querySelector('#quantity').value = '';
        document.querySelector('#amount').value = '';
    }
}

// Event: Display Items
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Item
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const itemId = document.querySelector('#itemId').value;
    const itemName = document.querySelector('#itemName').value;
    const itemPrice = document.querySelector('#itemPrice').value;
    const quantity = document.querySelector('#quantity').value;
    const subtotal = itemPrice * quantity;
    total = total + subtotal;
    document.getElementById('total').value = total;

    // Validate
    if (itemId === '' || itemName === '' || quantity === '' || itemPrice === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate item
        const item = new Item(itemId, itemName, itemPrice, quantity, subtotal);

        // Add Item to UI
        UI.addItemToList(item);

        // Clear fields
        UI.clearFields();

    }
});

// Event: Remove a Item
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove item from UI
    UI.deleteItem(e.target);

});