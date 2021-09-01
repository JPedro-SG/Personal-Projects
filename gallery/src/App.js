
import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
} from 'react-native';
import Gallery from './components/Gallery';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageFullScreen from './components/ImageFullScreen';

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Gallery} />
            <Stack.Screen 
                  navigationOptions={() => ({
                    
                  })}
              options={{
                title: '',
                headerShown: false,
                headerStyle: {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                },
                
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
              name="Image"
            >
              {props => <ImageFullScreen {...props} />}
            </Stack.Screen>

          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView> 
  );

};


export default App;
