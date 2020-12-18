import React, { useState, useEffect } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Text, ListItem } from 'react-native-elements';

// Firebase
import firebase from '../database/firebase';

const inventoryScreen = () => {

    const [products, setProducts] = useState([]);
    // Indica si está cargando.
    const [isLoading, setIsLoading] = useState(false)

    // Devuelve el amount...
    const getInventory = async () => {
        const myProducts = [];

        const query = firebase.db.collection('products');
        await query.get().then(async querySnapshot => {

            for (const doc of querySnapshot.docs) {
                const { description } = doc.data();
                const myProduct = { id: doc.id, description }
                
                const inputs = await getInputsAmount(doc.id);
                const sellings = await getSellingsAmount(doc.id);
                const outputs = await getOutputsAmount(doc.id);

                myProducts.push({ 
                    ...myProduct, 
                    amount: (inputs - sellings - outputs)
                });
            }
        });

        setProducts(myProducts);
        setIsLoading(true);
    };

    const getInputsAmount = async (productId) => {
        // Suma las entradas.
        const query = firebase.db.collection('inputs').where('productId', '==', productId);                
        const amount = await query.get().then(querySnapshot => {            
            return querySnapshot.docs.reduce((total, doc) => {
                return total += parseInt(doc.data().amount);
            }, 0);
        });

        return amount;
    }

    const getSellingsAmount = async (productId) => {
        // Suma las entradas.
        const query = firebase.db.collection('sellings').where('productId', '==', productId);                
        const amount = await query.get().then(querySnapshot => {            
            return querySnapshot.docs.reduce((total, doc) => {
                return total += parseInt(doc.data().amount);
            }, 0);
        });

        return amount;
    }

    const getOutputsAmount = async (productId) => {
        // Suma las entradas.
        const query = firebase.db.collection('outputs').where('productId', '==', productId);                
        const amount = await query.get().then(querySnapshot => {            
            return querySnapshot.docs.reduce((total, doc) => {
                return total += parseInt(doc.data().amount);
            }, 0);
        });

        return amount;
    }

    useEffect(() => {
        getInventory();
    }, []);

    if(!isLoading) {
        return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        );
    }

    return (
        <ScrollView style={{ margin: 10, marginTop: 35, flex: 1 }} >
            <Text h3 style={{ textAlign: 'center', marginVertical: 10 }} >Inventario</Text>
            {
                products.map(product => {
                    return (
                        <ListItem 
                            key={product.id}
                            leftElement={product.amount}
                            bottomDivider 
                        >
                            <ListItem.Content>
                                <ListItem.Title>{product.description}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    );
                })
            }
        </ScrollView>
    );
}

export default inventoryScreen;