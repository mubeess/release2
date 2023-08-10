import Icon from '@safsims/components/Icon/Icon'
import Input from '@safsims/components/Input/Input'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import StudentListItem from '../components/StudentListItem'

export default function ResultScreen() {
  return (
  <View style={styles.container}>
    <Input style={{width:'100%'}} IconLeft={<Icon name='search-normal' size={20}/>} placeholder='Search student by name or id'/>
    <StudentListItem/>
    <StudentListItem/>
    <StudentListItem/>
    <StudentListItem/>
    <StudentListItem/>
    <StudentListItem/>
    
  </View>
  )
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    paddingHorizontal:20,
    paddingVertical:10
}
})