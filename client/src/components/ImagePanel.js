import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function TitlebarImageList({images}) {
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
      </ImageListItem>
      {images.map((item) => (
        <ImageListItem key={item.image.replace("ipfs://", "https://").replace("/blob", ".ipfs.dweb.link/blob")}>
          <img
            src={`${item.image.replace("ipfs://", "https://").replace("/blob", ".ipfs.dweb.link/blob")}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image.replace("ipfs://", "https://").replace("/blob", ".ipfs.dweb.link/blob")}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={item.description}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.name}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}