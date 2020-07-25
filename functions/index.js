const functions = require('firebase-functions');
const sendgrid = require('@sendgrid/mail');
const cors = require('cors');
const stripe = require('stripe')(functions.config().stripe.token);

/**
 * Configure environment variable with the following command
 * firebase functions:config:set sendgrid.key="YOUR_API_KEY"
 */
const SENDGRID_API_KEY = functions.config().sendgrid.key;

// Send response when calling APIs
const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(body)
    });
};


exports.retrievePaymentMethod = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true});

    corsHandler(req, res, () => {
        if (req.method !== 'POST') {
            sendResponse(res, 405, {error: "Invalid Request"})
        }

        return stripe.paymentMethods.retrieve(
            req.body.paymentMethodId
        ).then((customer) => {
            sendResponse(res, 200, customer);
        }).catch((error) => {
            console.error(error);
            sendResponse(res, 500, {error: error})
        })

    })
})

/**
 * Create the Stripe Payment Intent when
 * return {object} paymentIntent The data of payment which has Stripe Payment ID
 */
exports.stripeCustomer = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true});

    corsHandler(req, res, () => {
        if (req.method === 'POST') {
            return stripe.customers.create({
                description: 'Toraseminar customer',
                email: req.body.email,
                metadata: {userId: req.body.userId},
                payment_method: req.body.paymentMethod,
            }).then((customer) => {
                sendResponse(res, 200, customer);
            }).catch((error) => {
                console.error(error);
                sendResponse(res, 500, {error: error})
            })
        } else if (req.method === 'DELETE') {
            return stripe.customers.del(
                req.body.customerId
            ).then((customer) => {
                sendResponse(res, 200, customer);
            }).catch((error) => {
                console.error(error);
                sendResponse(res, 500, {error: error})
            })
        } else {
            sendResponse(res, 405, {error: "Invalid Request"})
        }


    })
})

exports.sendThankYouMail = functions.https.onCall(async (data, context)=> {
    const body = `<p>${data.username}様</p>
                  <p>Torashopの会員登録が完了しました。</p>
                  <p>ログインしてコンテンツをお楽しみください。</p>
                  <div>
                    <a 
                      href="https://ec-app-12ba0.web.app/signin" role="button" target="_blank"
                      style="background: #4dd0e1; border-radius: 4px; color: #000; cursor: pointer; font-weight: 600; 
                             height: 48px; line-height: 48px; margin: 0 auto; padding: 8px 16px;
                             text-align: center; text-decoration: none; width: 320px;"
                    >
                      ログインして使い始める
                    </a>
                  </div>
                  <p>
                    ■ご注意<br>
                    このメールは、Torashopにご登録いただいた方に自動送信しています。<br>
                    本メールにお心当りがない場合は、誠に恐れ入りますが弊社サポートまでお問い合せくださいますようお願いいたします。
                  </p>
                  <p>
                    トラハック<br>
                    Email: torahack1492@gmail.com<br>
                    HP: https://torahack.web.app
                  </p>`;

    sendgrid.setApiKey(SENDGRID_API_KEY);
    const message = {
        to: data.email,
        from: "torahack1492@gmail.com",
        subject: "【Torashop】会員登録完了のお知らせ",
        html: body
    };
    await sendgrid.send(message);
    return null
});

exports.updatePaymentMethod = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true});

    corsHandler(req, res, () => {
        if (req.method !== 'POST') {
            sendResponse(res, 405, {error: "Invalid Request"})
        }

        return stripe.paymentMethods.detach(
            req.body.prevPaymentMethodId
        ).then((prevPaymentMethod) => {
            return stripe.paymentMethods.attach(
                req.body.nextPaymentMethodId,
                {customer: req.body.customerId,}
            ).then((nextPaymentMethod) => {
                sendResponse(res, 200, nextPaymentMethod);
            })

        }).catch((error) => {
            console.error(error);
            sendResponse(res, 500, {error: error})
        })

    })
})