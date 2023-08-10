import Icon from '@safsims/components/Icon/Icon'
import Input from '@safsims/components/Input/Input'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import SubjectCard from '../components/SubjectCard'

export default function SubjectsScreen() {
  return (
  <ScrollView style={styles.container}>
    <Input style={{width:'100%'}} IconLeft={<Icon name='search-normal' size={20}/>} placeholder='Search subject name or code'/>

    <SubjectCard/>
    <SubjectCard/>
    <SubjectCard/>
    <SubjectCard/>
    <SubjectCard/>
    <SubjectCard/>

  </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
    paddingHorizontal:20,
    paddingVertical:10
    }
})
