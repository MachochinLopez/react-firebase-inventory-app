import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
// Elementos
import { Button, ListItem, Text } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const inputsIndex = (props) => {
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        firebase.db.collection('inputs').onSnapshot(querySnapshot => {
            const inputs = [];

            querySnapshot.docs.forEach(doc => {
                const { productName, provider, amount, cost } = doc.data();
                inputs.push({ id: doc.id, provider, productName, cost, amount });
            });

            setInputs(inputs);
        });
    }, []);

    return (
        <ScrollView style={{ margin: 10 }}>
            <Button 
                buttonStyle={{ marginBottom: 25, marginTop: 10 }}
                title="Crear Entrada" 
                onPress={() => props.navigation.navigate('CreateInput') }
            />
            <Text h5 style={{margin: 10}}>Total gastado: ${inputs.reduce((a, b) => {
                return a + b.cost;
            }, 0)}</Text>
            {
                inputs.map(input => {
                    console.log(input)
                    return (
                        <ListItem 
                            key={input.id}
                            bottomDivider 
                            leftElement={
                                <View>
                                    <Text style={{textAlign: 'center'}}>${input.cost}</Text>
                                    <Text style={{textAlign: 'center'}}>{input.amount}</Text>
                                </View>
                            }
                            onPress={() => props.navigation.navigate('ShowInput', {
                                inputId: input.id
                            }) }
                        >
                            <ListItem.Content bottomDivider>
                                <ListItem.Title><Text style={{fontStyle: 'italic'}}>{input.productName}</Text></ListItem.Title>
                                <ListItem.Subtitle style={{marginVertical: 5}}>Proveedor: {input.provider}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    );
                })
            }
        </ScrollView>
    );
}

export default inputsIndex;