import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
// Elementos
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Text } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

// Firebase
import firebase from '../../database/firebase';

const outputsCreate = (props) => {
    const initialState = {
        amount: '',
        product: '',
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
                const { description } = doc.data();
                products.push({ id: doc.id, description });
            });

            setProducts(products);
        });
    }, [])

    // Función que guarda en la db la entrada.
    const createNewOutput = async () => {
        if (state.amount === '' || 
            state.provider === '' ||
            state.product === '' ||
            state.cost === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios');
        } else {
            try {
                const newOutput = {
                    amount: state.amount,
                    productName: state.product.label,
                    productId: state.product.id
                };

                await firebase.db.collection('outputs').add(newOutput);
                setState(initialState);
                props.navigation.navigate('OutputsIndex');    
            }
            catch (e) {
                Alert.alert('Error', 'Hubo un problema al intentar crear la salida.');
                console.log(e);
            }
        }
    };

    // Handler que actualiza el estado.
    const handleChangeText = (name, value) => {
        let newState = { ...state, [name]: value };

        if (state.amount !== '' && state.product !== '') {
            const cost = state.product.cost * state.amount;
            newState = { ...newState, cost };
        }

        setState(newState);
    };

    return (
        <ScrollView>
            <Card style={styles.card}>
                <Text style={styles.title}>Crear Salida</Text>
                <View>
                    <DropDownPicker
                        items={products.map(product => {
                            return { label: product.description, id: product.id, cost: product.cost };
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
                        style={styles.output} 
                        placeholder="Cantidad" 
                        onChangeText={(value) => { handleChangeText('amount', value) }} 
                    />
                    <Button style={{marginTop: 25}} title="Crear" onPress={() => { createNewOutput() }} />
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
    output: {
        padding: 5
    }
});

export default outputsCreate;