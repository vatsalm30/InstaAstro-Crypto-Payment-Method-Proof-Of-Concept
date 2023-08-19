// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IMarket {
    event Listed(
        uint256 tokenId,
        uint256 listingId,
        uint256 stock,
        uint256 price,
        address lister,
        address token,
        string[] searchTerms
    );

    event Sale(
        uint256 listingId,
        uint256 amountBought,
        uint256 priceBought,
        address lister,
        address buyer,
        address token
    );

    function listProduct(
        uint256 tokenId,
        uint256 listAmount,
        uint256 listPrice,
        address token,
        string[] memory listingSearchItems
    ) external;

    function buyProduct(uint256 _listingId, uint256 amountToBuy)
        external
        payable;

    function getNumOfListings() external view returns (uint256);

    function getTokenPrice(uint256 _listingId) external returns (uint256);

    function getListingTokenURI(uint256 _listingId)
        external
        view
        returns (string memory);
}
