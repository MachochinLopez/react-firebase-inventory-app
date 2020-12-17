import React, { useState } from 'react';
import { Alert } from 'react-native';
// Elementos
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Text } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const productsCreate = (props) => {
    // State
    const [state, setState] = useState({
        description: '',
        price: '',
        cost: ''
    })

    // Handler que actualiza el estado.
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value });
    };

    // Función que guarda en la db el producto.
    const createNewProduct = async () => {
        if (state.description === '' || state.price === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios');
        } else {
            try {
                await firebase.db.collection('products').add({
                    description: state.description,
                    price: state.price,
                    cost: state.cost
                });
                props.navigation.navigate('ProductsIndex');    
            }
            catch (e) {
                Alert.alert('Error', 'Hubo un problema al intentar crear el producto.');
                console.log(e);
            }
        }
    };

    return (
        <ScrollView>
            <Card style={styles.card}>
                <Text style={styles.title}>Crear Producto</Text>
                <View>
                    <Input style={styles.input} placeholder="Descripción" onChangeText={(value) => { handleChangeText('description', value) }} />
                    <Input style={styles.input} placeholder="Precio ($)" onChangeText={(value) => { handleChangeText('price', value) }} />
                    <Input style={styles.input} placeholder="Costo ($)" onChangeText={(value) => { handleChangeText('cost', value) }} />
                    <Button style={{marginTop: 25}} title="Crear" onPress={() => { createNewProduct() }} />
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        padding: 5
    }
});

export default productsCreate;