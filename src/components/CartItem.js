import React, { useMemo } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";

const CartItem = ({
  id,
  thumbnail,
  title,
  price,
  discountPercentage,
  quantityInCart,
  stock,
  cart,
  setCart,
}) => {
  const navigate = useNavigate();

  const currentItemInCartIndex = useMemo(
    () => cart.findIndex((item) => item.id === id),
    [cart.length, id]
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

  return (
    <View className="flex flex-col justify-center px-8">
      <TouchableOpacity
        className="flex flex-row items-center text-sm py-2 justify-between h-20"
        onPress={() => navigate(`/product/${id}`)}
      >
        <View className="flex flex-row w-28 items-center">
          <Image
            className="w-10 h-10 mr-8"
            src={thumbnail}
            resizeMode="cover"
          />
          <View>
            <Text numberOfLines={2} style={{ fontFamily: "Manrope_500Medium" }}>
              {title}
            </Text>
            <Text
              numberOfLines={1}
              style={{ fontFamily: "Manrope_400Regular" }}
            >
              $
              {(
                ((100 - discountPercentage) * price * quantityInCart) /
                100
              ).toFixed(2)}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between w-28">
          <TouchableOpacity
            onPress={onDecreaseQuantityInCart}
            className={
              "bg-[#F8F9FB] rounded-full h-10 w-10 flex flex-row justify-center items-center"
            }
          >
            <Entypo name="minus" size={12} color="#130F26" />
          </TouchableOpacity>
          <Text style={{ fontFamily: "Manrope_500Medium" }}>
            {quantityInCart}
          </Text>
          <TouchableOpacity
            disabled={isIncreaseQuantityInCartDisabled()}
            onPress={onIncreaseQuantityInCart}
            className={`${
              isIncreaseQuantityInCartDisabled()
                ? "bg-slate-400"
                : "bg-[#F8F9FB]"
            } rounded-full h-10 w-10 flex flex-row justify-center items-center`}
          >
            <Entypo name="plus" size={12} color="#130F26" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View className="border-[#EBEBFB] border-[0.5px]" />
    </View>
  );
};

export default CartItem;
