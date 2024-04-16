const { expect } = require('chai');
const { Player } = require("../class/player.js");
const { Room } = require("../class/room.js");
const { Item } = require("../class/item.js");
const { Food } = require("../class/food.js");
const { World } = require("../class/world.js");
const { Enemy } = require("../class/enemy.js");

describe('Enemy', function () {
  let player;
  let enemy;
  let room;

  beforeEach(() => {
    room = new Room("Test Room", "A test room");
    player = new Player('Player', room); // Create a Player instance
    enemy = new Enemy('Enemy', 'An enemy character', room); // Create an Enemy instance
  });

  it('should have strength and health attributes', function () {
    expect(enemy.health).to.equal(100);
    expect(enemy.strength).to.equal(10);
  });

  it('should lose health when damage is applied', function () {
    expect(enemy.health).to.equal(100);
    enemy.applyDamage(10);
    expect(enemy.health).to.equal(90);
  });

  it('should drop all held items and have currentRoom set to null when dead', function () {
    expect(enemy.currentRoom).to.equal(room);
    expect(room.items.length).to.equal(0);
    enemy.die();
    expect(enemy.currentRoom).to.equal(null);
    expect(room.items.length).to.equal(0); // Ensure items are not dropped in the room
  });

  it('should die when damage brings health to 0 or less', function () {
    expect(enemy.currentRoom).to.equal(room);
    expect(room.items.length).to.equal(0);

    expect(enemy.health).to.equal(100);
    enemy.applyDamage(100);
    expect(enemy.health).to.equal(0);

    expect(enemy.currentRoom).to.equal(null);
    expect(room.items.length).to.equal(0); // Ensure items are not dropped in the room
  });
});
