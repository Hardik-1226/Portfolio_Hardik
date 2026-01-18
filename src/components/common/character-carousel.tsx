"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Ghost, Smile, Meh, Frown, Bot, Heart, Cat, Dog, Rabbit } from "lucide-react";

const characters = [
  Ghost, Smile, Meh, Cat, Bot, Heart, Rabbit, Dog, Frown,
  Ghost, Smile, Meh, Cat, Bot, Heart, Rabbit, Dog, Frown,
  Ghost, Smile, Meh, Cat, Bot, Heart, Rabbit, Dog, Frown,
];

export function CharacterCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {characters.map((Icon, index) => (
          <CarouselItem key={index} className="basis-auto pl-2">
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-2">
                <Icon className="h-10 w-10 text-muted-foreground transition-transform hover:scale-110 hover:text-accent-foreground" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
