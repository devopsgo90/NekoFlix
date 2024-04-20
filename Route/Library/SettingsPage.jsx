import { MainWrapper } from "../../Layout/MainWrapper";
import { PaddingConatiner } from "../../Layout/PaddingConatiner";
import { Heading } from "../../Components/Global/Heading";
import { Dropdown } from "react-native-element-dropdown";
import { PlainText } from "../../Components/Global/PlainText";
import { ToastAndroid, View } from "react-native";
import { Spacer } from "../../Components/Global/Spacer";
import { useCallback, useEffect, useState } from "react";
import {
  GetDefaultQuality,
  GetFontSizeValue, GetHomePage,
  GetLanguage, GetServer, GetSubDub, SetDefaultQuality,
  SetFontSizeValue, SetHomePage,
  SetLanguage,
  SetServer, SetSubDub,
} from "../../LocalStorage/AppSettings";

export const SettingsPage = () => {
  const [fontSize, setFontSize] = useState("Medium");
  const [language, setLanguage] = useState("English");
  const [server, setServer] = useState("Server 1");
  const [home, setHome] = useState('Anime');
  const [SubOrDub, setSubOrDub] = useState('Sub');
  const [PlayQuality, setPlayQuality] = useState('Auto');
  const FontSize = [
    { value: 'Small' },
    { value: 'Medium' },
    { value: 'Large' },
  ];
  const Language = [
    { value: 'English' },
    { value: 'Romaji' },
    { value: 'Native' },
  ];
  const Server = [
    { value: 'Server 1' },
    { value: 'Server 2' },
  ];
  const HomePage = [
    { value: 'Anime' },
    { value: 'Manga' },
  ];
  const SubDub = [
    { value: 'Sub' },
    { value: 'Dub' },
  ];
  const PlayQualities = [
    { value: 'Auto' },
    { value: '1080p' },
    { value: '720p' },
    { value: '480p' },
    { value: '360p' },
  ];
  const initialSetup = useCallback(async ()=>{
    const tempFontSize = await GetFontSizeValue()
    const tempLanguage = await GetLanguage()
    const tempServer = await GetServer()
    const tempHome = await GetHomePage()
    const tempSub = await GetSubDub()
    const tempQuality = await GetDefaultQuality()
    setFontSize(tempFontSize)
    setLanguage(tempLanguage)
    setServer(tempServer)
    setHome(tempHome)
    setSubOrDub(tempSub)
    setPlayQuality(tempQuality)
  },[])
  useEffect(()=>{
    initialSetup()
  },[])
  return (
    <MainWrapper>
      <PaddingConatiner>
        <Heading text={"Settings"}/>
        <Spacer/>
        <EachDropDownWithLabel text={"Homepage"} placeholder={home} data={HomePage} OnChange={({ value })=>{
          SetHomePage(value)
          ToastAndroid.showWithGravity(
            `Home changed to ${value}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }}/>
        <EachDropDownWithLabel text={"Default Playback Quality"} placeholder={PlayQuality} data={PlayQualities} OnChange={({ value })=>{
          SetDefaultQuality(value)
          ToastAndroid.showWithGravity(
            `Default playback changed to ${value}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }}/>
        <EachDropDownWithLabel text={"Sub or Dub"} placeholder={SubOrDub} data={SubDub} OnChange={({ value })=>{
          SetSubDub(value)
          ToastAndroid.showWithGravity(
            `Default changed to ${value}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }}/>
        <EachDropDownWithLabel text={"Server"} placeholder={server} data={Server} OnChange={({ value })=>{
          SetServer(value)
          ToastAndroid.showWithGravity(
            `Server changed to ${value}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }}/>
        <EachDropDownWithLabel text={"Font Size"} placeholder={fontSize} data={FontSize} OnChange={async ({ value })=>{
          SetFontSizeValue(value)
          ToastAndroid.showWithGravity(
            `Font size changed to ${value}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }}/>
        <EachDropDownWithLabel text={"Anime Title"} placeholder={language} data={Language} OnChange={({ value })=>{
          SetLanguage(value)
          ToastAndroid.showWithGravity(
            `Language changed to ${value}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }}/>
        <PlainText text={"Note: Changes require app to restart"}/>
      </PaddingConatiner>
    </MainWrapper>
  );
};
function EachDropDownWithLabel({data, text, placeholder, OnChange}){
  return <View style={{
    backgroundColor:"rgb(32,32,35)",
    padding:20,
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:10,
  }}>
    <PlainText text={text}/>
    <Dropdown selectedTextStyle={{
      color:"white",
    }}  placeholder={placeholder} placeholderStyle={{
      color:"white",
    }} itemTextStyle={{
      color:"rgb(19,18,18)",
    }} containerStyle={{
      backgroundColor:"rgb(236,236,236)",
      borderRadius:5,
      borderWidth:0,
    }} style={{
      width:120,
    }} data={data} labelField="value" valueField="value" onChange={OnChange}/>
  </View>
}
