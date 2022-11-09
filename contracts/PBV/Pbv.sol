// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Pbv is ERC721,Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCount;
    string private _baseTokenURI;

    constructor () ERC721("Phucbienvan", "PBV") {
    }

    function mint(address _to) public onlyOwner returns (uint256) {
        _tokenIdCount.increment();
        uint256 _tokenId = _tokenIdCount.current();
        _mint(_to, _tokenId);
        return _tokenId;
    }

    function _baseURI() internal view virtual override returns (string memory){
        return _baseTokenURI;
    }

    function updateBaseTokenURI(string memory baseTokenURI_) public onlyOwner {
        _baseTokenURI = baseTokenURI_;
    }
}
