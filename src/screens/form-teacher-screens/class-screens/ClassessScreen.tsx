import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import ClassCard from '../components/ClassCard'
import AppHeader from '@safsims/components/Header/AppHeader'

export default function ClassessScreen({navigation}) {
  return (
  <View style={styles.container}>
    <AppHeader navigation={navigation}/>
    <ScrollView style={styles.classes}>
    <ClassCard onPress={()=>navigation.navigate('ClassProfile')}/>
    <ClassCard/>
    <ClassCard/>
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFFFFF',
    
    },
    classes:{
  flex:1,
  padding:20
    }
})