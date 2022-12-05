import React from "react";
import {
  TrendingCollections,
  LiveAuctions,
  CategoriesList,
  ArtistList,
  NftInstructions,
} from "../components/index";
import { Banner } from "../components/Banners/index";

export function Home() {
  return (
    <>
      <Banner />
      <LiveAuctions />
      <CategoriesList />
      <TrendingCollections />
      <ArtistList />
      <NftInstructions />
    </>
  );
}
