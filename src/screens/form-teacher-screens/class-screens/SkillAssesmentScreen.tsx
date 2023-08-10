import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import StudentHeader from '../components/StudentHeader'
import Button from '@safsims/components/Button/Button'
import SkillCard from '../components/SkillCard'

export default function SkillAssesmentScreen() {
  return (
   <View style={styles.container}>
    <StudentHeader/>
    <ScrollView style={styles.cards}>
    <SkillCard/>
    <SkillCard/>
    <SkillCard/>
    <SkillCard/>
    </ScrollView>
    <View style={styles.button}>
    <Button  label='Save Entry'/>
    </View>
    
   </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff'
    },
    cards:{
        flex: 1,
        paddingHorizontal:20
  
    },
    button:{
        marginVertical:20,
        paddingHorizontal:20
    }
})