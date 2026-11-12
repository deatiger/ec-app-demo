> [!NOTE]
> **デモサイトおよび Firebase プロジェクトの公開終了について**
> このリポジトリで使用していた Firebase プロジェクトとデモサイトは、セキュリティ上の理由により 2026年11月に削除しました。
> ソースコードは引き続き参照できます。動かす場合はご自身で Firebase プロジェクトを作成し、設定値を置き換えてください。
>
> The demo site and the Firebase project used by this repository were shut down in November 2026 for security reasons.
> The source code remains available. To run it, create your own Firebase project and replace the configuration values.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# License
The source code is licensed MIT. The website content is licensed CC BY 4.0,see LICENSE.

## 02. Create development environment  

### Execute CRA(create-react-app)  
`npx create-react-app ec-app`  

### Configure Firebase Project

SignIn to your google account  
`fireabase login`  

Init your local environment to connect Firebase project  
`firebase init`  

### Install npm packages
Install react, redux, firebase, material-ui packages  
`npm install --save @material-ui/core @material-ui/icons @material-ui/styles connected-react-router firebase history react-redux react-router redux redux-actions redux-logger redux-thunk reselect`  

