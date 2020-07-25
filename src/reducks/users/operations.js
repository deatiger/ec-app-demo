import {db, auth, FirebaseTimestamp} from '../../firebase/index';
import {
    signOutAction,
    signInAction,
    editProfileStateAction,
    fetchProductsInCartAction, fetchOrdersHistoryAction,
} from "./actions";
import {push, goBack} from 'connected-react-router'
import {isValidEmailFormat, isValidRequiredInput} from "../../function/common";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import {initProductsAction} from "../products/actions";

const usersRef = db.collection('users')

export const addProductToCart = (addedProduct) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const cartRef = usersRef.doc(uid).collection('cart').doc();
        addedProduct['cartId'] = cartRef.id;
        await cartRef.set(addedProduct);
        dispatch(push('/cart'))
    }
}

export const editUserProfile = (iconPath, introduction, uid, username) => {
    return async (dispatch) => {
        const updateValue = {
            icon_path: iconPath,
            username: username
        };
        usersRef.doc(uid).update(updateValue)
            .then(() => {
                alert('ユーザー情報を更新しました。');
                dispatch(editProfileStateAction(updateValue));
                dispatch(goBack())
            }).catch((error) => {
                console.error(error)
                alert('ユーザー情報の更新に失敗しました。')
            })
    }
};

export const fetchOrdersHistory = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const list = []

        usersRef.doc(uid).collection('orders')
            .orderBy('updated_at', "desc").get()
            .then(snapshots => {
                snapshots.forEach(snapshot => {
                    const data = snapshot.data();
                    list.push(data)
                });
                dispatch(fetchOrdersHistoryAction(list))
            })
    }
}

export const fetchProductsInCart = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                usersRef.doc(user.uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        if (!data) {
                            throw new Error('ユーザーデータが存在しません。')
                        }

                        // Update logged in user state
                        dispatch(signInAction({
                            customer_id: (data.customer_id) ? data.customer_id : "",
                            email: data.email,
                            isSignedIn: true,
                            payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                            role: data.role,
                            uid: user.uid,
                            username: data.username,
                        }))
                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
};

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validations
        if(!isValidRequiredInput(email, password, confirmPassword)) {
            alert('必須項目が未入力です。');
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
                dispatch(showLoadingAction("Sign up..."))
                const user = result.user;
                if (user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now();

                    const userInitialData = {
                        customer_id: "",
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        payment_method_id: "",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    };

                    usersRef.doc(uid).set(userInitialData).then(async () => {
                        // const sendThankYouMail = functions.httpsCallable('sendThankYouMail');
                        // await sendThankYouMail({
                        //     email: email,
                        //     userId: uid,
                        //     username: username,
                        // });
                        dispatch(push('/'))
                        dispatch(hideLoadingAction())
                    })
                }
            }).catch((error) => {
                dispatch(hideLoadingAction())
                alert('アカウント登録に失敗しました。もう1度お試しください。')
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
                    dispatch(push('/signin'))
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
        dispatch(showLoadingAction("Sign in..."));
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

                    dispatch(signInAction({
                        customer_id: (data.customer_id) ? data.customer_id : "",
                        email: data.email,
                        isSignedIn: true,
                        role: data.role,
                        payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                        uid: userId,
                        username: data.username,
                    }));

                    dispatch(hideLoadingAction());
                    dispatch(push('/'))
                })
            }).catch(() => {
                dispatch(hideLoadingAction());
            });
    }
};

export const signOut = () => {
    return async (dispatch, getState) => {
        dispatch(showLoadingAction("Sign out..."));
        const uid = getState().users.uid

        // Delete products from the user's cart
        await usersRef.doc(uid).collection('cart').get()
            .then(snapshots => {
                snapshots.forEach(snapshot => {
                    usersRef.doc(uid).collection('cart').doc(snapshot.id).delete()
                })
            });

        // Sign out with Firebase Authentication
        auth.signOut().then(() => {
            dispatch(signOutAction());
            dispatch(initProductsAction())
            dispatch(hideLoadingAction());
            dispatch(push('/signin'));
        }).catch(() => {
            dispatch(hideLoadingAction());
            throw new Error('ログアウトに失敗しました。')
        })
    }
};
