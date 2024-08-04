import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo
import { removeFromCart } from '../slices/cartSlice';

const CartScreen = ({ navigation }) => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome
                    key={i}
                    name={i <= rating ? "star" : "star-o"}
                    size={14}
                    color="#FFD700"
                />
            );
        }
        return <View style={styles.stars}>{stars}</View>;
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: "https://img.etimg.com/photo/msid-99080556,imgsize-32858/VivoY56BlackEngine.jpg" }} style={styles.cartItemImage} />
            {/* given json file thumbnail not display thats why i use this by default image url */}
            <View style={styles.cartItemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemBrand}>{item.brand}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                {renderStars(item.rating)}
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.itemDiscount}>{item.discountPercentage}% Off</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
            />
            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 2,
        padding: 16,
        alignItems: 'center', // Align items vertically
    },
    cartItemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    cartItemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemBrand: {
        fontSize: 14,
        color: '#888',
    },
    itemCategory: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 8,
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    itemPrice: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemDiscount: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: '#FF5722',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignSelf: 'center',
        marginTop: 16,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
        marginTop: 20,
    },
});

export default CartScreen;
