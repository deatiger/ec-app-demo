import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SecondaryButton, TextDetail} from "../components/UIkit";
import {getUsername} from "../reducks/users/selectors";
import {push} from "connected-react-router";

const UserMyPage = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const username = getUsername(selector);

    const transition = useCallback((path) => {
        dispatch(push(path))
    }, []);

    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">マイページ</h2>
            <div className="module-spacer--medium" />
            <TextDetail label="ユーザー名" value={username} />
            <div className="module-spacer--small" />
            <div className="center">
                <SecondaryButton label={"カード情報の編集"} onClick={() => transition('/user/payment/edit')} />
                <SecondaryButton label={"注文履歴の確認"} onClick={() => transition('/order/history')}/>
            </div>
        </section>
    );
};

export default UserMyPage;