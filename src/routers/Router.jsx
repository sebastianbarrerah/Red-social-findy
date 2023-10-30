import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialUser, userReducer } from "../service/admiReducer/admiReducer";
import { createContext } from "react";
import Form from '../components/form/Form'
import { getSession } from "../service/sessionService/sessionService";
import Profile from "../components/profile/Profile";
import FormNewPost from "../components/formNewPost/formNewPost";
import Details from "../components/details/details";
import Home2 from "../components/home2/Home2";
import EditProfile from "../components/editProfile/editProfile";

export const AppContext = createContext({});

const Router = () => {
    const [likes, setLikes] = useState(0)
    const [nameUser, setNameUser] = useState([]);
    const [imagenesPost, setImagenesPost] = useState([]);
    const [comentario, setComentario] = useState(0)
    const [tag, setTag] = useState(0);
    
  useEffect(() => {
    const user = getSession();
    if (user?.name) {
      userDispatch({
        type: "login",
        payload: {
          isAutenticated: true,
          user: user,
        },
      });
    }
  }, []);

    const [userLogin, userDispatch] = useReducer(userReducer, initialUser);
    const globalState = {
        user: {
        userLogin,
        userDispatch,
        },
        likes, 
        setLikes, 
        imagenesPost, 
        setImagenesPost, 
        comentario, 
        setComentario,
        tag,
        setTag
    };

  
  return (
    <AppContext.Provider value={globalState}>
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Form/>}/>
                    <Route path='/home' element={<Home2/>}/>
                    <Route path='/formNewPost' element={<FormNewPost/>}/>
                    <Route path='/profile/:name' element={<Profile/>}/>
                    <Route path='/details/:id' element={<Details/>}/>
                    <Route path='/editProfile' element={<EditProfile/>}/>
                </Routes>
        </BrowserRouter>
   </AppContext.Provider>
  )
}

export default Router



// https://thumbs.gfycat.com/IdealIdioticBichonfrise-max-1mb.gif
// https://i.pinimg.com/originals/d8/d3/fc/d8d3fc91b090d236fd09256113106922.gif
// https://i.gifer.com/origin/50/50e90604e49048bb16e4dbf51f6f1907_w200.gif
// https://i.gifer.com/origin/f6/f698f081023c13d7af12cc646b538f66_w200.gif


// https://i.pinimg.com/originals/9d/03/86/9d0386887c156e9a3310bd108a2be2a2.gif
// https://img1.picmix.com/output/pic/normal/0/6/6/5/10195660_6c4a4.gif
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT89auQRgLEdneESNoonaeE3TEKGR2EkECurd7U-KsPDLvRKRE6pAVqK9w3x-UWBZeTfn4&usqp=CAU
// https://dimayor.com.co/wp-content/uploads/2017/06/felicitacion_nacional-1.gif


// https://media.tenor.com/Y4-XWXWEDtwAAAAC/ronaldo-player-soccer.gif
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWnUJtacshs50z09Y7L-J1l1JugOwDTyj8ffxSOlkvtDiAOU33cOH1smfHeHGkzP_BsrQ&usqp=CAU
// https://thumbs.gfycat.com/CarefreeRashBullfrog-max-1mb.gif
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3yQ_cVj8ruy7FZmFI062IeYwbNBmJddB3uwio8i7Hro75V1H_4wRL1fJmxc7QLMQZfGs&usqp=CAU



// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7HpQzL-Wn-T4vD-dab0qXtyR8wSj5mRaUbETLVcSZ9cqE79bg-Ceet79PrvmzRj8Vtns&usqp=CAU
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWlGWdF8J-6zQJ5tHHEyQpF5BdPX-B6jJrD5q5B6yahicMl5B-wnYBiEf-n1iq1h0WWUw&usqp=CAU
// https://media.tenor.com/ziVXA8WqE5YAAAAC/that70s-show-mila-kunis.gif
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCrwHuPMWR0fyCZOdn4UaBKq_8gEVXbZzZQYvQk-r_n7AzQOB7Iu4CIAcr8xrp0RKyOwo&usqp=CAU



// https://i.pinimg.com/originals/67/35/5a/67355ad97e1ad1571e0d31bfc513ad5b.gif
// https://media.tenor.com/8KvIyFr6KG0AAAAd/frida-kahlo.gif
// https://cdn.shopify.com/s/files/1/0745/1177/files/giphy_frida_2_grande.gif?v=1475352106
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zzj1QyeoXTbA9PampHrCX4_yFuRc7zyTRokx0oTGPKPDf-nmrlKkDB_auSYg6ZgNBbU&usqp=CAU