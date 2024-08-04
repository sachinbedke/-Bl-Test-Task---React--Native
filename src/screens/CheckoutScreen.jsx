import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { empltyCart } from '../slices/cartSlice';

const CheckoutScreen = () => {
    const [animation] = useState(new Animated.Value(0));
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const handleOrderComplete = () => {
        dispatch(empltyCart())
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            animation.setValue(0);

        });
    };

    const opacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + (item.price), 0).toFixed(2);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: "https://img.etimg.com/photo/msid-99080556,imgsize-32858/VivoY56BlackEngine.jpg" }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardBrand}>{item.brand}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.cardDiscount}>{item.discountPercentage}% Off</Text>
                <Text style={styles.cardStock}>{item.stock} in stock</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                style={styles.list}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Cost:</Text>
                <Text style={styles.totalAmount}>${calculateTotalCost()}</Text>
            </View>
            <TouchableOpacity style={styles.placeOrderButton} onPress={handleOrderComplete}>
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.animation, { opacity }]}>
                <Text style={styles.orderCompletedText}>Order Completed!</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 2,
        padding: 16,
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    cardDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardBrand: {
        fontSize: 14,
        color: '#888',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 8,
    },
    cardPrice: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardDiscount: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    cardStock: {
        fontSize: 14,
        color: '#FF5722',
        marginBottom: 8,
    },
    totalContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        marginBottom: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    totalAmount: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    placeOrderButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    placeOrderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    animation: {
        marginTop: 20,
        alignItems: 'center',
    },
    orderCompletedText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
});

export default CheckoutScreen;
