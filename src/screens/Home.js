import React from "react";
import HomeItem from "../components/HomeItem";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigate } from "react-router-native";
import { Icon, withBadge } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";

const Home = ({ items, cart, setCart, favorites, setFavorites }) => {
  const navigate = useNavigate();
  const BadgedFavoritesIcon = withBadge(favorites.length)(Icon);
  const BadgedCartIcon = withBadge(cart.length)(Icon);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar backgroundColor="#2A4BA0" />
      <View className="bg-[#2A4BA0] mb-3 px-6 pt-12 h-44">
        <View className="flex flex-row items-start justify-between mb-10">
          <Text
            className="text-2xl text-[#F8F9FB]"
            style={{ fontFamily: "Manrope_600SemiBold" }}
          >
            Hey, Rahul
          </Text>
          <View className="flex flex-row justify-between items-center w-1/4">
            <TouchableOpacity onPress={() => navigate("/favorites")}>
              <BadgedFavoritesIcon
                type="ionicon"
                name="heart-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("/cart")}>
              <BadgedCartIcon
                type="feather"
                name="shopping-cart"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text
              className="text-[#F8F9FB] text-xs opacity-50"
              style={{ fontFamily: "Manrope_800ExtraBold" }}
            >
              DELIVERY TO
            </Text>
            <View className="flex flex-row justify-between items-center">
              <Text
                className="text-sm text-[#F8F9FB] mr-2"
                style={{ fontFamily: "Manrope_500Medium" }}
              >
                Green Way 3000, Sylhet
              </Text>
              <Entypo name="chevron-down" size={12} color="#B2BBCE" />
            </View>
          </View>
          <View>
            <Text
              className="text-[#F8F9FB] text-xs opacity-50"
              style={{ fontFamily: "Manrope_800ExtraBold" }}
            >
              WITHIN
            </Text>
            <View className="flex flex-row justify-between items-center">
              <Text
                className="text-sm text-[#F8F9FB] mr-2"
                style={{ fontFamily: "Manrope_500Medium" }}
              >
                1 Hour
              </Text>
              <Entypo name="chevron-down" size={12} color="#B2BBCE" />
            </View>
          </View>
        </View>
      </View>
      <Text
        className="px-4 text-3xl text-[#1E222B]"
        style={{ fontFamily: "Manrope_400Regular" }}
      >
        Recommended
      </Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <HomeItem
            {...item}
            cart={cart}
            setCart={setCart}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default Home;
