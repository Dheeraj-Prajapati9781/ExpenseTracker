import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors';
import loginBg from '../../assets/images/loginBg.png';
import {client} from './../../utils/KindeConfig'
import services from  './../../utils/services'
import {useRouter} from 'expo-router';

export default function LoginScreen() {

  const router=useRouter();
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
    
    await services.storeData('login','true');
  router.replace('/')
    }
  };


  return (
    <View style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <Image source={loginBg}
      style={styles.bgImage}
      />
      <View style={{
        backgroundColor:Colors.PRIMARY,
        width:'100%',
        height:'100%',
        padding:20,
        marginTop:-30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30
      }}>
        <Text style={{
          fontSize:35,
          fontWeight: 'bold',
          textAlign: 'center',
          color:Colors.WHITE
        }}>Personal Budget Planner</Text>
        <Text style={{
          fontSize:18,
          textAlign: 'center',
          color:Colors.WHITE,
          marginTop: 20
        }}>Stay on Track, Event by Event: Your Personal Budget Planner App!
        </Text>
        <TouchableOpacity style={styles.button}
        onPress={() => handleSignIn()}>
          <Text style={{textAlign:'center',
          color:Colors.PRIMARY}}>
          Login/Signup</Text>
        </TouchableOpacity>

        <Text style={{
          fontSize:13,
          color:Colors.GRAY,marginTop:10
        }}>* By login/signup oyu will agree to our terms and condition </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bgImage:{ 
    width:200,
    height:400,
    marginTop:70,
    borderWidth:5,
    borderRadius:20,
    borderColor:Colors.BLACK
  },
  button:{
    backgroundColor:Colors.WHITE,
    padding:15,
    paddingHorizontal:5,
    borderRadius:99,
    marginTop:30,
  }
}) 