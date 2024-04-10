import  {auth, googleProvider} from './backend/firebase_config'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import { useState,useEffect } from 'react';
import { db , storage} from "./backend/firebase_config"
import { getDocs, collection, doc , addDoc , deleteDoc , updateDoc } from "firebase/firestore"
import { async } from '@firebase/util';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'

const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Insert doc
    const [newDetailName, setNewDetailName] = useState("")
    const [newDetailPlate, setNewDetailPlate] = useState("")
    const [newDetailManner, setNewDetailManner] = useState("")
    const [newDetailDate, setNewDetailDate] = useState(null)
    const [newDetailBrand, setNewDetailBrand] = useState("")

    //Update manner
    const [newManner, setNewManner] = useState("")

    //File upload
    const [fileUpload, setFileUpload] = useState(null)
    const [imgaeList, setImageList] = useState([])

    const detailCollectionRef = collection(db, "Details")

    const [detail,setDetail] = useState([]);

    const getDetail = async ()=>{
        //READ
        //SET DETAILS COLLECTION
        try {
            const data = await getDocs(detailCollectionRef);
            const filteredData = data.docs.map((doc)=>({
                ...doc.data(), 
                id: doc.id
            }));
            console.log(filteredData);
            setDetail(filteredData)
        }catch(err){
            console.error(err);
        }
    }

    const submitNewDetail= async ()=>{
        try{
            await addDoc(detailCollectionRef, {
                name: newDetailName,
                plate: newDetailPlate,
                brand : newDetailBrand,
                manner : newDetailManner,
                date : newDetailDate,
                userId : auth?.currentUser?.uid
            });
            // getDetail();
        }catch(err){
            console.error(err)
        }
    };

    const deleteDetail = async(id)=>{
        const detailDoc = doc(db, "Details" , id)
        await deleteDoc(detailDoc);
        // getDetail()
    };

    const updateDetailManner = async(id)=>{
        const detailDoc = doc(db, "Details" , id)
        await updateDoc(detailDoc, {manner : newManner});
        // getDetail()
    };

    const imageListRef = ref(storage, "Car pictures")
    const uploadFile = async () =>{
        if (!fileUpload) return;
        const filename = fileUpload.name
        const location = "Car pictures/"+filename+v4()
        const filesFolderRef =  ref(storage, location);
        try{
        uploadBytes(filesFolderRef, fileUpload).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                setImageList((prev)=>[...prev,url])
            })
        })
        }catch(err){
            console.error(err)
        }
    }

    const getFile = async () =>{
        listAll(imageListRef).then((res)=> {
            res.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev, url]);
                });
            });
        });
    };

    console.log(auth?.currentUser?.photoURL)
    const signIn= async ()=>{
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.error(err)
        }
        
    };

    const signInWithGoogle= async ()=>{
        try{
            await signInWithPopup(auth, googleProvider);
        }catch(err){
            console.error(err)
        }
        
    };

    const logout= async ()=>{
        try{
            await signOut(auth);
        }catch(err){
            console.error(err)
        }
        
    };

    useEffect(()=>{
        getDetail();
        getFile();
    },[])

    return(
        <div>
            <input 
                placeholder="Email..," 
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                placeholder="Password..,"  
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={signIn}> Sign in</button>

            <button onClick={signInWithGoogle}> Sign in with Google </button>

            <button onClick={logout}> Logout </button>
            <div>   
                <input placeholder='input brand' onChange={(e)=>setNewDetailBrand(e.target.value)}/>
                <input placeholder='input plate' onChange={(e)=>setNewDetailPlate(e.target.value)}/>
                <input placeholder='input name' onChange={(e)=>setNewDetailName(e.target.value)}/>
                <input placeholder='input manner' onChange={(e)=>setNewDetailManner(e.target.value)}/>
                <input placeholder='input date' type='date' onChange={(e)=>setNewDetailDate(String(e.target.value))}/>
                <button onClick={submitNewDetail}>submit</button>
            </div>
            <div>
                {/* {getDetail()} */}
                {detail.map((detail)=>(
                    <div>
                        <h1 style={{color: 'purple'}}> ชื่อ : {detail.name}</h1>
                        <p> ยี่ห้อ : {detail.brand}</p>
                        <p> เลขทะเบียน : {detail.plate}</p>
                        <p> เข้าอู่วันที่ : {detail.date}</p>
                        <p> อาการเบื้องต้น : {detail.manner}</p>
                        <button onClick={()=>deleteDetail(detail.id)}>delete detail</button>
                        <input placeholder="What's new manner" onChange={(e)=>setNewManner(e.target.value)}></input>
                        <button onClick={()=>updateDetailManner(detail.id)}> Update Manner</button>
                    </div>
                ))}
                
            </div>
            <div>
                <input type='file' onChange={(e)=>setFileUpload(e.target.files[0])}/>
                <button onClick={uploadFile}>Uplode file</button>
            </div>
            {imgaeList.map((url)=>{
                return <img src={url} width="100px" height="100px"/>
            })}
        </div>
    )
}
export default Auth;