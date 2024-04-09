import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/services';
import { supabase } from '../../utils/SupabaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { useRouter } from 'expo-router';

export default function Profile() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await client.getUserDetails();
    console.log(user);
    setUser(user);
  }

  const handleSignOut = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData('login', 'false');
      // User was logged out
      router.replace('/login');
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.topBackground} />
      <View style={styles.container}>
        {user && (
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: user.picture }}
              style={styles.profileImage}
            />
            <Text style={styles.profileText}>Name: {user.given_name}</Text>
            <Text style={styles.profileText}>Email: {user.email}</Text>

        {/* Additional Features */}
        <View style={styles.additionalFeaturesContainer}>
          <TouchableOpacity style={styles.additionalFeature}>
            <MaterialIcons name="star" size={24} color="#fff" />
            <Text style={styles.additionalFeatureText}>Rate us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalFeature}>
            <MaterialIcons name="description" size={24} color="#fff" />
            <Text style={styles.additionalFeatureText}>Terms and Services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalFeature}>
            <MaterialIcons name="privacy-tip" size={24} color="#fff" />
            <Text style={styles.additionalFeatureText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalFeature}>
            <MaterialIcons name="info" size={24} color="#fff" />
            <Text style={styles.additionalFeatureText}>About us</Text>
          </TouchableOpacity>
          <Text style={styles.appVersion}>App version: 1.0</Text>
        

        <TouchableOpacity
          onPress={() => {
            handleSignOut();
          }}
          style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
        </View>
            </View>
            )}
      </View>
      {/* <View style={styles.bottomBackground} /> */}
      </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    // backgroundColor: '#fff', // Change color as needed
  },
  // bottomBackground: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: '30%',
  //   backgroundColor: '#ff3333', // Change color as needed
  // },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,// Ensure that content is above background

  },
  profileContainer: {
    alignItems: 'center',
    marginTop: '100%',
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    // elevation: -4,
  },
  profileImage: {
    top: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    
  },
  profileText: {
    fontSize: 20,
    marginBottom: 5,
    color:'#fff',
    top:-30

  },
  additionalFeaturesContainer: {
    marginTop: 30,
    alignItems: 'flex-start',
    alignSelf:'flex-start',
    paddingHorizontal:20,
    gap:8
  },
  additionalFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  additionalFeatureText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
  },
  appVersion: {
    marginTop: 10,
    fontSize: 20,
    color: '#fff',
  },
  signOutButton: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,

  },
  signOutButtonText: {
    color: 'black',
    fontSize: 18,
  },
});
