import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');



const images = [ 
'https://assets2.razerzone.com/images/pnx.assets/f83991a174978c3f88c089758ea9fa3c/blackwidow-v3-tenkeyless-usp1-mobile-v2.jpg',
 'https://blog.vitoriahoteis.com.br/wp-content/uploads/2024/10/black-friday.jpg',
 'https://i.ytimg.com/vi/-uDHBW5jLO0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBSY5aPbK-lSRWZE0K0cFd_RIi4iw',
 'https://assets3.razerzone.com/C5pG9V1MuWE7yVTIizMOLvSni_c=/1500x1000/https%3A%2F%2Fmedias-p1.phoenix.razer.com%2Fsys-master-phoenix-images-container%2Fh91%2Fh00%2F9949408722974%2F250819-kraken-kitty-v2-gengar-1500x1000-1.jpg'
   ]; 
const products = [ 
  { id: '1', name: 'Teclado Gamer Razer Blackwidow V4 Pro', price: 'R$ 1.599,99', image: 'https://www.kabum.com.br/_next/image?url=https%3A%2F%2Fimages5.kabum.com.br%2Fprodutos%2Ffotos%2F735185%2Fteclado-gamer-razer-blackwidow-v4-pro-chroma-rgb-switch-amarelo-layout-us-preto-rz0304681900_1746557834_gg.jpg&w=1920&q=75', },
  { id: '2', name: 'Mouse HyperX Pulsefire', price: 'R$ 128,99', image: 'https://www.kabum.com.br/_next/image?url=https%3A%2F%2Fimages6.kabum.com.br%2Fprodutos%2Ffotos%2F98696%2Fmouse-gamer-hyperx-pulsefire-core-hx-mc004b_mouse-gamer-hyperx-pulsefire-core-hx-mc004b_1539172781_gg.jpg&w=1920&q=75', }, 
  { id: '3', name: 'Headset Gamer Logitech', price: 'R$ 899,90', image: 'https://www.kabum.com.br/_next/image?url=https%3A%2F%2Fimages4.kabum.com.br%2Fprodutos%2Ffotos%2F117314%2Fheadset-gamer-sem-fio-logitech-g-pro-x-wireless-7-1-som-surround-drivers-pro-g-de-50mm-981-000906_1612893767_gg.jpg&w=1920&q=75', }, 
  { id: '4', name: 'Monitor Alienware 240Hz', price: 'R$ 6.430,55', image: 'https://www.kabum.com.br/_next/image?url=https%3A%2F%2Fimages3.kabum.com.br%2Fprodutos%2Ffotos%2Fsync_mirakl%2F534733%2Fxlarge%2FMonitor-Gamer-Alienware-27-Qd-Oled-360Hz-Antirreflexo-DP-HDMI-Aw2725df_1751383474.jpg&w=1920&q=75', }, 
  { id: '5', name: 'Fire TV Stick HD (Geração mais recente', price: 'R$ 324,00', image: 'https://m.media-amazon.com/images/I/61qQCckVsqL._AC_SX679_.jpg', }, 
  { id: '6', name: 'Kindle 16 GB (Geração mais recente) ', price: 'R$ 589,00', image: 'https://m.media-amazon.com/images/I/718jJRdvDsL._AC_SX679_.jpg', }, 
  { id: '7', name: 'FIFINE Microfone dinâmico USB/XLR', price: 'R$ 327,00', image: 'https://m.media-amazon.com/images/I/71k6li+9vFL._AC_SX679_.jpg', }, 
  { id: '8', name: 'PlayStation®5 Slim Digital -Pacote ASTRO ', price: 'R$ 3.999,90', image: 'https://m.media-amazon.com/images/I/71yPeAoEWoL._AC_SX342_SY445_QL70_ML2_.jpg', }, 
  { id: '9', name: 'Console Xbox Series X Slim', price: 'R$ 5.362,33', image: 'https://m.media-amazon.com/images/I/516pVDAQMnL._AC_SX342_SY445_QL70_ML2_.jpg', }, 
  { id: '10', name: 'Cadeira Ergonomica Gamer ', price: 'R$ 649,00', image: 'https://m.media-amazon.com/images/I/71QZZuyROTL._AC_SX679_.jpg', }, ];

