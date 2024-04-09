import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import { useRouter } from 'expo-router'

export default function CategoryList({ categoryList }) {

    const router = useRouter();

    const onCategoryClick = (category) => {
        router.push({
            pathname: '/category-details',
            params: {
                categoryId: category.id
            }
        })
    }

    // Function to calculate total cost
    const calculateTotalCost = (CategoryItems) => {
        let totalCost = 0;
        CategoryItems.forEach(item => {
            totalCost += item.cost;
        });
        return totalCost;
    }

    // Sort the categoryList by total cost in descending order
    const sortedCategoryList = categoryList ? [...categoryList].sort((a, b) => {
        return calculateTotalCost(b.CategoryItems) - calculateTotalCost(a.CategoryItems);
    }) : [];

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 25, marginBottom: 10 }}>Latest Budget</Text>
            <View>
                {sortedCategoryList.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.container} onPress={() => onCategoryClick(category)}>
                        <View style={styles.iconConatiner}>
                            <Text style={[styles.iconText, { backgroundColor: category.color }]}>
                                {category.icon}
                            </Text>
                        </View>
                        <View style={styles.subContainer}>
                            <View>
                                <Text style={styles.categoryText}>{category.name}</Text>
                                <Text style={styles.itemCount}>{category?.CategoryItems?.length} Items</Text>
                            </View>
                            <Text style={styles.totalAmountText}>{calculateTotalCost(category?.CategoryItems)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 15
    },
    iconConatiner: {
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    iconText: {
        fontSize: 35,
        padding: 16,
        borderRadius: 15
    },
    categoryText: {
        fontFamily: 'outfit-bold',
        fontSize: 20
    },
    itemCount: {
        fontFamily: 'outfit'
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%'
    },
    totalAmountText: {
        fontFamily: 'outfit-bold',
        fontSize: 17
    }
})
