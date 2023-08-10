import Button from '@safsims/components/Button/Button'
import AppHeader from '@safsims/components/Header/AppHeader'
import { MoreIcon } from '@safsims/components/Images'
import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import ClassCard from './components/ClassCard'
import AttendanceCard from './components/AttendanceCard'
import TeachersCard from './components/TeachersCard'

function FormTeacherHomeScreen({navigation}) {

    return (
      <View style={styles.container}> 
       <AppHeader navigation={navigation}/>
      
      <ScrollView style={styles.content}>
      <View style={styles.head}>
        <Text h3>Assigned Classes</Text>
        <Button fontStyle={{color:lightTheme.colors.PrimaryGrey}} IconLeft={<MoreIcon/>} style={styles.more} label='See more'/>
       </View>
      <ClassCard/>
      <ClassCard/>
      <ClassCard/>

      <View style={styles.head}>
        <Text h3>Attendance Status</Text>
        <Button fontStyle={{color:lightTheme.colors.PrimaryGrey}} IconLeft={<MoreIcon/>} style={styles.more} label='See more'/>
       </View>
       
       <View style={styles.attendanceContainer}>
       <AttendanceCard/>
       <AttendanceCard/>
       <AttendanceCard isLast/>
       </View>
    

       <View style={styles.head}>
        <Text h3>Teachers List</Text>
        <Button fontStyle={{color:lightTheme.colors.PrimaryGrey}} IconLeft={<MoreIcon/>} style={styles.more} label='See more'/>
       </View>
       <View style={styles.attendanceContainer}>
       <TeachersCard/>
       <TeachersCard/>
       <TeachersCard isLast/>
       </View>
      
      </ScrollView>
      
      </View>
    )
  
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#FFFFFF',
  },
  head:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width:'100%',
   marginBottom:20
  
  },
  more:{
    width:120,
    height:36,
    backgroundColor:lightTheme.colors.PrimaryFade,
    marginLeft:'auto',
    marginRight:0
  },
  content:{
    flex:1,
    padding:20,
  
  },
  attendanceContainer:{
    height:200,
      width:'100%',
      borderWidth:1,
      borderColor:lightTheme.colors.PrimaryBorderColor,
      marginBottom:25,
      borderRadius:5
  }
})
export default FormTeacherHomeScreen