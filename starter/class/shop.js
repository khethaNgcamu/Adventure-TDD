const { Room } = require('./room');

class Shop extends Room {

  constructor(name, description) {
    super(name, description);
    this.items = []; // Initialize shop items
    this.gold = 0; // Initialize shop's gold
  }

  // Add item to the shop
  addItem(item) {
    this.items.push(item);
  }

  // Remove item from the shop
  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  
  buyItem(player, item) {
    const playerGold = player.gold;
    const itemPrice = item.price;

    if (playerGold >= itemPrice) {
        player.gold -= itemPrice;
        player.takeItem(item);
        this.gold += itemPrice; // Deduct the item's price from the shop's gold
        this.removeItem(item); // Remove the item from the shop's inventory
    } else {
        console.log("You don't have enough gold to buy this item.");
    }
}

sellItem(player, item) {
    const playerGold = player.gold;
    const itemPrice = item.price;

    if (this.gold >= itemPrice) {
        player.gold += itemPrice;
        player.dropItem(item.name);
        this.gold -= itemPrice; // Deduct the item's price from the shop's gold
        this.addItem(item); // Add the item back to the shop's inventory
    } else {
        console.log("The shop doesn't have enough gold to buy this item.");
    }
}

  // Get available items in the shop
  getAvailableItems() {
    return this.items;
  }
}

module.exports = {
  Shop,
};
