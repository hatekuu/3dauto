import { useEffect,useState } from 'react';
import * as Realm from 'realm-web';
import Upload from './components/upload';
import FileList from './components/fileList';
const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });
const Home = () => {
  const [data,setData]=useState('')
  const [fileData,setFileData]=useState(null)
  useEffect(() => {
    if(data!==''){
    Uploadfile()
      
  }
    fetchData();
  }, [data]);
  
const fetchData  = async ()=>{
  const functionName2 = "userfile";

  try {
    await app?.currentUser?.refreshAccessToken();
   
    console.log('đã refresh')
  } catch (error) {
    console.log(error)
  }

   const user=app.currentUser
    if (!user||user.accessToken==="")
    {
       window.location.href ="/3dauto/login"
    }else{
      
      try {
        const result2= await app.currentUser.callFunction(functionName2);
        setFileData(result2[0])
    
        console.log(result2[0])
      } catch (error) {
        console.log(error.error)
      }
    }
}
const Uploadfile = async()=>{
  const functionName = "uploadfile";

  try {
    await app.currentUser.callFunction(functionName, data);
   
    
     window.location.reload()
  } catch (error) {
    console.log(error.error)
  }
 
  
}
const Logout = async ()=>{
  await app.currentUser.logOut();
  window.location.reload()
}
  return (
    <div>
          <Upload setData={setData} id={app.currentUser?.id}/>
          <FileList fileData={fileData}/>
          <button onClick={Logout}>logout</button>
    </div>
  );
};

export default Home;
