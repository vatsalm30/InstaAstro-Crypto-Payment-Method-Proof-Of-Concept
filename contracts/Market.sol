// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "contracts/SaleTokens.sol";
import "contracts/Interfaces/IMarket.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";

contract Market is IMarket, ERC1155Receiver{
    
    enum ListingStatus {
        Active,
        SoldOut,
        Canceled
    }

    struct Listing{
        uint256 tokenId;
        uint256 stock;
        uint256 price;
        address seller;
        address token;
        string[] searchItems;
    }


    uint256 listingId = 0;
    mapping(uint256 => Listing) private listings;

    function listProduct(uint256 tokenId, uint256 listAmount, uint256 listPrice, address token, string[] memory listingSearchItems) override public {
        require(msg.sender == SaleTokens(token).getMinter(tokenId), "Token can only be listed by minter as you cannot buy and relist token");
        require(listAmount <= SaleTokens(token).balanceOf(msg.sender, tokenId), "You do not have enough tokens");

        SaleTokens(token).transferFrom(msg.sender, address(this), tokenId, listAmount);

        listingId++;
        listings[listingId] = Listing(
            tokenId,
            listAmount,
            listPrice,
            msg.sender,
            token,
            listingSearchItems
        );
        emit Listed(
            tokenId, 
            listingId, 
            listAmount, 
            listPrice, 
            msg.sender, 
            token, 
            listingSearchItems
        );
    }

    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data) external pure override returns (bytes4){
        return 0xf23a6e61;
    }

    function onERC1155BatchReceived(address operator, address from, uint256[] calldata ids, uint256[] calldata values, bytes calldata data) external pure override returns (bytes4){
        return 0xbc197c81;
    }

}