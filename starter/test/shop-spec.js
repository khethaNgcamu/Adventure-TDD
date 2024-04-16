const { expect } = require('chai');
const { Room } = require("../class/room.js");
const {Player} = require("../class/player");
const {Shop} = require("../class/shop");
const {Item} = require("../class/item");

describe("Shop", function(){
    let player;
    let shop;

    beforeEach(() => {
        player = new Player("Player", new Room("Test Room", "A test room"));
        shop = new Shop("Shop", "description");
    });

    it("should allow player to buy an item from the shop", () => {
        //arrange
        const item = new Item("sword", 10);
        shop.addItem(item); //add item to the shop

        const initialGold = player.gold;

        //act
        shop.buyItem(player, item);

        //assert
        expect(player.items).to.include(item);
        expect(player.gold).to.equal(initialGold - item.price);
    });

    it('should allow player to sell an item to the shop', () => {
        // Arrange
        const item = new Item('Sword', 10); // Create an item to sell
        player.addItem(item); // Add item to player's inventory
        const initialGold = player.gold;
    
        // Act
        shop.sellItem(player, item);
    
        // Assert
        expect(player.items).to.not.include(item);
        expect(player.gold).to.equal(initialGold + item.price);
    })

    it('should update player\'s gold when buying an item and selling an item', () => {
        // Arrange
        const item = new Item('Sword', 10); // Create an item to buy
        shop.addItem(item); // Add item to the shop
    
        const initialGold = player.gold;
    
        // Act
        shop.buyItem(player, item);
        const goldAfterBuying = player.gold;
    
        shop.sellItem(player, item);
        const goldAfterSelling = player.gold;
    
        // Assert
        expect(goldAfterBuying).to.equal(initialGold - item.price);
        expect(goldAfterSelling).to.equal(initialGold);
      });

      it('should have correct items available for purchase', () => {
        // Arrange
        const item1 = new Item('Sword', 10);
        const item2 = new Item('Shield', 15);
        shop.addItem(item1);
        shop.addItem(item2);
    
        // Act
        const availableItems = shop.getAvailableItems();
    
        // Assert
        expect(availableItems).to.include(item1);
        expect(availableItems).to.include(item2);
      });
})