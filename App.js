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
// VENTAS
import sellingsIndex from './screens/sellings/index';
import sellingsCreate from './screens/sellings/create';
import sellingsShow from './screens/sellings/show';
// ENTRADAS
import inputsIndex from './screens/inputs/index';
import inputsCreate from './screens/inputs/create';
import inputsShow from './screens/inputs/show';
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

const SellingStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="SellingsIndex" component={sellingsIndex} options={{title: 'Listar Ventas'}} />
			<Stack.Screen name="CreateSelling" component={sellingsCreate} options={{title: 'Crear Venta'}} />
			<Stack.Screen name="ShowSelling" component={sellingsShow} options={{title: 'Ver Venta'}} />
		</Stack.Navigator>
	);
};

const InputStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="InputsIndex" component={inputsIndex} options={{title: 'Listar Entradas'}} />
			<Stack.Screen name="CreateInput" component={inputsCreate} options={{title: 'Crear Entradas'}} />
			<Stack.Screen name="ShowInput" component={inputsShow} options={{title: 'Ver Entradas'}} />
		</Stack.Navigator>
	);
};

const App = () => {
  return (
    <NavigationContainer>
		<Drawer.Navigator initialRouteName="Entradas">
			<Drawer.Screen name="Entradas" component={InputStack} />
			<Drawer.Screen name="Inventario" component={inventoryScreen} />
			<Drawer.Screen name="Ventas" component={SellingStack} />
			<Drawer.Screen name="Productos" component={ProductStack} />
		</Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;