import React, { useMemo, useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const SLIDER_WIDTH = Dimensions.get("window").width;

const CarouselCards = ({ data, favorites, setFavorites }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const currentItemInFavoritesIndex = useMemo(
    () => favorites.findIndex((item) => item.id === data[0].id),
    [favorites.length, data.length]
  );

  const addOrRemoveFavorite = ({ id, thumbnail, title, price }) => {
    const updatedFavorites = [...favorites];
    if (currentItemInFavoritesIndex !== -1) {
      updatedFavorites.splice(currentItemInFavoritesIndex, 1);
    } else {
      updatedFavorites.push({
        id,
        thumbnail,
        title,
        price,
      });
    }
    setFavorites(updatedFavorites);
  };

  return (
    <View className="mb-6">
      <Carousel
        layout="stack"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <ImageBackground
              key={index}
              src={item.url}
              className="h-52"
              resizeMode="stretch"
            >
              <View className="flex flex-col">
                <TouchableOpacity
                  className="w-screen flex flex-row justify-end p-4"
                  onPress={() => addOrRemoveFavorite(item)}
                >
                  <View className="bg-white w-14 h-14 flex flex-row justify-center items-center rounded-2xl">
                    {currentItemInFavoritesIndex !== -1 ? (
                      <Ionicons name="heart" size={24} color="#FF8181" />
                    ) : (
                      <Ionicons name="heart-outline" size={24} color="black" />
                    )}
                  </View>
                </TouchableOpacity>
                <View className="h-52 flex flex-row justify-start">
                  <Pagination
                    dotsLength={data.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotColor="#F9B023"
                    inactiveDotColor="#E4E4E4"
                    dotStyle={{
                      width: 20,
                      height: 5,
                      borderRadius: 5,
                    }}
                    inactiveDotOpacity={1}
                    inactiveDotScale={0.6}
                    tappableDots={true}
                  />
                </View>
              </View>
            </ImageBackground>
          );
        }}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_WIDTH}
      />
    </View>
  );
};

export default CarouselCards;
