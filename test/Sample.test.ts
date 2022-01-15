import { ethers } from "hardhat"
import { Signer, Contract } from "ethers"
import { expect } from "chai"

describe("Token", function () {
	let signers: Signer[]
	let owner: any
	let token: Contract

	beforeEach(async function () {
		const Sample = await ethers.getContractFactory("Sample")
		signers = await ethers.getSigners()
		owner = signers[0]
		token = await Sample.deploy("Sample", "SAMP", 10000)
	})

	it("Should deploy smart contract", () => {
		expect(token.address).to.not.be.undefined
	})

	it("Should set the right owner", async () => {
		expect(await token.owner()).to.equal(owner.address)
	})

	it("Should mint 1", async () => {
		try {
			const price = await token.unit_cost()
			await token.mint(1, {
				from: owner.address,
				value: price,
			})
			expect(await token.tokensMinted()).to.equal(0)
		} catch (err) {
			console.log(err)
			if (err) throw err
		}
	})
})
