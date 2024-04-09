// // import { View, Text, StyleSheet, Image } from 'react-native'
// // import React from 'react'

// // export default function CourseItemList(categoryData) {
// //     console.log('data: '+JSON.stringify(categoryData.categoryData.CategoryItems) )
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.heading}>Item List</Text>

// //       <View>
// //         {categoryData.categoryData.CategoryItems && categoryData.categoryData.CategoryItems.map((item,index)=>(
// //             <View key={index}>
// //                <Image source={{uri:item.image}} style={styles.image}/> 
// //             </View>
// //         ))}
// //       </View>
// //     </View>
// //   )
// // }
// import { View, Text, StyleSheet, Image } from 'react-native'
// import React from 'react'
// import Colors from '../../utils/Colors';

// export default function CourseItemList(categoryData) {
//   console.log('data: '+JSON.stringify(categoryData.categoryData.CategoryItems) );
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Item List</Text>

//       <View style={{marginTop:15}}>
//         {categoryData.categoryData.CategoryItems.length && 
//         categoryData.categoryData.CategoryItems.length > 0 ? 
//         categoryData.categoryData.CategoryItems.map((item,index)=>(
//            <>
//            <View key={index} style={styles.itemContainer}>
//                <Image source={{uri:item.image}} style={styles.image}/> 
//             <View style={{flex:1,marginLeft:10}}> 
//             <Text style={styles.name}>{item.name}</Text>
//             <Text style={styles.url}>{item.url}</Text>
//             </View>
//             <Text style={styles.cost}>
//               {item.cost}
//             </Text> 
//             </View>
//             {categoryData.categoryData.CategoryItems.length && categoryData.categoryData.CategoryItems.length-1 != index &&
//             <View style={{borderWidth:0.5,marginTop:10,borderBlockColor:Colors.GRAY}} />
// }
//             </>
//         )): 
//         <View>
//         <Text>No Item Found</Text>
//       </View>
        
//         }
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container:{
//         marginTop:20
//     },
//     heading:{
//         fontFamily:'outfit-bold',
//         fontSize:20
//     },
//     image:{
//        width:90,
//        height:80,
//        borderRadius:15
//     },itemContainer:{
//       display:'flex',
//       flexDirection:'row',
//       justifyContent:'space-between',
//       alignItems:'center'
//     },
//     name:{
//       fontFamily:'outfit-bold',
//       fontSize:20
//     },
//     url:{
//       fontFamily:'outfit',
//       color:Colors.GRAY
//     },
//     cost:{
//       fontSize:17,
//       marginLeft:10,
//       fontFamily:'outfit-bold'
//     }
// })

import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { supabase } from '../../utils/SupabaseConfig';
import { openURL } from 'expo-linking';

export default function CourseItemList(categoryData,setUpdateRecords) {
  const [expandItem,setExpandIteam]=useState();

  const onDeleteItem=async(id)=>{
  const {error}=await supabase.from('CategoryItems')
  .delete()
  .eq('id',id);

  ToastAndroid.show('Item Deleted!',ToastAndroid.SHORT);
  setUpdateRecords(true)
}
const openURL=(url)=>{
  if(url)
  {
    Linking.openURL(url);
  }
}
  console.log('data: '+JSON.stringify(categoryData.categoryData.CategoryItems) );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>

      <View style={{marginTop:15}}>
        {categoryData.categoryData.CategoryItems && categoryData.categoryData.CategoryItems?.length > 0 ? 
        categoryData.categoryData.CategoryItems.map((item,index)=>(
           <>
           <TouchableOpacity key={index}
            style={styles.itemContainer}
              onPress={()=>setExpandIteam(index)}>
               <Image source={{uri:item.image}} style={styles.image}/> 
            <View style={{flex:1,marginLeft:10}}> 
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.url} numberOfLines={2}>{item.url}</Text>
            </View>
            <Text style={styles.cost}>
              {item.cost}
            </Text> 
            </TouchableOpacity>
            {expandItem==index &&
            <View style={styles.actionItemContainer}>
              <TouchableOpacity onPress={()=>onDeleteItem(item.id)}>
              <Ionicons name="trash" size={25} color="red" />
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>openURL(item.url)}>
               <EvilIcons name="external-link" size={34} color="blue" />
               </TouchableOpacity>
               
               </View>
            }
            {categoryData.categoryData.CategoryItems.length-1 !== index &&
            <View style={{borderWidth:0.5,marginTop:10,borderColor:Colors.GRAY}} />
            }           
            
            </>
        )): 
        <View>
        <Text style={styles.noItemText}>No Item Found</Text>
      </View>
        
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20
    },
    heading:{
        fontFamily:'outfit-bold',
        fontSize:20
    },
    image:{
       width:90,
       height:80,
       borderRadius:15
    },
    itemContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:10
    },
    name:{
      fontFamily:'outfit-bold',
      fontSize:20
    },
    url:{
      fontFamily:'outfit',
      color:Colors.GRAY
    },
    cost:{
      fontSize:17,
      marginLeft:10,
      fontFamily:'outfit-bold'
    },
    noItemText:{
      fontFamily:'outfit-bold',
      fontSize:25,
      color:Colors.GRAY
    },
    actionItemContainer:{
      display:'flex',
      flexDirection:'row',
      gap:10,
      justifyContent:'flex-end'
    }
})
