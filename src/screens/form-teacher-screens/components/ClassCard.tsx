import Text from '@safsims/components/Text/Text'
import { lightTheme } from '@safsims/utils/Theme'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function ClassCard({onPress}:{onPress?:()=>void}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.head}>
      <Text h2 style={styles.textHeader}>Class Card</Text>
      <Text  style={styles.textTitle}>Class Card</Text>
    </View>

    <View style={styles.teachersContainer}>
      <View style={styles.teacher}>
        <Image style={styles.image}  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEHB9CujXfJZ9x3Xu0_V7HMcypKdb42-JFoGyXTEbjw&s'}}/>
        <View>
          <Text h3 style={{
            fontSize:10
          }}>Mubarak Ibrahim</Text>
          <Text style={{
            fontSize:10,
            color:lightTheme.colors.PrimaryGrey
          }}>Form Teacher</Text>
        </View>
      </View>
      

      <View style={styles.teacher}>
        <Image style={styles.image}  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEHB9CujXfJZ9x3Xu0_V7HMcypKdb42-JFoGyXTEbjw&s'}}/>
        <View>
          <Text h3 style={{
            fontSize:10
          }}>Mubarak Ibrahim</Text>
          <Text style={{
            fontSize:10,
            color:lightTheme.colors.PrimaryGrey
          }}>Form Teacher</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        height:150,
        width:'100%',
        marginBottom:20,
        borderWidth:1,
        borderColor:lightTheme.colors.PrimaryBorderColor,
        borderRadius:5,
      
       
    },
    head:{
      height:74,
      width:'100%',
      backgroundColor:lightTheme.colors.PrimaryFade,
      padding:10,
      paddingHorizontal:20,
     borderTopEndRadius:5,
     borderTopLeftRadius:5
      
    },
    textHeader:{
      color:lightTheme.colors.PrimaryColor,
      fontWeight:'500'
    },
    textTitle:{
      color:lightTheme.colors.PrimaryGrey
    },
    teachersContainer:{
      backgroundColor:'#fff',
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
      borderBottomLeftRadius:5,
      borderBottomRightRadius:5
      
    },
    teacher:{
      flexDirection:'row',
      width:'45%',
      height:'100%',
      backgroundColor:'#fff',
      padding:20,
      alignItems:'center',
      borderBottomLeftRadius:5,
      borderBottomRightRadius:5
    },
    image:{
      height:25,
      width:25,
      borderRadius:25,
      marginRight:10
    }
})