import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
// Elementos
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, output, Text } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const outputsShow = (props) => {

    const initialState = {
        id: '',
        amount: '',
        product: ''
    };
    // outputo
    const [output, setOutput] = useState(initialState);
    // Indica si está cargando.
    const [loading, setLoading] = useState(true)

    // Devuelve el outputo...
    const getOutputById = async id => {
        const query = firebase.db.collection('outputs').doc(id);
        const doc = await query.get();
        const output = doc.data();

        setOutput({ ...output, id: doc.id});
        setLoading(false);
    };
    
    useEffect(() => {
        getOutputById(props.route.params.outputId);
    }, []);


    // Elimina un usuario.
    const deleteOutput = async () => {
        const query = firebase.db.collection('outputs').doc(props.route.params.outputId);
        await query.delete();
        props.navigation.navigate('OutputsIndex');
    };

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar', '¿Seguro que quieres eliminar esta salida?', [
            {text: 'Sí', onPress: () => deleteOutput() },
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
                <Text style={styles.title}>{output.productName}</Text>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Cantidad: <Text>{output.amount}</Text></Text>
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
    output: {
        padding: 5
    }
});

export default outputsShow;