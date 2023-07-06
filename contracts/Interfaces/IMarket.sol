// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IMarket {
    event Listed(uint256 tokenId, uint256 listingId, uint256 stock, uint256 price, address lister, address token, string[] searchTerms);

    function listProduct(uint256 tokenId, uint256 listAmount, uint256 listPrice, address token, string[] memory listingSearchItems) external;
}