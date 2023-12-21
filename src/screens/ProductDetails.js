import React, { useEffect, useState, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "@kolking/react-native-rating";
import CarouselCards from "../components/CarouselCards";
import Button from "../components/Button";
import { useParams, useNavigate } from "react-router-native";
import axios from "axios";
import { PRODUCTS_API_BASE_URL } from "../utils/constants";
import { Icon, withBadge } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";

const ProductDetails = ({ cart, setCart, favorites, setFavorites }) => {
  const [item, setItem] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${PRODUCTS_API_BASE_URL}/${id}`).then((response) => {
      setItem(response.data);
    });
  }, [id]);

  const BadgedFavoritesIcon = withBadge(favorites.length)(Icon);
  const BadgedCartIcon = withBadge(cart.length)(Icon);

  const currentItemInCartIndex = useMemo(
    () => cart.findIndex((item) => item.id === +id),
    [cart.length, id]
  );

  if (Object.keys(item).length === 0) {
    return null;
  }

  const onAddOrRemoveItem = () => {
    const updatedCart = [...cart];
    if (currentItemInCartIndex !== -1) {
      updatedCart.splice(currentItemInCartIndex, 1);
    } else {
      updatedCart.push({
        id: item.id,
        quantityInCart: 1,
        thumbnail: item.thumbnail,
        title: item.title,
        price: item.price,
        discountPercentage: item.discountPercentage,
        stock: item.stock,
      });
    }
    setCart(updatedCart);
  };

  const onGoToCart = () => {
    if (currentItemInCartIndex === -1) {
      const updatedCart = [...cart];
      updatedCart.push({
        id: item.id,
        quantityInCart: 1,
        thumbnail: item.thumbnail,
        title: item.title,
        price: item.price,
        discountPercentage: item.discountPercentage,
        stock: item.stock,
      });
      setCart(updatedCart);
    }
    navigate("/cart");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center justify-between mb-3 px-6 py-2">
        <TouchableOpacity
          className="bg-[#F8F9FB] rounded-full h-10 w-10 flex flex-row justify-center items-center"
          onPress={() => navigate("/")}
        >
          <Entypo name="chevron-left" size={12} color="#1E222B" />
        </TouchableOpacity>
        <View className="flex flex-row justify-between items-center w-1/4">
          <TouchableOpacity onPress={() => navigate("/favorites")}>
            <BadgedFavoritesIcon
              type="ionicon"
              name="heart-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("/cart")}>
            <BadgedCartIcon
              type="feather"
              name="shopping-cart"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 mb-3">
          <Text
            className="text-5xl text-[#1E222B] leading-[62.5px]"
            style={{ fontFamily: "Manrope_300Light" }}
          >
            {item.brand}
          </Text>
          <Text
            className="text-5xl text-[#1E222B] leading-[62.5px]"
            style={{ fontFamily: "Manrope_800ExtraBold" }}
          >
            {item.title}
          </Text>
          <Rating
            size={16}
            rating={item.rating}
            disabled={true}
            baseColor="#1E222B"
            fillColor="#F9B023"
          />
        </View>
        <CarouselCards
          data={item.images?.map((image) => ({
            url: image,
            id: item.id,
            thumbnail: item.thumbnail,
            title: item.title,
            price: item.price,
          }))}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <View className="flex flex-row px-6 items-center mb-5">
          <Text
            className="text-base text-[#2A4BA0] mr-4"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            ${item.price}
          </Text>
          <View className="bg-[#2A4BA0] rounded-3xl py-1 px-2.5 flex flex-row justify-center items-center">
            <Text
              className="text-xs text-[#FAFBFD]"
              style={{ fontFamily: "Manrope_400Regular" }}
            >
              ${((item.discountPercentage * item.price) / 100).toFixed(2)} OFF
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center px-6 mb-5">
          <TouchableOpacity className="w-5/12" onPress={onAddOrRemoveItem}>
            <Button
              text={
                currentItemInCartIndex !== -1
                  ? "Remove From Cart"
                  : "Add To Cart"
              }
            />
          </TouchableOpacity>
          <View className="w-1/12" />
          <TouchableOpacity className="w-6/12" onPress={onGoToCart}>
            <Button
              text={
                currentItemInCartIndex !== -1 ? "Proceed To Cart" : "Buy Now"
              }
              primary
            />
          </TouchableOpacity>
        </View>
        <View className="px-6">
          <Text
            className="text-base text-[#1E222B]"
            style={{ fontFamily: "Manrope_400Regular" }}
          >
            Details
          </Text>
          <Text
            className="text-base text-[#8891A5]"
            style={{ fontFamily: "Manrope_400Regular" }}
          >
            {item.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
