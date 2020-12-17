// React & ReactNative
import React from 'react';
// Navigation.
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

/**************
 *  Screens.  *
 **************/

// PRODUCTOS
import productsIndex from './screens/products/index';
import productsCreate from './screens/products/create';
import productsShow from './screens/products/show';
// INVENTARIO
import inventoryScreen from './screens/inventoryScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="ProductsIndex" component={productsIndex} options={{title: 'Listar Productos'}} />
			<Stack.Screen name="CreateProduct" component={productsCreate} options={{title: 'Crear Producto'}} />
			<Stack.Screen name="ShowProduct" component={productsShow} options={{title: 'Editar Producto'}} />
		</Stack.Navigator>
	);
};

const App = () => {
  return (
    <NavigationContainer>
		<Drawer.Navigator initialRouteName="Inventario">
			<Drawer.Screen name="Inventario" component={inventoryScreen} />
			<Drawer.Screen name="Productos" component={ProductStack} />
		</Drawer.Navigator>
    </NavigationContainer>
  );
}



export default App;