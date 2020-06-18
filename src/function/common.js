import {storage} from "../firebase/index";
import HTMLReactParser from "html-react-parser";

/**
 * When user select an image file from his local directory, upload it to Firebase Storage, get download URL,
 * and set the URL to the src property of img tag for displaying the thumbnail.
 * @param {string} id The identifier of input tag for uploading files
 */

export const attachFiles = (id, type) => {
    if (type === 'remove') {
        return document.getElementById(id).removeEventListener('change', () => null);
    } else if (type === 'add') {
        document.getElementById(id).addEventListener("change", (event)=> {
            const file = event.target.files;
            // @ts-ignore
            let blob = new Blob(file, { type: "image/jpeg" });

            // Generate random 16 digits strings
            const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const N=16;
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

            const uploadRef = storage.ref('images').child(fileName);
            const uploadTask = uploadRef.put(blob);
            uploadTask.on('state_changed', (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, (error) => {
                // Handle unsuccessful uploads
                console.error("Failed to upload file. ERROR: ", error);
            }, () => {
                // Handle successful uploads on complete
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    document.getElementById(`${id}-thumb`).setAttribute('src', downloadURL);
                });
            });
        });
    }

};


/**
 * Convert Carriage Return and Line Feed into <br> tag.
 * @param {string} text The row text
 * @returns {void | string | never} The formatted text
 */
export const returnCodeToBr = (text) => {
    if (text === "") {
        return text
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
    }
};


/**
 * Convert datetime into the String.
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const dateToString = (dt) => {
    return dt.getFullYear() + '-'
        + ('00' + (dt.getMonth()+1)).slice(-2) + '-'
        + ('00' + dt.getDate()).slice(-2)
};


/**
 * Convert datetime into the String.
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const datetimeToString = (dt) => {
    return dt.getFullYear() + '-'
        + ('00' + (dt.getMonth()+1)).slice(-2) + '-'
        + ('00' + dt.getDate()).slice(-2) + ' '
        + ('00' + dt.getHours()).slice(-2) + ':'
        + ('00' + dt.getMinutes()).slice(-2) + ':'
        + ('00' + dt.getSeconds()).slice(-2)
};


/**
 * Validate input email
 * @param email
 * @returns {boolean}
 */
export const isValidEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
}


/**
 * Show an alert if required input is blank
 * @param args Required input values
 * @returns {boolean}
 */
export const isValidRequiredInput = (...args) => {
    let validator = true;
    for (let i=0; i < args.length; i=(i+1)|0) {
        if (args[i] === "") {
            validator = false;
        }
    }
    return validator
};
