import React, { useMemo } from "react";
import { View, Text } from "react-native";
import Button from "./Button";

const BillDetails = ({ cart }) => {
  const deliveryCharges = useMemo(
    () => (cart.length !== 0 ? (2.0).toFixed(2) : (0.0).toFixed(2)),
    [cart.length]
  );
  const subtotal = useMemo(() => {
    let sum = 0;
    cart.forEach(({ price, discountPercentage, quantityInCart }) => {
      sum += (((100 - discountPercentage) * price) / 100) * quantityInCart;
    });
    return sum.toFixed(2);
  }, [cart]);

  return (
    <View className="w-screen pt-4 pl-4 pr-4 mt-20">
      <View className="bg-[#F8F9FB] pt-4 rounded-t-3xl w-full">
        <View className="px-8">
          <View className="flex flex-row justify-between h-8">
            <Text
              className="text-[#616A7D]"
              style={{ fontFamily: "Manrope_400Regular" }}
            >
              Subtotal
            </Text>
            <Text
              style={{ fontFamily: "Manrope_500Medium" }}
            >{`$${subtotal}`}</Text>
          </View>
          <View className="flex flex-row justify-between h-8">
            <Text
              className="text-[#616A7D]"
              style={{ fontFamily: "Manrope_400Regular" }}
            >
              Delivery
            </Text>
            <Text
              style={{ fontFamily: "Manrope_500Medium" }}
            >{`$${deliveryCharges}`}</Text>
          </View>
          <View className="flex flex-row justify-between h-8">
            <Text
              className="text-[#616A7D]"
              style={{ fontFamily: "Manrope_400Regular" }}
            >
              Total
            </Text>
            <Text style={{ fontFamily: "Manrope_500Medium" }}>{`$${(
              +subtotal + +deliveryCharges
            ).toFixed(2)}`}</Text>
          </View>
        </View>
        <View className="mx-4 mt-8 mb-4">
          <Button text="Proceed To Checkout" primary />
        </View>
      </View>
    </View>
  );
};

export default BillDetails;
