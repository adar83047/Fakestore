import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useCart } from '../app/(tabs)/Cartcontext';
import { colors } from '../constants/color';


export default function ProductDetailScreen() {
  const { id, title, price, image, description, category, rate } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [cart, setCart] = useState([]); // Simple local cart

  const handleAddToCart = () => {
    const newItem = {
      id: Number(id),
      title: title,
      price: String(price),
      image: image,
      quantity: 1, 
    };
    addToCart(newItem);
    Alert.alert('Success', `${title} added to cart!`);
  };
  

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.detail}>
          <Text style={styles.detailtxt}>Detail page</Text>
        </View>

        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>💲{price}</Text>
        <Text style={styles.category}>{"\n"}Category: {category}</Text>
        <Text style={styles.description}>{"\n"}{description}</Text>
        <Text style={styles.rate}>⭐{rate}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart 🛒</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addToCartButton: {
    marginTop: 20,
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  addToCartText: {
    color: colors.d,
    fontSize: 18,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    backgroundColor: colors.a,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.d,
  },
  scrollContainer: {
    paddingTop: 100, 
    alignItems: 'center',
    paddingBottom: 40,
  },
  detail: {
    width: '80%',
    height: 100,
    marginBottom: 20,
    backgroundColor: colors.c,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,

  },
  detailtxt: {
    color: colors.d,
    fontSize: 30,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
    borderRadius: 20, 
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.d,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginTop: 10,
  },
  category: {
    fontSize: 18,
    color: colors.d,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: colors.d,
    textAlign: 'center',
    marginTop: 10,
  },
  rate: {
    fontSize: 20,
    color: colors.d,
    marginTop: 10,
  },
});
