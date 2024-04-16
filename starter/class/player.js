const { Character } = require('./character');
const { Food } = require('./food');

class Player extends Character {

  constructor(name, startingRoom, gold = 0) {
    super(name, "main character", startingRoom);
    this.gold = gold;
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);
    if (nextRoom) {
      this.currentRoom = nextRoom;
      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  addItem(item) {
    this.items.push(item);
  }

  eatItem(itemName) {
    const food = this.getItemByName(itemName);
    if (food && food instanceof Food) {
      this.health += food.healing;
      console.log(`${this.name} ate ${food.name} and gained ${food.healing} health.`);
      const itemIndex = this.items.findIndex(item => item.name === itemName);
      this.items.splice(itemIndex, 1);
      this.currentRoom.removeItem(food); // Remove the food item from the room
    } else if (food) {
      console.log(`${food.name} is not edible.`);
    } else {
      console.log(`${this.name} does not have ${itemName}.`);
    }
  }

  dropItem(itemName) {
    const itemIndex = this.items.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
      const droppedItem = this.items.splice(itemIndex, 1)[0];
      this.currentRoom.items.push(droppedItem);
      console.log(`${this.name} dropped ${droppedItem.name}.`);
    } else {
      console.log(`${this.name} does not have ${itemName}.`);
    }
  }
  takeItem(item) {
    console.log("Taking item:", item);
    this.items.push(item);
    console.log("Player items after taking item:", this.items);
    this.currentRoom.removeItem(item);
    console.log("Room items after removing item:", this.currentRoom.items);
}


  getItemByName(name) {
    return this.items.find(item => item.name === name);
  }

  hit(name) {
    const target = this.currentRoom.getCharacterByName(name);
    if (target && target !== this) {
      target.applyDamage(this.strength);
      console.log(`${this.name} hits ${target.name} for ${this.strength} damage.`);
    } else {
      console.log(`${name} is not a valid target.`);
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
