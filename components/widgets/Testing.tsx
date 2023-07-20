import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';

const Testing = () => {
  const [color, setColor] = useState('red');
  return (
    <View>
      <>
        <Pressable
          onPress={() => {
            setColor('green');
            console.log('hiiiiii');
          }}>
          <Text style={{color: color}}>jniyg</Text>
        </Pressable>
      </>
    </View>
  );
};

export default Testing;
