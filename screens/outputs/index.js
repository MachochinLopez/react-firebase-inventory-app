import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
// Elementos
import { Button, ListItem, Text } from 'react-native-elements';
// Firebase
import firebase from '../../database/firebase';

const outputsIndex = (props) => {
    const [outputs, setOutputs] = useState([]);

    useEffect(() => {
        firebase.db.collection('outputs').onSnapshot(querySnapshot => {
            const outputs = [];

            querySnapshot.docs.forEach(doc => {
                const { productName, amount } = doc.data();
                outputs.push({ id: doc.id, productName, amount });
            });

            setOutputs(outputs);
        });
    }, []);

    return (
        <ScrollView style={{ margin: 10 }}>
            <Button 
                buttonStyle={{ marginBottom: 25, marginTop: 10 }}
                title="Crear Salida" 
                onPress={() => props.navigation.navigate('CreateOutput') }
            />
            {
                outputs.map(output => {
                    return (
                        <ListItem 
                            key={output.id}
                            bottomDivider 
                            leftElement={
                                <View>
                                    <Text style={{textAlign: 'center'}}>{output.amount}</Text>
                                </View>
                            }
                            onPress={() => props.navigation.navigate('ShowOutput', {
                                outputId: output.id
                            }) }
                        >
                            <ListItem.Content bottomDivider>
                                <ListItem.Title><Text style={{fontStyle: 'italic'}}>{output.productName}</Text></ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    );
                })
            }
        </ScrollView>
    );
}

export default outputsIndex;