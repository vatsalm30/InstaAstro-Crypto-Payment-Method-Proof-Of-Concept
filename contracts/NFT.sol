// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ERC721Burnable{
	constructor() ERC721("Pyramint", "PYM") {}

	//Counters.Counter private _tokenIdCounter;
    uint public tokenIdCounter;

    struct NFTMetadata {
        bool exists;
        // a.k.a. creator of the NFT
        address minter;
        // For market listing
        string publicTokenURI;
    }

    mapping(string => uint) private _tokenUriToId;

    mapping(uint256 => NFTMetadata) private _metadata;

	function safeMint(
        string memory publicTokenURI
    ) public returns(uint256 tokenId) {
        return _safeMintFor(publicTokenURI);
    }

    function _safeMintFor(
        string memory publicTokenURI
    ) private returns(uint256 tokenId) {
        require(_tokenUriToId[publicTokenURI] == 0, "URL already minted");

        //_tokenIdCounter.value += 1;
        tokenIdCounter++;
        tokenId = tokenIdCounter;
        // Owned by the sender. For safeMintFor, sender = owner = marketplace (escrow).
        // But someone can mint directly as well.
        _safeMint(_msgSender(), tokenIdCounter);
        _setTokenURI(tokenIdCounter, publicTokenURI);

        // Marketplace should be able to manage items on behalf of the token owner
        // _setApprovalForAll(minter, owner(), true);
        _metadata[tokenId] = NFTMetadata({
            exists: true,
            minter: msg.sender,
            publicTokenURI: publicTokenURI
        });
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal whenNotPaused override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function lastTokenId() public returns (uint) {
        return tokenIdCounter;
    }
}