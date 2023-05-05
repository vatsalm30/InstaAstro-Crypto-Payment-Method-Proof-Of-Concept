import React from 'react'

export const Storage = () => {
    require('dotenv').config();
    const { NFT_STORAGE_KEY } = process.env.NFT_STORAGE_KEY;
  return (
    <div>{NFT_STORAGE_KEY}</div>
  )
}
