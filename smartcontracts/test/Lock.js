

const { ethers } = require('hardhat');
const { expect, assert } = require("chai");

describe("Heritage", async () => {
  let heritageContract, testContract, heritage, owner, acc1, acc2


  describe('deployment', async () => {
    beforeEach(async function () {
      [owner, acc1, acc2] = await ethers.getSigners();

      heritageContract = await ethers.getContractFactory("Heritage");
      heritage = await heritageContract.deploy();
      await heritage.deployed();


    })
    it("initializes with zero heritage", async () => {
      const hasheritage = await heritage.hasHeritage(owner.address);
      expect(hasheritage).to.be.equal(false);

    })
    it("checks if user has an active heritage", async () => {
      let getheritage = await heritage.hasHeritage(owner.address)
      //  it should return false as owner has not yet created heritage
      expect(getheritage).to.be.equal(false)
    })

  })

  describe("registeration", async () => {
    let heritageID, getheritage
    beforeEach(async function () {
      [owner, acc1, acc2] = await ethers.getSigners();

      heritageContract = await ethers.getContractFactory("Heritage");
      heritage = await heritageContract.deploy();
      await heritage.deployed();

    })
    it("should save the kin's wallet address", async () => {
      await heritage.connect(owner).create(acc1.address, 5);
      getheritage = await heritage.getHeritage(owner.address)
      expect(getheritage.heir).to.be.equal(acc1.address);
    })
    it("should save the checkInterval", async () => {
      await heritage.connect(owner).create(acc1.address, 5);
      getheritage = await heritage.getHeritage(owner.address)
      expect(getheritage.checkInterval).to.be.equal(5);
    })
    it("should update the heritageId on creating a legacy", async () => {
      await heritage.connect(owner).create(acc1.address, 5);

      heritageID = await heritage.heritageId(owner.address);
      expect(heritageID).to.be.equal(1);

    })

  })

  describe("Edit Profile", async () => {
    let getheritage
    beforeEach(async function () {
      [owner, acc1, acc2] = await ethers.getSigners();

      heritageContract = await ethers.getContractFactory("Heritage");
      heritage = await heritageContract.deploy();
      await heritage.deployed();

    })
    it("should update the heir and checkInterval", async () => {
      await heritage.connect(owner).create(acc1.address, 5);
      await heritage.connect(owner).update(acc2.address, 10)
      getheritage = await heritage.getHeritage(owner.address)
      expect(getheritage.checkInterval).to.be.equal(10);
      expect(getheritage.heir).to.be.equal(acc2.address);
    })
  })
  describe("CheckIn", async () => {
    let getheritage
    beforeEach(async function () {
      [owner, acc1, acc2] = await ethers.getSigners();

      heritageContract = await ethers.getContractFactory("Heritage");
      heritage = await heritageContract.deploy();
      await heritage.deployed();

    })
    it("should update the lastseen after checkingIn", async () => {

      await heritage.connect(owner).create(acc1.address, 5);
      getheritage = await heritage.getHeritage(owner.address)
      await heritage.connect(owner).checkIn()
      let created_at = Math.floor(Number(Date.now() / 1000))
      // checks if the result is close to the expected result with a maximum difference of 10 (seconds)
      assert.closeTo(created_at, getheritage.lastSeen, 10)
    })

  })

  describe("fulfilling heritage", async () => {
    let getheritage
    beforeEach(async function () {
      [owner, acc1, acc2] = await ethers.getSigners();

      heritageContract = await ethers.getContractFactory("Heritage");
      heritage = await heritageContract.deploy();
      await heritage.deployed();

      // test contract for calling internal functions of heritage contract
      const TestContract = await ethers.getContractFactory("TestContract")

      testContract = await TestContract.deploy();
      await testContract.deployed();
    })

    it("checks if their is any heritage that need to be fulfilled", async () => {
      await heritage.connect(owner).create(acc1.address, 5);
      getheritage = await testContract.getNextDueHeritage();
      expect(getheritage).to.equal(0);
    })


  })
})



