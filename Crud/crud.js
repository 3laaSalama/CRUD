document.addEventListener('DOMContentLoaded', function () {
    const itemForm = document.getElementById('itemForm');
    const itemInput = document.getElementById('itemInput');
    const searchInput = document.getElementById('searchInput');
    const itemList = document.getElementById('itemList');

    // Load items from local storage
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        itemList.innerHTML = '';
        items.forEach((item, index) => createListItem(item, index));
    };

    // Create list item
    const createListItem = (item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editItem(index));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(index));
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        itemList.appendChild(li);
    };

    // Add item
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newItem = itemInput.value.trim();
        if (newItem) {
            const items = JSON.parse(localStorage.getItem('items')) || [];
            items.push(newItem);
            localStorage.setItem('items', JSON.stringify(items));
            itemInput.value = '';
            loadItems();
        }
    });

    // Edit item
    const editItem = (index) => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const newItem = prompt('Edit item:', items[index]);
        if (newItem !== null && newItem.trim() !== '') {
            items[index] = newItem.trim();
            localStorage.setItem('items', JSON.stringify(items));
            loadItems();
        }
    };

    // Delete item
    const deleteItem = (index) => {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        loadItems();
    };

    // Search items
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const items = JSON.parse(localStorage.getItem('items')) || [];
        itemList.innerHTML = '';
        items.filter(item => item.toLowerCase().includes(query))
             .forEach((item, index) => createListItem(item, index));
    });

    loadItems();
});
