import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";

const FavoriteItem = ({ thumbnail, price, title, id }) => {
  const navigate = useNavigate();

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
        />
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
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteItem;
