import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
// Elementos
import { Button, ListItem, Text } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const sellingsIndex = (props) => {
    const [sellings, setSellings] = useState([]);

    useEffect(() => {
        firebase.db.collection('sellings').onSnapshot(querySnapshot => {
            const sellings = [];

            querySnapshot.docs.forEach(doc => {
                const { productName, client, amount, paymentType, total } = doc.data();
                sellings.push({ id: doc.id, client, productName, paymentType, total, amount });
            });

            setSellings(sellings);
        });
    }, []);

    return (
        <ScrollView style={{ margin: 10 }}>
            <Button 
                buttonStyle={{ marginBottom: 25, marginTop: 10 }}
                title="Crear Venta" 
                onPress={() => props.navigation.navigate('CreateSelling') }
            />
            <Text h5 style={{margin: 10}}>Total vendido: ${sellings.reduce((a, b) => {
                return a + b.total;
            }, 0)}</Text>
            {
                sellings.map(selling => {
                    return (
                        <ListItem 
                            key={selling.id}
                            bottomDivider 
                            leftElement={
                                <View>
                                    <Text style={{textAlign: 'center'}}>${selling.total}</Text>
                                    <Text style={{textAlign: 'center'}}>{selling.paymentType}</Text>
                                </View>
                            }
                            onPress={() => props.navigation.navigate('ShowSelling', {
                                sellingId: selling.id
                            }) }
                        >
                            <ListItem.Content bottomDivider>
                                <ListItem.Title>{selling.amount} x <Text style={{fontStyle: 'italic'}}>{selling.productName}</Text></ListItem.Title>
                                <ListItem.Subtitle style={{marginVertical: 5}}>Cliente: {selling.client}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    );
                })
            }
        </ScrollView>
    );
}

export default sellingsIndex;