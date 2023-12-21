import React, { useMemo } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";

const HomeItem = ({
  thumbnail,
  price,
  title,
  id,
  stock,
  discountPercentage,
  cart,
  setCart,
  favorites,
  setFavorites,
}) => {
  const navigate = useNavigate();

  const currentItemInCartIndex = useMemo(
    () => cart.findIndex((item) => item.id === id),
    [cart.length, id]
  );

  const currentItemInFavoritesIndex = useMemo(
    () => favorites.findIndex((item) => item.id === id),
    [favorites.length, id]
  );

  const isIncreaseQuantityInCartDisabled = () =>
    currentItemInCartIndex !== -1 &&
    cart[currentItemInCartIndex].quantityInCart === stock;

  const onDecreaseQuantityInCart = () => {
    const updatedCart = [...cart];
    if (updatedCart[currentItemInCartIndex].quantityInCart === 1) {
      updatedCart.splice(currentItemInCartIndex, 1);
    } else {
      updatedCart[currentItemInCartIndex].quantityInCart--;
    }
    setCart(updatedCart);
  };

  const onIncreaseQuantityInCart = () => {
    if (currentItemInCartIndex !== -1) {
      const currentItemInCart = { ...cart[currentItemInCartIndex] };
      currentItemInCart.quantityInCart++;
      const updatedCart = [...cart];
      updatedCart[currentItemInCartIndex].quantityInCart++;
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart];
      updatedCart.push({
        id,
        quantityInCart: 1,
        thumbnail,
        title,
        price,
        discountPercentage,
        stock,
      });
      setCart(updatedCart);
    }
  };

  const addOrRemoveFavorite = () => {
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
    <View className="w-1/2 p-2">
      <TouchableOpacity
        className="h-56 rounded-xl bg-[#F8F9FB] border border-[#F8F9FB]"
        onPress={() => navigate(`/product/${id}`)}
      >
        <ImageBackground
          src={thumbnail}
          className="h-36 rounded-t-xl overflow-hidden"
          resizeMode="stretch"
        >
          <TouchableOpacity
            className="w-full flex flex-row justify-start p-2"
            onPress={addOrRemoveFavorite}
          >
            {currentItemInFavoritesIndex !== -1 ? (
              <Ionicons name="heart" size={14} color="#FF8181" />
            ) : (
              <Ionicons name="heart-outline" size={14} color="black" />
            )}
          </TouchableOpacity>
        </ImageBackground>
        <View className="p-4">
          <View className="flex flex-row justify-between items-start">
            <View className="w-1/2">
              <Text
                className="text-sm text-[#1E222B]"
                style={{ fontFamily: "Manrope_600SemiBold" }}
                numberOfLines={1}
              >
                ${price}
              </Text>
              <Text
                className="text-xs text-[#616A7D]"
                style={{ fontFamily: "Manrope_400Regular" }}
                numberOfLines={2}
              >
                {title}
              </Text>
            </View>
            {currentItemInCartIndex !== -1 ? (
              <View className="flex flex-row items-center justify-between w-1/2">
                <TouchableOpacity
                  onPress={onDecreaseQuantityInCart}
                  className="bg-[#2A4BA0] rounded-full h-6 w-6 flex flex-row justify-center items-center"
                >
                  <Entypo name="minus" size={12} color="white" />
                </TouchableOpacity>
                <Text style={{ fontFamily: "Manrope_500Medium" }}>
                  {cart[currentItemInCartIndex].quantityInCart}
                </Text>
                <TouchableOpacity
                  disabled={isIncreaseQuantityInCartDisabled()}
                  onPress={onIncreaseQuantityInCart}
                  className={`${
                    isIncreaseQuantityInCartDisabled()
                      ? "bg-slate-400"
                      : "bg-[#2A4BA0]"
                  } rounded-full h-6 w-6 flex flex-row justify-center items-center`}
                >
                  <Entypo name="plus" size={12} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                disabled={isIncreaseQuantityInCartDisabled()}
                onPress={onIncreaseQuantityInCart}
                className={`${
                  isIncreaseQuantityInCartDisabled()
                    ? "bg-slate-400"
                    : "bg-[#2A4BA0]"
                } rounded-full h-6 w-6 flex flex-row justify-center items-center`}
              >
                <Entypo name="plus" size={12} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeItem;
