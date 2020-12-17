import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
// Elementos
import { Button, ListItem } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const productsIndex = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        firebase.db.collection('products').onSnapshot(querySnapshot => {
            const products = [];

            querySnapshot.docs.forEach(doc => {
                const { description, price } = doc.data();
                products.push({ id: doc.id, description, price });
            });

            setProducts(products);
        });
    }, []);

    return (
        <ScrollView style={{ margin: 10 }}>
            <Button 
                buttonStyle={{marginBottom: 25, marginTop: 10 }}
                title="Crear producto" 
                onPress={() => props.navigation.navigate('CreateProduct') } 
            />
            {
                products.map(product => {
                    return (
                        <ListItem 
                            key={product.id} 
                            bottomDivider 
                            onPress={() => props.navigation.navigate('ShowProduct', {
                                productId: product.id
                            }) } 
                        >
                            <ListItem.Content>
                                <ListItem.Title>{product.description}</ListItem.Title>
                                <ListItem.Subtitle>${product.price}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    );
}

export default productsIndex;