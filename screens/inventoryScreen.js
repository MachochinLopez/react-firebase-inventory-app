import React, { useState, useEffect } from 'react';
import { ScrollView} from 'react-native';
import { Text, ListItem } from 'react-native-elements';
// Firebase
import firebase from '../database/firebase';

const inventoryScreen = () => {

    const [products, setProducts] = useState({
        description: '',
        amount: ''
    });

    useEffect(() => {
        firebase.db.collection('products').onSnapshot(querySnapshot => {
            const products = [];

            querySnapshot.docs.forEach(doc => {
                const { description } = doc.data();
                products.push({ id: doc.id, description, amount: 0 });
            });

            setProducts(products);
        });
    }, []);

    return (
        <ScrollView style={{ margin: 10, marginTop: 35 }} >
            <Text h3 style={{ textAlign: 'center', marginVertical: 10 }} >Inventario</Text>
            {/* {
                products.map(product => {
                    return (
                        <ListItem 
                            key={product.id} 
                            bottomDivider 
                        >
                            <ListItem.Content>
                                <ListItem.Title>{product.description}</ListItem.Title>
                                <ListItem.Subtitle>{product.amount} unidades</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    );
                })
            } */}
        </ScrollView>
    );
}

export default inventoryScreen;