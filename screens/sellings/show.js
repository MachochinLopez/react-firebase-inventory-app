import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
// Elementos
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Input, Text } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const sellingsShow = (props) => {

    const initialState = {
        id: '',
        description: '',
        price: ''
    };
    // sellingo
    const [selling, setSelling] = useState(initialState);
    // Indica si está cargando.
    const [loading, setLoading] = useState(true)

    // Devuelve el sellingo...
    const getSellingById = async id => {
        const query = firebase.db.collection('sellings').doc(id);
        const doc = await query.get();
        const selling = doc.data();

        console.log(selling)

        setSelling({ ...selling, id: doc.id});
        setLoading(false);
    };
    
    useEffect(() => {
        getSellingById(props.route.params.sellingId);
    }, []);


    // Elimina un usuario.
    const deleteSelling = async () => {
        const query = firebase.db.collection('sellings').doc(props.route.params.sellingId);
        await query.delete();
        props.navigation.navigate('SellingsIndex');
    };

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar', '¿Seguro que quieres eliminar este sellingo?', [
            {text: 'Sí', onPress: () => deleteSelling() },
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
                <Text style={styles.title}>Editar Venta</Text>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Producto: <Text>{selling.productName}</Text></Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Cantidad: <Text>{selling.amount}</Text></Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Cliente: <Text>{selling.client}</Text></Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Total: <Text>{selling.total}</Text></Text>
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

export default sellingsShow;