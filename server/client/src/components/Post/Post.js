import {React,useState,useEffect,createContext,useRef} from 'react'
import "./Post.css";
import Input from "../Input";
import Button from "../Button/Button"
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios';
import { BrowserRouter, Redirect, Route,useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CircularProgress from '@material-ui/core/CircularProgress';

 

function Post(props) {
  const filePicker = useRef();
  const pic  = useRef();
  const closeClick  = useRef();
  const [file,setFile] = useState();
  const [previewUrl,setpreviewUrl] = useState();
  const [isValid,setIsValid] = useState(false);
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [isModal,setIsModal] = useState(true);
  const [image,setImage] = useState(false);
  const [randomKey,setRandomKey] = useState();
  const [isProgress,setIsProgress] = useState(false);

  const customStyle ={
    backgroundColor: "rgb(238, 232, 232)"
  }


  function onTitleChangeHandler(e){
    const Title = e.target.value;
    console.log(Title);
    setTitle(Title);
  }

  function onDescriptionChangeHandler(e){
    const Description = e.target.value;
    console.log(Description);
    setDescription(Description);
  }

  async function submitHandler(event){
    event.preventDefault();
    setIsProgress(true);
    setTitle('');
    setDescription('');
    closeClick.current.click();
    let randomString = Math.random().toString(36);
    setRandomKey(randomString)          // to reset the input file type by defining new key as it forces react to render it again
    const timestamp = new Date().toISOString();     //to get timestamp
    try {
      const formData = new FormData();   //image are multipart/form-data
      formData.append('Title',Title);
      formData.append('Description',Description);
      formData.append('image',filePicker.current.files[0]);
      formData.append('timestamp',timestamp);
      const x = await axios.post(`/create-post`,formData).then((res)=> {
        if(res.data.uploaded){
          setIsProgress(false)
          // closeClick.current.click();
          setIsModal(false);
          props.post();
        }
      });
      }
      catch(e){
        console.log(e);
      }
    }

 function modalStateHandler(){     //when close button is clicked send the response to parent component
   setIsModal(false)
   props.onChange();
 }

 if(Title != "" && Description!=""){
   customStyle.backgroundColor ="rgb(14, 97, 221)";
 }

 function ImageHandler(){
   filePicker.current.click()    //click the input tye=file while it is hidden
 }

 function ImageUploadHandler(event){
  console.log(filePicker.current.files[0])
  if(event.target.files && event.target.files.length ==1){
    const pickedFile = event.target.files[0];
    setFile(pickedFile);     // sets state variable file = pickedFile which is the selected file by user 
    setIsValid(true);         
    setImage(true)
    

  }else{
    setIsValid(false)
  }
 }

 useEffect(()=>{                          //this functions after the value of state variable file is changed
  if(!file){
    return;
  }
  const fileReader = new FileReader();
  fileReader.onload = ()=>{
    setpreviewUrl(fileReader.result);     // sets previewUrl state variable's value from the user's selected file
  };
  fileReader.readAsDataURL(file);         //reads the total information of he file
 },[file])

 function clickHandler(){                         //when user submits the form resets the image url
  pic.current.src = " ";              
  setImage(false);
 }
    return (
      
      <div className="create_post_modal"  style={{display : props.display}}  >
      <form onSubmit={submitHandler}  >
        <div className="post_main">
        <div className="create_post_main" >
        <div className="create_post">
        Create Post
        </div>
            <div className="close_button">
              <IconButton ref={closeClick} onClick={modalStateHandler} style={{width:"30px",height:"30px"}} >
                <CloseIcon style={{color:"white"}}/>
              </IconButton>
            </div>
        </div>
        <div className="modal_header">
            <div className="user_profile">
                <div className="user_profile_image">
                  <Avatar />
                </div>
                <div  className="user_profile_name">
                  <p>{props.userDetail ? props.userDetail.data.username : null}</p>
                </div>
                
            </div>
            <div>

            </div>
            </div>
            <div className="post_title_main">
                <Input type="text" placeholder="Enter Title..." className="post_title" value={Title} onChange={onTitleChangeHandler} />
            </div>
            <div className="description">
                <textarea placeholder="What's on your mind ?" value={Description} onChange={onDescriptionChangeHandler}>
                
                </textarea>
                <div className="div_uploaded_image">
                  <img src={previewUrl}  style={{display: image ? "block" : "none"}} ref={pic} className="uploaded_image" ></img>
                </div>
                <div className="image_upload">
                  <p>Add to your post</p>
                  <input type="file" accept=".jpeg,.jpg,.png" key={randomKey || ''} style={{display:"none"}} ref={filePicker} onChange={ImageUploadHandler} name="image"  />
                 <IconButton className="image_button">
                 <PhotoLibraryIcon style={{color:"#006400"}} onClick={ImageHandler}>
                 </PhotoLibraryIcon>
                  </IconButton>
                </div>

            </div>
            <div>
                <button type="submit"  className="post_button" onClick={clickHandler} style={customStyle} disabled = {Description ? null : "disabled"}>{isProgress ? <CircularProgress size={20} thickness={4} color="secondary" /> : "Post"}</button>
                
            </div>
        </div>
        </form>
      </div>

    )
}

export default Post;

