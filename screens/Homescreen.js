import { TouchableOpacity, Dimensions, Image, StyleSheet, Text, SafeAreaView, View, ScrollView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { colors } from '../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');

const categories = [
  "Mens's clothing",
  "Womens's clothing",
  "Electronics",
  "Accessories",
];

const categoryMapping = {
  "Womens's clothing": "women's clothing",
  "Mens's clothing": "men's clothing",
  "Electronics": "electronics",
  "Accessories": "jewelery",
};

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const storedProducts = await AsyncStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
          setLoading(false);
        } else {
          const res = await fetch('https://fakestoreapi.com/products');
          const data = await res.json();
          setProducts(data);
          await AsyncStorage.setItem('products', JSON.stringify(data));
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.page, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={{fontSize: 20, color: colors.d}}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>Fakestore</Text>
        <Image source={require('../assets/images/profile.png')} style={styles.profileImg} />
      </View>
      <FlatList
        ListHeaderComponent={
          <View style={styles.StatusBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedCategory && (
                <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                  <View style={[styles.categoryview, { backgroundColor: colors.d }]}> 
                    <Text style={{ color: colors.a }}>Clear</Text>
                  </View>
                </TouchableOpacity>
              )}
              {categories.map((category, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => setSelectedCategory(category)}
                >
                  <View style={[
                    styles.categoryview, 
                    selectedCategory === category && styles.selectedCategory 
                  ]}>
                    <Text style={{ color: selectedCategory === category ? 'white' : colors.d }}>
                      {category}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
        data={products.filter(product => {
          if (!selectedCategory) return true;
          const mappedCategory = categoryMapping[selectedCategory];
          return product.category === mappedCategory;
        })}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.itemview}
        renderItem={({ item: product }) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => {
              router.push({
                pathname: '/products/[id]',
                params: {
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  category: product.category,
                  price: product.price,
                  image: product.image,
                  rate: product.rating.rate,
                }
              });
            }}
          >
            <View style={styles.item}>
              <Image source={{ uri: product.image }} style={styles.itemimg} />
              <View style={styles.itemtxt}>
                <Text numberOfLines={2} style={[styles.itemtxt,{ textAlign: 'center' }]}>{product.title}</Text>
                <Text style={[styles.itemtxt, {fontWeight: 'bold' }]}>$ {product.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ height: 50 }} />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  scrollItem: {},
  page: {
    flex: 1,
    top: 40,
    width: width,
    height: height,
    backgroundColor: colors.a,
    alignItems: 'flex-start',
    bottom:50
  },
  StatusBar: {
    padding:10,
    width: width,
    height: 60,
    backgroundColor: colors.b,
    justifyContent: 'center',
  },
  categoryview: {
    backgroundColor: colors.a,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  selectedCategory: {
    backgroundColor: "black",
  },
  itemview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: width,
  },
  item: {
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 10,
    height: 300,
    width: (width / 2) - 20,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  itemimg: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  itemtxt: {
    justifyContent: 'center',
    alignItems: 'center',
    color:colors.d
  },
  titleBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.c,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.a,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
