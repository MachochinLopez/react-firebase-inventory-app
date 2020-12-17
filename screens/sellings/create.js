import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
// Elementos
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Text } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

// Firebase
import firebase from '../../database/firebase';

const sellingsCreate = (props) => {
    const initialState = {
        amount: '',
        client: '',
        paymentType: '',
        product: '',
        total: '',
        productId: ''
    };
    // State
    const [state, setState] = useState(initialState);

    const [products, setProducts] = useState([]);

    // INICIALIZA LOS PRODUCTOS
    useEffect(() => {
        firebase.db.collection('products').onSnapshot(querySnapshot => {
            const products = [];

            querySnapshot.docs.forEach(doc => {
                const { description, price } = doc.data();
                products.push({ id: doc.id, description, price });
            });

            setProducts(products);
        });
    }, [])

    // Función que guarda en la db el sellingo.
    const createNewSelling = async () => {
        if (state.amount === '' || 
            state.client === '' ||
            state.paymentType === '' ||
            state.product === '' ||
            state.total === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios');
        } else {
            try {
                const newSelling = {
                    amount: state.amount,
                    client: state.client,
                    paymentType: state.paymentType,
                    productName: state.product.label,
                    total: state.total,
                    productId: state.product.id
                };

                await firebase.db.collection('sellings').add(newSelling);
                setState(initialState);
                props.navigation.navigate('SellingsIndex');    
            }
            catch (e) {
                Alert.alert('Error', 'Hubo un problema al intentar crear la venta.');
                console.log(e);
            }
        }
    };

    // Handler que actualiza el estado.
    const handleChangeText = (name, value) => {
        let newState = { ...state, [name]: value };

        if (state.amount !== '' && state.product !== '') {
            const total = state.product.price * state.amount;
            newState = { ...newState, total };
        }

        setState(newState);
    };

    return (
        <ScrollView>
            <Card style={styles.card}>
                <Text style={styles.title}>Crear Venta</Text>
                <View>
                    <DropDownPicker
                        items={products.map(product => {
                            return { label: product.description, id: product.id, price: product.price };
                        })}
                        containerStyle={{height: 45, margin: 10}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        placeholder="Seleccione un producto..."
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={value => { handleChangeText('product', value) }}
                    />
                    <Input 
                        style={styles.input} 
                        placeholder="Cantidad" 
                        onChangeText={(value) => { handleChangeText('amount', value) }} 
                    />
                    <Input 
                        style={styles.input} 
                        placeholder="Cliente" 
                        onChangeText={(value) => { handleChangeText('client', value) }} 
                    />
                    <Input 
                        style={styles.input} 
                        placeholder="Tipo de pago" 
                        onChangeText={(value) => { handleChangeText('paymentType', value) }} 
                    />
                    <Text h4 style={{margin: 10}}>Total: ${state.total}</Text>
                    <Button style={{marginTop: 25}} title="Crear" onPress={() => { createNewSelling() }} />
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

export default sellingsCreate;