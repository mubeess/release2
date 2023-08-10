import Icon from '@safsims/components/Icon/Icon'
import Input from '@safsims/components/Input/Input'
import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import StudentAttendanceCard from '../components/StudentAttendanceCard'
import Button from '@safsims/components/Button/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@safsims/components/Images'

export default function ClassAttendance() {
  return (
  <>
    <View style={styles.date}>
   <Text style={{
    color:lightTheme.colors.PrimaryGrey,
    fontWeight:'500'
   }} h2>Today's Date</Text>
   <Text h2 style={{
  
    fontWeight:'500'
   }}>23/05/2023</Text>
   </View>

   <View style={styles.searchBar}>
    <Input style={{width:'85%'}} IconLeft={<Icon name='search-normal' size={20}/>} placeholder='Search student by name or id'/>
    <View style={styles.calendar}>
        <Icon name='calendar-search' size={20}/>
    </View>
   </View>

   <ScrollView style={styles.cards}>
   <StudentAttendanceCard/>
   <StudentAttendanceCard/>
   <StudentAttendanceCard/>
   <StudentAttendanceCard/>
   <View style={styles.actionButtons}>
    <Button fontStyle={{color:'#000'}} style={styles.cancel} label='Cancel'/>
    <Button style={styles.save} label='Save'/>
   </View>

   <View style={styles.buttons2}>
            <Button
             
              style={{
                ...styles.button2,
                backgroundColor: "transparent",
                elevation: 0,
                borderWidth: 1,
                borderColor: lightTheme.colors.PrimaryBorderColor,
              }}
              label=""
              IconLeft={<ArrowLeftIcon />}
            />
            <Text style={{color:lightTheme.colors.PrimaryColor}}>1 of 3</Text>
            <Button
              
              IconLeft={<ArrowRightIcon />}
              style={{
                ...styles.button2,
                backgroundColor: "transparent",
                elevation: 0,
                borderWidth: 1,
                borderColor: lightTheme.colors.PrimaryBorderColor,
              }}
              label=""
            />
          </View>
   </ScrollView>
  </>
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