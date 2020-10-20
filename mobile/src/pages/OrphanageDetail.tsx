import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

const OrphanageDetail: React.FC = () => {
  return (
      <View style = {styles.container} >
          <Text>
              Detalhes Detalhaos de forma detalhada
          </Text>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: "center",
        flex: 1
    }
})

export default OrphanageDetail;