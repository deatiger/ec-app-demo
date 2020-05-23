import {db, auth, functions, FirebaseTimestamp} from 'src/firebase/index';
import {
    signOutAction,
    fetchUserStateAction,
    editProfileStateAction,
} from "./actions";
import {push, goBack} from 'connected-react-router'
import {isValidEmailFormat, isValidRequiredInput} from "src/function/common";
import {hideLoadingAction, showLoadingAction} from "src/reducks/loading/actions";

const usersRef = db.collection('users')

export const editUserProfile = (iconPath, introduction, uid, username) => {
    return async (dispatch) => {
        const updateValue = {
            icon_path: iconPath,
            username: username
        };
        return usersRef.doc(uid).update(updateValue).then(() => {
            alert('ユーザー情報を更新しました。');
            dispatch(editProfileStateAction(updateValue));
            dispatch(goBack())
        }).catch((error) => {
            console.error(error)
            alert('ユーザー情報の更新に失敗しました。')
        })
    }
};


export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                usersRef.doc(user.uid).onSnapshot(snapshot => {
                    const data = snapshot.data()
                    if (!data) {
                        throw new Error('ユーザーデータが存在しません。')
                    }

                    // Update logged in user state
                    dispatch(fetchUserStateAction({
                        icon_path: data.icon_path,
                        isLoggedIn: true,
                        uid: user.uid,
                        username: data.username,
                    }))
                })
            } else {
                dispatch(push('/login'))
            }
        })
    }
};

export const registerNewUser = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validations
        if(!isValidRequiredInput(email, password, confirmPassword)) {
            alert('必須項目が未入力です。')
            return false
        }
        if(!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。もう1度お試しください。')
            return false
        }
        if (password !== confirmPassword) {
            alert('パスワードが一致しません。もう1度お試しください。')
            return false
        }
        if (password.length < 6) {
            alert('パスワードは6文字以上で入力してください。')
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user
                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now();

                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        icon_path: "",
                        username: username,
                        updated_at: timestamp,
                    };

                    return usersRef.doc().set(userInitialData).then(async () => {
                        const sendThankYouMail = functions.httpsCallable('sendThankYouMail');
                        await sendThankYouMail({
                            email: email,
                            userId: user.uid,
                            username: username,
                        });
                        dispatch(push('/thankyou'))
                    })
                } else {
                    return alert('登録に失敗しました。もう1度お試しください。')
                }
            }).catch((error) => {
                alert('登録に失敗しました。もう1度お試しください。')
                throw new Error(error)
            })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。')
            return false
        } else {
            return auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレス宛にパスワードリセットのメールをお送りしましたのでご確認ください。')
                    dispatch(push('/login'))
                }).catch(() => {
                    alert('登録されていないメールアドレスです。もう一度ご確認ください。')
                })
        }
    }
}

export const saveAddress = (address) => {
    return async (dispatch, getState) => {
        const state = getState()
        const userId = state.users.uid
        return usersRef.doc(userId).collection('addresses').doc(userId).set(address)
            .then(() => {
                alert('入力いただいた情報を保存しました。')
                dispatch(push('/bank'))
            }).catch(error => {
                alert('情報の保存に失敗しました。通信環境を確認してもう1度お試しください。')
                throw new Error(error)
            })
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        dispatch(showLoadingAction("Login..."));
        if (!isValidRequiredInput(email, password)) {
            dispatch(hideLoadingAction());
            alert('メールアドレスかパスワードが未入力です。')
            return false
        }
        if (!isValidEmailFormat(email)) {
            dispatch(hideLoadingAction());
            alert('メールアドレスの形式が不正です。')
            return false
        }
        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const userState = result.user
                if (!userState) {
                    dispatch(hideLoadingAction());
                    throw new Error('ユーザーIDを取得できません');
                }
                const userId = userState.uid;

                return usersRef.doc(userId).get().then(snapshot => {
                    const data = snapshot.data();
                    if (!data) {
                        dispatch(hideLoadingAction());
                        throw new Error('ユーザーデータが存在しません');
                    }

                    dispatch(fetchUserStateAction({
                        icon_path: data.icon_path,
                        isLoggedIn: true,
                        uid: userId,
                        username: data.username,
                    }))

                    dispatch(hideLoadingAction());
                    dispatch(push('/'))
                })
            }).catch(() => {
                dispatch(hideLoadingAction());
            });
    }
};

export const signOut = () => {
    return async (dispatch) => {
        dispatch(showLoadingAction("Logout..."));
        auth.signOut().then(() => {
            dispatch(signOutAction())
            dispatch(hideLoadingAction());
            dispatch(push('/login'))
        }).catch(() => {
            dispatch(hideLoadingAction());
            throw new Error('ログアウトに失敗しました。')
        })
    }
};
