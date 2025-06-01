import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../constants/color';


const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/profile.png')}  // You can replace this with any profile picture
        style={styles.avatar}
      />
      <Text style={styles.name}>Muhammad Aayan Dar</Text>
      <Text style={styles.email}>aayan.dar@example.com</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Bio:</Text>
        <Text style={styles.infoText}>Passionate about building amazing apps with React Native 🚀.</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Location:</Text>
        <Text style={styles.infoText}>Islamabad, Pakistan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.a,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color:colors.d
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    color:colors.d
  },
  infoContainer: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color:colors.d
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:colors.d
  },
  infoText: {
    fontSize: 16,
    color:colors.d
  },
});

export default ProfileScreen;
