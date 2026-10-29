"use client";

import { placePhotoAttributions } from "@/hooks/use-place-photo";

// The parent's photo hook updates its URL and these credits in the same render.
export function PhotoCredit({ placeName, linked = true }: { placeName?: string; linked?: boolean }) {
  const authors = placeName ? placePhotoAttributions(placeName) : [];
  if (!authors.length) return null;
  return <span className="absolute bottom-2 right-2 z-10 max-w-[90%] rounded-md bg-black/70 px-2 py-1 text-[10px] leading-tight text-white">Photo: {authors.map((author, index) => <span key={index}>{index > 0 && ", "}{author.uri && linked ? <a href={author.uri} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" onClick={(event) => event.stopPropagation()}>{author.displayName}</a> : author.displayName}</span>)}</span>;
}
