import { component$, useSignal, $, useStore, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import { sha256 } from 'js-sha256';
import ControlPanel from './control-panel';

export default component$(() => {
    return <></>
    // const users = useGetUsers();
    // const login = useSignal("");
    // const pass = useSignal("");
    // const authUser = useStore({
    //     success: false, 
    //     username: "", 
    //     role: "user"
    // });
    
    // const editorData = {
    //     canons: useGetCanons()
    // }

    // const attemptAuth$ = $(async () => {
    //     const user = users.value.find((el) => el.login == login.value);
    //     console.log("attempt auth")
    //     if (user != null) {
    //         if (sha256(pass.value) == user.password) {
    //             console.log("login successfull")
    //             authUser.success = true;
    //             authUser.username = user.login
    //             authUser.role = user.role
    //         }
    //         else {
    //             console.log("login unsuccessfull")
    //             authUser.success = false;
    //         }
    //     }
    //     else {
    //         console.log("no such user")
    //         authUser.success = false;
    //     }
    // })

    // return <>
    // { authUser.success == false &&
    //     <div class="auth-panel">
    //         <div class="auth-title">Забудь надежду всяк сюда входящий</div>
    //         <div class="auth-form">
    //             <div class="auth-field">
    //                 <span class="field-tooltip">Логин</span>
    //                 <input class="auth-input" type="text" id="login" name="login" 
    //                     onKeyDown$={(e) => { 
    //                         if (e.key === "Enter") attemptAuth$();
    //                     }}
    //                     onChange$={(e) => {
    //                         login.value = e.target.value;
    //                     }}
    //                 />
    //             </div>
    //             <div class="auth-field">
    //                 <span class="field-tooltip">Пароль</span>
    //                 <input class="auth-input" type="password" id="password" name="password" 
    //                     onKeyDown$={(e) => { 
    //                         if (e.key === "Enter") attemptAuth$();
    //                     }}
    //                     onChange$={(e) => {
    //                         pass.value = e.target.value;
    //                     }}
    //                 />
    //             </div>
    //         </div>
    //     </div>
    // }
    // { authUser.success == true &&
    //     <ControlPanel username={authUser.username} role={authUser.role} editorData={editorData}/>
    // }
    // </>
})