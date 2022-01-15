// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// A basic Solidity Contract
contract Sample is ERC721, Ownable {
    using Strings for uint256;

    // Counters replaces ERC721Enumerable to reduce gas fees
    using Counters for Counters.Counter;
    Counters.Counter private _tokenSupply;

    string private _baseTokenURI =
        "https://opensea-creatures-api.herokuapp.com/api/creature/";

    uint256 public constant unit_cost = 0.05 ether; // cost of one token
    uint256 public total_supply; // total supply available

    bool public paused_sale = false;

    modifier saleNotPaused() {
        require(!paused_sale, "Minting is paused");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _total_supply
    ) ERC721(_name, _symbol) {
        total_supply = _total_supply;
    }

    fallback() external payable {}

    receive() external payable {}

    function toggleSale() public onlyOwner {
        paused_sale = !paused_sale;
    }

    function mint(uint256 num) public payable saleNotPaused {
        uint256 mintIndex = _tokenSupply.current() + 1;
        require(mintIndex <= total_supply, "Total supply reached");
        require(msg.value >= unit_cost * num, "");
        for (uint256 i = 0; i < num; i++) {
            _tokenSupply.increment();
            _safeMint(msg.sender, _tokenSupply.current());
        }
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function withdraw(address payable receiver) external onlyOwner {
        require(receiver != address(0), "Cannot withdraw to null");
        receiver.transfer(address(this).balance);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "URI query for nonexistent token");

        string memory baseURI = getBaseURI();

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    // Replacement for tokenSupply() from ERC721Enumerable
    function tokensMinted() public view returns (uint256) {
        return _tokenSupply.current();
    }

    function getBaseURI() public view returns (string memory) {
        return _baseTokenURI;
    }
}
