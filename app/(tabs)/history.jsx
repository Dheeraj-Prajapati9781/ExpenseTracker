// import { View, Text } from 'react-native'
// import React from 'react'
// import Colors from '../../utils/Colors'

// export default function History() {
//   return (
//     <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
//       <View style={{paddingHorizontal: 20,  width: '100%'}}>
//         <View style={{
//           width: '100%', 
//           backgroundColor: Colors.BLUE, 
//           height: '35%', 
//           borderRadius: 30,
//           justifyContent: 'center',
//           alignItems: 'center'
//           }}>
//           <Text style={{fontWeight: 600, fontSize: 20}}>Coming Soon</Text>
//         </View>
//       </View>
//     </View>
//   )
// }

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CircularChart from '../../components/CircularChart';

// Mock data for demonstration
const mockCategoryList = [
  {
    name: 'Category 1',
    CategoryItems: [
      { cost: 100 },
      { cost: 200 },
      { cost: 150 }
    ]
  },
  {
    name: 'Category 2',
    CategoryItems: [
      { cost: 300 },
      { cost: 200 },
      { cost: 150 }
    ]
  },
  {
    name: 'Category 3',
    CategoryItems: [
      { cost: 100 },
      { cost: 150 }
    ]
  },
  {
    name: 'Category 4',
    CategoryItems: [
      { cost: 200 },
      { cost: 250 }
    ]
  },
  {
    name: 'Category 5',
    CategoryItems: [
      { cost: 400 },
      { cost: 350 }
    ]
  }
];

export default History = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    // Fetch category data from API or storage
    // For demonstration, using mock data
    setCategoryList(mockCategoryList);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.chartContainer}>
        <CircularChart categoryList={categoryList} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
  },
});

