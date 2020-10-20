import React from 'react';

import Header from './components/Header'

import {NavigationContainer} from '@react-navigation/native'
// import { Container } from './styles';
import {createStackNavigator} from '@react-navigation/stack'
const {Navigator, Screen} = createStackNavigator()
import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import OrphanageMapPosition from './pages/CreateOrphanages/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanages/OrphanageData'

const Routes: React.FC = () => {
  return(
    <NavigationContainer>
        <Navigator screenOptions = {{
            headerShown: false,
            cardStyle : {
              backgroundColor: '#f2f3f5'
            }
        }} >
            <Screen 
              name = 'OrphanagesMap' 
              component = {OrphanagesMap}
              />

            <Screen 
              name = 'OrphanageDetails' 
              component = {OrphanageDetails}
              options = {{
                headerShown: true,
                header: () => <Header 
                  title = 'Orfanato'
                  showCancel = {false} />
              }}
              />

            <Screen 
              name = 'OrphanageData' 
              component = {OrphanageData}
              options = {{
                headerShown: true,
                header: () => <Header 
                  title = 'Informe os Dados'/>
              }}
              />

            <Screen 
              name = 'SelectMapPosition' 
              component = {OrphanageMapPosition}
              options = {{
                headerShown: true,
                header: () => <Header 
                  title = 'Selecione no Mapa'
                  showCancel = {true}
                   />
              }}
              />
        </Navigator>
    </NavigationContainer>
  )
}

export default Routes;