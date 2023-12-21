import React, { useCallback, useEffect, useState } from "react";
import Cart from "./src/screens/Cart";
import { SafeAreaView } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import * as SplashScreen from "expo-splash-screen";
import ProductDetails from "./src/screens/ProductDetails";
import Home from "./src/screens/Home";
import axios from "axios";
import { PRODUCTS_API_BASE_URL } from "./src/utils/constants";
import Favorites from "./src/screens/Favorites";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(PRODUCTS_API_BASE_URL).then((response) => {
      setProducts(response.data.products);
    });
  }, []);

  let [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || products.length === 0) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 text-black" onLayout={onLayoutRootView}>
      <NativeRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                items={products}
                cart={cart}
                setCart={setCart}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites items={favorites} cart={cart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} setCart={setCart} favorites={favorites} />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                cart={cart}
                setCart={setCart}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
        </Routes>
      </NativeRouter>
    </SafeAreaView>
  );
}
