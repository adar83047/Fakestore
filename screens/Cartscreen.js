import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../app/(tabs)/Cartcontext';  // Adjust path if needed
import { colors } from '../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  // Persist cart to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cart.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
          <Image source={require('../assets/images/Cart.png')} style={{width: 100, height: 100, opacity: 0.3, marginBottom: 20}} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.qtyButton}>
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.qtyButton}>
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Button title="Remove"  onPress={() => removeFromCart(item.id)} />
                </View>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          </View>
          <View style={styles.totalContainer}>
          <Button title="Check-Out" onPress={() => Alert.alert("Chekout!!!",

`Thank you for shopping with us,

Your total is: $${calculateTotal()}`)} 
/>  
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:colors.a
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.d,
    top: 30
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    backgroundColor: colors.b,
    borderColor: 'gray',
    borderRadius: 8,
    top:30
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    color: colors.d,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: colors.d,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  qtyButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  qtyButtonText: {
    color: 'white',
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.d,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.d,
  },
});

export default CartScreen;
