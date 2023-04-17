import { v4 as uuidv4 } from 'uuid';

export const createUserId= () => {
   
    if (!localStorage.getItem("USER_ID")) {
        console.log("当前本地无uuid,已经重新生成")
        localStorage.setItem("USER_ID", uuidv4())
    }
    return localStorage.getItem("USER_ID");
}
