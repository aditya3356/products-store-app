import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";
import FavoriteItem from "../components/FavoriteItem";
import { Icon, withBadge } from "@rneui/themed";

const Favorites = ({ items, cart }) => {
  const navigate = useNavigate();
  const BadgedCartIcon = withBadge(cart.length)(Icon);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center justify-between py-2 px-4 mb-4">
        <View className="flex flex-row items-center w-52">
          <TouchableOpacity
            className="bg-[#F8F9FB] rounded-full h-10 w-10 mr-8 flex flex-row justify-center items-center"
            onPress={() => navigate(-1)}
          >
            <Entypo name="chevron-left" size={12} color="#1E222B" />
          </TouchableOpacity>
          <Text
            className="text-base"
            style={{ fontFamily: "Manrope_400Regular" }}
          >
            {`Favorites (${items.length})`}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigate("/cart")} className="px-4">
          <BadgedCartIcon
            type="feather"
            name="shopping-cart"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <FavoriteItem {...item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default Favorites;
