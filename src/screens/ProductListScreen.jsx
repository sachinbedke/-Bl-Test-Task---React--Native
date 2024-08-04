import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../services/products';
import { addToCart } from '../slices/cartSlice';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo

const ProductListScreen = ({ navigation }) => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useGetProductsQuery();
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
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

    const renderItem = ({ item }) => {
        const imageUrl = item.thumbnail




        return (
            <View style={styles.product}>
                <Image source={{ uri: "https://img.etimg.com/photo/msid-99080556,imgsize-32858/VivoY56BlackEngine.jpg" }} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productBrand}>{item.brand}</Text>
                    <Text style={styles.productCategory}>{item.category}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    {renderStars(item.rating)}
                    <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                    <Text style={styles.productDiscount}>{item.discountPercentage}% Off</Text>
                    <Text style={styles.productStock}>{item.stock} in stock</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
                        <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {isLoading && <Text>Loading...</Text>}
            {error && <Text>Error fetching products</Text>}
            {data && (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={() => setPage(page + 1)}
                    onEndReachedThreshold={0.5}
                />
            )}
            <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
                <Text style={styles.cartButtonText}>Go to Cart</Text>
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
    product: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 2,
        padding: 16,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productBrand: {
        fontSize: 14,
        color: '#888',
    },
    productCategory: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 8,
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productDiscount: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
    },
    productStock: {
        fontSize: 14,
        color: '#FF5722',
        marginBottom: 8,
    },
    addButton: {
        backgroundColor: '#694e28',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cartButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignSelf: 'center',
        marginTop: 16,
    },
    cartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductListScreen;
