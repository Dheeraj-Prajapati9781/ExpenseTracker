// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
// import React, { useState } from 'react'
// import Colors from './../utils/Colors'
// import ColorPicker from '../components/ColorPicker'
// import { MaterialIcons } from '@expo/vector-icons';
// import{supabase} from './../utils/SupabaseConfig'
// import{client} from './../utils/KindeConfig'

// export default function AddNewCategory() {
//   const [selectedIcon,setSelectedIcon]=useState('IC')
//   const [selectedColor,setSelectedColor]=useState (Colors.PURPLE)
//   const [categoryName,setCategoryName]=useState();
//   const [totalBudget,setTotalBudget]=useState();

//   const onCreateCategory=async()=>{
//     const user=await client.getUserDetails();
//     const {data,error}=await supabase.from('Category')
//     .insert([{
//       name:categoryName,
//       assigned_budget:totalBudget,
//       icon:selectedIcon,
//       color:selectedColor,
//       created_by:user.email
//     }]).select();
//     console.log(data);
//     if(data){
//       ToastAndroid.show('Category Created!',ToastAndroid.SHORT)
//     }
//   }
//   return (
//     <View style={{
//         marginTop:20,
//         padding:20
//     }}>
//       <View style={{
//         justifyContent:'center',
//         alignItems:'center' 
//       }}>
//         <TextInput
//          style={[styles.iconInput,{backgroundColor:selectedColor}]} 
//          maxLength={2}
//          onChangeText={(value)=>setSelectedIcon(value)}
//         >{selectedIcon}</TextInput>
//         <ColorPicker
//         selectedColor={selectedColor}
//         setSelectedColor={(color)=>setSelectedColor(color)}/>
//       </View>

//        {/* Add Category Name and Total Budget Section */}

//        <View style={styles.inputView}>
//        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
//        <TextInput placeholder='Category Name'
//          onChange={(v)=>setCategoryName(v)}
//        style={{
//         width:'100%',fontSize:17
//        }}/>
//        </View>

//        <View style={styles.inputView}>
//        <MaterialIcons name="currency-rupee" size={24} color={Colors.GRAY} />
//        <TextInput placeholder='Total Budget'
//        onChange={(v)=>setTotalBudget(v)}
//           keyboardType='numeric'
//        style={{
//         width:'100%',fontSize:17
//        }}/>
//        </View>
//        <TouchableOpacity style={styles.button}
//          disabled={!categoryName||!totalBudget}
//          onPress={()=>onCreateCategory()}>
//         <Text style={{
//           textAlign:'center',
//           fontSize:16,
//           color:Colors.WHITE
//       }}>Create</Text>
//        </TouchableOpacity>
//     </View>
//   )
// }
//     const styles =StyleSheet.create({
//       iconInput:{
//         textAlign:'center',
//         fontSize:30,
//         padding:20,
//         borderRadius:99,
//         paddingHorizontal:28,
//         color:Colors.WHITE
//       },
//       inputView:{
//         borderWidth:1,
//         display:'flex',
//         flexDirection:'row',
//         gap:5,
//         padding:14,
//         borderRadius:10,
//         borderColor:Colors.GRAY,
//         backgroundColor:Colors.WHITE,
//         alignItems:'center',
//         marginTop:10
//       },
//       button:{
//         backgroundColor:Colors.PRIMARY,
//         padding:15,
//         borderRadius:10,
//         marginTop:30
//       }
    
//     }
//     )

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from './../utils/Colors';
import ColorPicker from '../components/ColorPicker';
import { supabase } from './../utils/SupabaseConfig';
import { client } from './../utils/KindeConfig';
import { useRouter } from 'expo-router';

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PURPLE);
  const [categoryName, setCategoryName] = useState();
  const [totalBudget, setTotalBudget] = useState();
  const [loading,setLoading]=useState(false);

  const router=useRouter();
  const onCreateCategory = async () => {
    setLoading(true)
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from('Category')
      .insert([
        {
          name: categoryName,
          assigned_budget: totalBudget,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email
        }
      ]).select();
    console.log("500: "+ JSON.stringify(data));
    if (data) {
      router.replace({
        pathname:'/category-details',
        params:{
          categoryId:data[0].id
        }
        
      })
      setLoading(false)
      ToastAndroid.show('Category Created!', ToastAndroid.SHORT);
    }
    if(error){
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconPicker}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          value={selectedIcon} // Use value instead of children for TextInput
          onChangeText={(value) => setSelectedIcon(value)}
        />
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>

      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder='Category Name'
          value={categoryName}
          onChangeText={(value) => setCategoryName(value)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputView}>
        <MaterialIcons name="currency-rupee" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder='Total Budget'
          value={totalBudget}
          onChangeText={(value) => setTotalBudget(value)}
          keyboardType='numeric'
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: (categoryName && totalBudget) ? Colors.PRIMARY : Colors.GRAY }]}
        disabled={!categoryName || !totalBudget||loading}
        onPress={onCreateCategory}>
          {loading?
          <ActivityIndicator color={Colors.WHITE}/>
          :
        <Text style={styles.buttonText}>Create</Text>
          }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20
  },
  iconPicker: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE
  },
  inputView: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    marginTop: 10
  },
  input: {
    flex: 1,
    fontSize: 17,
    marginLeft: 10
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.WHITE
  }
});
