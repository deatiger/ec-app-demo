import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {signIn} from "../reducks/users/operations";
import {push} from "connected-react-router"

const SignIn = () => {
    const dispatch = useDispatch();


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[]);

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">ログイン</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton label={"ログイン"} onClick={() => dispatch(signIn(email, password))} />
                <div className="module-spacer--small" />
                <p className="u-text-small" onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
                <p className="u-text-small" onClick={() => dispatch(push('/signup'))}>アカウント登録がまだですか？</p>
            </div>
        </div>
    );
};

export default SignIn;