export default function App() {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const carouselHeight = 180;

  // Carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setIndex(nextIndex);
    }, 2500);
    return () => clearInterval(interval);
  }, [index]);

  const handleAddToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const priceNumber = parseFloat(item.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
      return sum + priceNumber * item.quantity;
    }, 0);
  };

  const carouselOpacity = scrollY.interpolate({
    inputRange: [0, carouselHeight],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (

    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Image source={require('./assets/tem.webp')} style={styles.logo} />

   <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={() => setCartVisible(true)}>
            <Ionicons name="cart-outline" size={28} color="#fff" />
          </TouchableOpacity>
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</Text>
            </View>
            
          )}
          
        </View>
        
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar produtos..."
          placeholderTextColor="#ccc"
        />
        <Ionicons name="search" size={22} color="#707070" style={styles.icon} />
      </View>

     
      <Modal visible={menuVisible} animationType="slide" transparent={true}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
          style={styles.menuOverlay}
        >
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="home-outline" size={22} color="#333" />
              <Text style={styles.menuText}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={22} color="#333" />
              <Text style={styles.menuText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="information-circle-outline" size={22} color="#333" />
              <Text style={styles.menuText}>Sobre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="ticket-outline" size={24} color="black" />
           <Text style={styles.menuText}>Cupom</Text>
           </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="help-circle-outline" size={22} color="#333" />
              <Text style={styles.menuText}>Ajuda</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Animated.View
        style={[
          styles.carouselContainer,
          {
            position: 'absolute',
            top: 180, 
            left: 0,
            right: 0,
            zIndex: 5,
            opacity: carouselOpacity,
          },
        ]}
      >
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.carouselImage} />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>

      <Animated.FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingTop: carouselHeight + 15, paddingBottom: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Ionicons name="cart-outline" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal visible={cartVisible} animationType="slide">
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>🛒 Carrinho</Text>
          {cart.length === 0 ? (
            <Text style={styles.emptyCart}>Seu carrinho está vazio.</Text>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.cartImage} />
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>
                      R${' '}
                      {(
                        parseFloat(item.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) *
                        item.quantity
                      )
                        .toFixed(2)
                        .replace('.', ',')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setCart(prev => prev.filter(p => p.id !== item.id))}
                  >
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          {cart.length > 0 && (
            <Text style={styles.totalPrice}>
              Total: R$ {calculateTotal().toFixed(2).replace('.', ',')}
            </Text>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCartVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  headerContainer: {
    marginTop: 50,
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  header: { color: '#fff', fontSize: 22 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 15 },
  input: { flex: 1, backgroundColor: '#222', borderRadius: 8, padding: 10, color: '#fff' },
  icon: { position: 'absolute', right: 25 },
  carouselContainer: { height: 180, marginBottom:20 },
  carouselImage: { width, height: 180, resizeMode: 'cover' },
  productCard: {
    backgroundColor: '#1f1f1f',
    flex: 1,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: { width: 120, height: 120, borderRadius: 10 },
  productName: { color: '#fff', marginTop: 8, textAlign: 'center' },
  productPrice: { color: '#00ff9f', marginVertical: 5 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4c1d95',
    padding: 6,
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', marginLeft: 4 },
  cartBadge: { position: 'absolute', right: -5, top: -5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5 },
  cartBadgeText: { color: '#fff', fontSize: 10 },
  cartContainer: { flex: 1, backgroundColor: '#fff', padding: 20 },
  cartTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, marginTop: 50 },
  cartItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  cartImage: { width: 60, height: 60, borderRadius: 8 },
  cartItemName: { fontWeight: 'bold' },
  cartItemPrice: { color: '#333' },
  totalPrice: { fontWeight: 'bold', fontSize: 18, marginVertical: 10 },
  closeButton: { backgroundColor: '#4c1d95', marginTop: 20, padding: 10, borderRadius: 8, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontSize: 16 },
  menuOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row' },
  emptyCart: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#555' },
  menuContainer: { width: '70%', backgroundColor: '#fff', padding: 20, elevation: 5 },
  menuTitle: { fontSize: 22, fontWeight: 'bold', marginVertical: 15 },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  menuText: { marginLeft: 10, fontSize: 16, color: '#333' },
  logo: {
    marginTop:1,
    width:40,
    height:40
  }
});
