import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
// Elementos
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Text } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const inputsShow = (props) => {

    const initialState = {
        id: '',
        provider: '',
        amount: '',
        cost: '',
        product: ''
    };
    // Inputo
    const [input, setInput] = useState(initialState);
    // Indica si está cargando.
    const [loading, setLoading] = useState(true)

    // Devuelve el Inputo...
    const getInputById = async id => {
        const query = firebase.db.collection('inputs').doc(id);
        const doc = await query.get();
        const input = doc.data();

        setInput({ ...input, id: doc.id});
        setLoading(false);
    };
    
    useEffect(() => {
        getInputById(props.route.params.inputId);
    }, []);


    // Elimina un usuario.
    const deleteInput = async () => {
        const query = firebase.db.collection('inputs').doc(props.route.params.inputId);
        await query.delete();
        props.navigation.navigate('InputsIndex');
    };

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar', '¿Seguro que quieres eliminar esta entrada?', [
            {text: 'Sí', onPress: () => deleteInput() },
            {text: 'No', onPress: () => console.log('false') }
        ]);
    };

    // Devuelve una pantalla de carga.
    if (loading) {
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        );
    }

    return (
        <ScrollView>
            <Card style={styles.card}>
                <Text style={styles.title}>{input.productName}</Text>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Cantidad: <Text>{input.amount}</Text></Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Proveedor: <Text>{input.provider}</Text></Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Costo: <Text>{input.cost}</Text></Text>
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

export default inputsShow;