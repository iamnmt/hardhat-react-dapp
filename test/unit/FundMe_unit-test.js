const { expect } = require("chai");

describe("FundMe contract - unit test", () => {
  let FundMe;
  let fundMe;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const amount = 10;
  const options = { value: ethers.utils.parseEther(String(amount)) };

  beforeEach(async () => {
    FundMe = await ethers.getContractFactory("FundMe");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    fundMe = await FundMe.deploy();
    await fundMe.deployed();
  });
  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await fundMe.owner()).to.equal(owner.address);
    });
    it("Should assign the initial fund to 0", async () => {
      expect((await fundMe.total()).toNumber()).to.equal(0);
    });
    it("Should initialize funder's amount to 0", async () => {
      expect((await fundMe.funderToAmount(addr1.address)).toNumber()).to.equal(
        0
      );
    });
  });
  describe("Funding", () => {
    it("Should update funder's amount", async () => {
      await fundMe.connect(addr1).fund(options);
      const amountFunded = parseInt(
        ethers.utils.formatEther(await fundMe.funderToAmount(addr1.address))
      );
      expect(amountFunded).to.equal(amount);
    });
    it("Should update total amount", async () => {
      await fundMe.connect(addr1).fund(options);
      const total = parseInt(ethers.utils.formatEther(await fundMe.total()));
      expect(total).to.equal(10);
    });
  });
  describe("Withdrawal", () => {
    beforeEach(async () => {
      await fundMe.connect(addr1).fund(options);
      await fundMe.connect(addr2).fund(options);
    });
    it("Should fail if the funder is not the owner", async () => {
      const initialFund = parseInt(
        ethers.utils.formatEther(await fundMe.total())
      );
      await expect(fundMe.connect(addr1).withdraw()).to.be.revertedWith(
        "Only owner can withdraw"
      );
      expect(parseInt(ethers.utils.formatEther(await fundMe.total()))).to.equal(
        initialFund
      );
    });

    it("Should withdraw all the fund", async () => {
      const totalFund = ethers.utils.parseEther(String(2 * amount));
      await expect(
        await fundMe.connect(owner).withdraw()
      ).to.changeEtherBalance(owner, totalFund);
      expect(parseInt(ethers.utils.formatEther(await fundMe.total()))).to.equal(
        0
      );
    });
  });
});
