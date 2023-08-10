import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import StudentHeader from '../components/StudentHeader'
import { lightTheme } from '@safsims/utils/Theme'
import Text from '@safsims/components/Text/Text'
import ResultCard from '../components/ResultCard'

export default function ResultDetailScreen() {
  return (
   <View style={styles.container}>
    <StudentHeader/>
    <View style={styles.resultRow}>
     <View style={styles.resultData}>
        <Text style={{fontSize:10,marginBottom:10}}>No. Of Students</Text>
        <Text h2>5</Text>
     </View>

     <View style={styles.resultData}>
        <Text style={{fontSize:10,marginBottom:10}}>Class Average</Text>
        <Text h2>23.33</Text>
     </View>

     <View style={{
        ...styles.resultData,
        borderRightWidth:0
     } }>
        <Text style={{fontSize:10,marginBottom:10}}>Highest Average</Text>
        <Text h2>40</Text>
     </View>
    </View>





    <View style={{
        ...styles.resultRow,
        borderTopWidth:0
    }}>
     <View style={styles.resultData}>
        <Text style={{fontSize:10,marginBottom:10}}>Lowest Average</Text>
        <Text h2>10.0</Text>
     </View>

     <View style={styles.resultData}>
        <Text style={{fontSize:10,marginBottom:10}}>Final Average</Text>
        <Text h2>23.33</Text>
     </View>

     <View style={{
        ...styles.resultData,
        borderRightWidth:0
     } }>
        <Text style={{fontSize:10,marginBottom:10}}>Grade</Text>
        <Text style={{color:lightTheme.colors.PrimaryRed}} h2>F</Text>
     </View>
    </View>

    <ScrollView style={styles.cards}>
        <ResultCard/>
    </ScrollView>
   </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    resultRow:{
        height:70,
        borderBottomColor:lightTheme.colors.PrimaryBorderColor,
        borderBottomWidth:1,
        borderTopColor:lightTheme.colors.PrimaryBorderColor,
        borderTopWidth:1,
        flexDirection:'row',
        overflow: 'hidden'
    },
    resultData:{
        width:'33.33%',
        borderRightColor:lightTheme.colors.PrimaryBorderColor,
        borderRightWidth:1,
        paddingHorizontal:20,
        paddingVertical:10
    },
    cards:{
        paddingHorizontal:20,
        flex:1
    }
})