import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import ClassProfileHeader from '../components/ClassProfileHeader'
import Button from '@safsims/components/Button/Button'
import { lightTheme } from '@safsims/utils/Theme'
import { ArrowLeftIcon, ArrowRightIcon, MoreIcon } from '@safsims/components/Images'
import Text from '@safsims/components/Text/Text'
import Input from '@safsims/components/Input/Input'
import Icon from '@safsims/components/Icon/Icon'
import StudentAttendanceCard from '../components/StudentAttendanceCard'
import ClassAttendance from './ClassAttendance'
import SkillsScreen from './SkillsScreen'
import SubjectsScreen from './SubjectsScreen'
import ResultScreen from './ResultScreen'

export default function ClassProfileScreen({navigation}) {
    const [active,setActive] = useState(0)
    const handleActive =(next)=>{
        setActive(next)
    }
  return (
    <View style={styles.container}>
    <ClassProfileHeader/>


    <View style={styles.buttons}>
        <View style={styles.menuButtons}>
        <Button 
        onPress={()=>{
            handleActive(0)
        }}
        fontStyle={{
            color: active==0?'#fff':lightTheme.colors.PrimaryColor
        }}
        style={{
            ...styles.button,
            backgroundColor:active==0?lightTheme.colors.PrimaryColor:'#fff'
        }} label='Attendance'/>
        <Button 
         onPress={()=>{
            handleActive(1)
        }}
        fontStyle={{
            color: active==1?'#fff':lightTheme.colors.PrimaryColor
        }}
        style={{
            ...styles.button,
            backgroundColor:active==1?lightTheme.colors.PrimaryColor:'#fff'
        }} label='Early Years'/>
        <Button 
         onPress={()=>{
            handleActive(2)
        }}
        fontStyle={{
            color: active==2?'#fff':lightTheme.colors.PrimaryColor
        }}
        style={{
            ...styles.button,
            backgroundColor:active==2?lightTheme.colors.PrimaryColor:'#fff',
            borderRightWidth:0
        }}  label='Subjects'/>
        </View>
        <Button fontStyle={{color:lightTheme.colors.PrimaryGrey}} IconLeft={<MoreIcon/>} style={styles.more}  label='More'/>
    </View>


   

   
             
        {/* <ClassAttendance/> */}
        {/* <SkillsScreen/> */}
        {/* <SubjectsScreen/> */}
        <ResultScreen/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
  flex: 1,
  backgroundColor:'#FFFFFF',
  },
  buttons:{
    width:'100%',
    flexDirection:'row',
    marginTop:20,
    paddingHorizontal:20
  },
  menuButtons:{
  width:'80%',
  flexDirection:'row',
  borderRadius:10,
  overflow: 'hidden',
  borderWidth:1,
  borderColor:lightTheme.colors.PrimaryColor
  },
  button:{
    width:'33.33%',
    borderRadius:0,
    borderRightWidth:1,
    borderRightColor:lightTheme.colors.PrimaryColor,


  },
  more:{
    width:80,
    marginLeft:5,
    backgroundColor:lightTheme.colors.PrimaryFade
  },
  date:{
    marginTop:20,
    paddingHorizontal:20
  },
  searchBar:{
    marginTop:20,
    flexDirection:'row',
    paddingHorizontal:20,
    alignItems:'center',
    justifyContent:'space-between'
  },
  calendar:{
    height:42,
    width:42,
    borderRadius:42,
    borderWidth:1,
    borderColor:'#000',
    justifyContent:'center',
    alignItems:'center'
  },
  cards:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal:20
  },
  actionButtons:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
    marginBottom:20
  },
  cancel:{
    width:'40%',
    backgroundColor:'#fff',
    borderColor:'#000',
    borderWidth:1
  },
  save:{
    width:'40%'
  },
  buttons2: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom:20,
    alignItems:'center'
  },
  button2: {
    width: 40,
  },
})
