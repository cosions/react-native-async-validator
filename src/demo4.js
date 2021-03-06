import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Picker
} from 'react-native';
import Form from "./index"
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        canPush:false,
        dynamicValidateForm:{
            form:[
                {
                    value:'',
                    key:"0"
                }
            ]
        },
        showPhone:true,
        showName:true
    };
  }
  componentDidMount() {}
  render() {
        let {dynamicValidateForm} =this.state;
        return (
          <View style={{marginHorizontal:10}}>
               <View style={{paddingVertical:10,marginBottom:10,borderBottomColor:"#ccc",borderBottomWidth:1}}>
                  <Text>Dynamic form fields (Array)</Text>
               </View>
                <Form.elForm 
                   model={dynamicValidateForm}
                   labelWidth={80}
                   canPushChange={pass => this.setState({ canpush: pass })}
                   ref="dynamicValidateForm">

                    {
                        this.state.dynamicValidateForm.form.map((item,index)=>{
                            return (
                                <Form.elFormItem 
                                key={item.key}
                                label={`name:${index}`}
                                 prop={`form.${index}.value`}
                                 rules={[
                                    { required: true, message: `input name ${index}` }
                                  ]}
                                >
                                     <View style={{flexDirection:"row",alignItems:"center"}}>
                                        <TextInput
                                            style={{marginRight:5, height: 40,width:150, borderColor: 'gray', borderWidth: 1 }}
                                            value={dynamicValidateForm.form[index].value}
                                            placeholder={`input name ${index}`}
                                            onChangeText={text => this.changeText(index,text)}
                                        />
                                        <Text onPress={(()=>this.deleteFun(item.key))}>DELETE {`form.${index}.value`}</Text>
                                     </View>
                                </Form.elFormItem>
                            )
                        })
                    }   
                    <View>
                    <TouchableOpacity onPress={((()=>this.addNew()))}>
                              <View style={styles.normalBtn}>
                                      <Text style={styles.normalBtnTxt}>+ add</Text>
                              </View>
                          </TouchableOpacity>
                    </View>
                    <View style={{marginTop:20}}>
                        {
                          this.state.canpush?(
                            <TouchableOpacity onPress={((()=>this.submit()))}>
                              <View style={styles.normalBtn}>
                                      <Text style={styles.normalBtnTxt}>submit</Text>
                              </View>
                          </TouchableOpacity>
                          ):(
                            <TouchableOpacity activeOpacity={1}>
                            <View style={{...styles.normalBtn,...styles.disabledBtn}}>
                                    <Text style={{...styles.normalBtnTxt,...styles.disabledBtnTxt}}>submit</Text>
                            </View>
                        </TouchableOpacity>
                          )
                        }
                    </View>
                </Form.elForm>
          </View>
        )
  }
  changeText(index,text){
    let item={...this.state.dynamicValidateForm.form[index]};
    item.value=text;
    let arr=[...this.state.dynamicValidateForm.form];
    arr[index]=item;
    //最后一步才修改，这样才能在form的componentDidUpdate拿到对比值
    //Only modify the last step, so that you can get the comparison value in the componentDidUpdate of the form
    this.setState({dynamicValidateForm:{form:arr}})
}
deleteFun(key){
    if(this.state.dynamicValidateForm.form.length==1){
        alert("Keep at least one")
        return;
    }
    let form =this.state.dynamicValidateForm.form.filter(item=>{
        return item.key!=key;
    })
    this.setState({dynamicValidateForm:{form:form}})
}
addNew(){
    let len=new Date().getTime();
    this.state.dynamicValidateForm.form.push({
        value:'',
        key:len
    })
    this.setState({dynamicValidateForm:{...this.state.dynamicValidateForm}})

}
  submit(){
    this.refs['dynamicValidateForm'].validate(res=>{
        if(!res){
          alert("success")
        }
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  normalBtn:{
      backgroundColor:"#409eff",
      justifyContent:"center",
      alignItems:"center",
      height:35,
      borderRadius:5
  },
  normalBtnTxt:{
      color:'#fff'
  },
  disabledBtn:{
    backgroundColor:"#dcdfe6"
  },
  disabledBtnTxt:{
    color:"#ccc"
  }
});
