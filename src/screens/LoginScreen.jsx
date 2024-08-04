import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper functions for validation
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // Minimum 6 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
};

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        let valid = true;

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long and contain at least one letter and one number.');
            valid = false;
        } else {
            setPasswordError('');
        }

        // Proceed if all validations are successful
        if (valid) {
            try {
                await AsyncStorage.setItem('Auth', JSON.stringify({ email, password }));
                navigation.navigate('ProductList');
            } catch (error) {
                Alert.alert('Error', 'Failed to save data.');
            }
        }
    };

    return (
        <ImageBackground source={{ uri: 'https://example.com/background-image.jpg' }} style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={[styles.input, emailError ? styles.inputError : null]}
                        placeholderTextColor="#aaa"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={[styles.input, passwordError ? styles.inputError : null]}
                        placeholderTextColor="#aaa"
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupButtonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    signupButton: {
        marginTop: 16,
        alignItems: 'center',
        width: '100%',
    },
    signupButtonText: {
        color: '#4CAF50',
        fontSize: 16,
    },
});

export default LoginScreen;
