import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import CartItem from "../components/CartItem";
import { Entypo } from "@expo/vector-icons";
import BillDetails from "../components/BillDetails";
import { useNavigate } from "react-router-native";
import { Icon, withBadge } from "@rneui/themed";

const Cart = ({ cart, setCart, favorites }) => {
  const navigate = useNavigate();
  const BadgedFavoritesIcon = withBadge(favorites.length)(Icon);

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
          >{`Shopping Cart (${cart.length})`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigate("/favorites")}
          className="px-4"
        >
          <BadgedFavoritesIcon
            type="ionicon"
            name="heart-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem {...item} cart={cart} setCart={setCart} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <BillDetails cart={cart} />
    </SafeAreaView>
  );
};

export default Cart;
