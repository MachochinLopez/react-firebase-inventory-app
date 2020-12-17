import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
// Elementos
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Text } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const productsShow = (props) => {

    const initialState = {
        id: '',
        description: '',
        price: '',
        cost: ''
    };
    // Producto
    const [product, setProduct] = useState(initialState);
    // Indica si está cargando.
    const [loading, setLoading] = useState(true)

    // Devuelve el producto...
    const getProductById = async id => {
        const query = firebase.db.collection('products').doc(id);
        const doc = await query.get();
        const product = doc.data();

        setProduct({ ...product, id: doc.id});
        setLoading(false);
    };
    
    useEffect(() => {
        getProductById(props.route.params.productId);
    }, []);

    // Handler que actualiza el estado.
    const handleChangeText = (name, value) => {
        setProduct({ ...product, [name]: value });
    };

    // Elimina un usuario.
    const deleteProduct = async () => {
        const query = firebase.db.collection('products').doc(props.route.params.productId);
        await query.delete();
        props.navigation.navigate('ProductsIndex');
    };

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar', '¿Seguro que quieres eliminar este producto?', [
            {text: 'Sí', onPress: () => deleteProduct() },
            {text: 'No', onPress: () => console.log('false') }
        ]);
    };

    // Función que edita en la db el producto.
    const editProduct = async () => {

        const productRef = firebase.db.collection('products').doc(product.id);
        // Actualiza el producto.
        await productRef.set({
            description: product.description,
            price: product.price,
            cost: product.cost
        });

        // Actualiza las ventas de este producto.
        await firebase.db.collection('sellings')
            .where('productId', '==', product.id)
            .onSnapshot(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    const ref = firebase.db.collection('sellings').doc(doc.id)
                    ref.update({ 
                        productName: product.description,
                        total: product.price * doc.data().amount
                    });
                });
            });

        await firebase.db.collection('inputs')
            .where('productId', '==', product.id)
            .onSnapshot(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    const ref = firebase.db.collection('inputs').doc(doc.id)
                    ref.update({ 
                        productName: product.description,
                        cost: product.price * doc.data().amount
                    });
                });
            });

        await firebase.db.collection('outputs')
            .where('productId', '==', product.id)
            .onSnapshot(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    const ref = firebase.db.collection('outputs').doc(doc.id)
                    ref.update({ 
                        productName: product.description
                    });
                });
            });
    
        setProduct(initialState);
        props.navigation.navigate('ProductsIndex');
    };

    // Devuelve una pantalla de carga.
    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        );
    }

    return (
        <ScrollView>
            <Card style={styles.card}>
                <Text style={styles.title}>Editar Producto</Text>
                <View>
                    <Input 
                        style={styles.input} 
                        placeholder="Descripción"
                        label="Descripción"
                        value={product.description} 
                        onChangeText={(value) => { handleChangeText('description', value) }} 
                    />
                    <Input 
                        style={styles.input} 
                        placeholder="Precio ($)"
                        label="Precio ($)"
                        value={product.price} 
                        onChangeText={(value) => { handleChangeText('price', value) }} 
                    />
                    <Input 
                        style={styles.input} 
                        placeholder="Costo ($)"
                        label="Costo ($)"
                        value={product.cost} 
                        onChangeText={(value) => { handleChangeText('cost', value) }} 
                    />
                    <Button 
                        buttonStyle={{marginTop: 25, backgroundColor: '#19AC52'}} 
                        title="Editar" 
                        onPress={() => { editProduct() }} 
                    />
                    <Button 
                        buttonStyle={{marginTop: 25, backgroundColor: '#E37399'}} 
                        title="Eliminar" 
                        onPress={() => { openConfirmationAlert() }} 
                    />
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

export default productsShow;