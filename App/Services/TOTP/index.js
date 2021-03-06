import CryptoJS from 'crypto-js'
import {TOTP_INTERVAL} from './config'

export default function TOTP(name, secret) {

    var dec2hex = function (s) {
        return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    };

    var hex2dec = function (s) {
        return parseInt(s, 16);
    };

    var leftpad = function (s, l, p) {
        if (l + 1 >= s.length) {
            s = Array(l + 1 - s.length).join(p) + s;
        }
        return s;
    };

    var base32tohex = function (base32) {
        var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var bits = "";
        var hex = "";
        for (var i = 0; i < base32.length; i++) {
            var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += leftpad(val.toString(2), 5, '0');
        }
        for (var i = 0; i + 4 <= bits.length; i += 4) {
            var chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16);
        }
        return hex;
    };

    this.getOTP = function () {
        //return Math.floor(Math.random() * 1000000);
        try {
            var epoch = Math.round(new Date().getTime() / 1000.0); // get number of seconds since jan 1 1970
            var timeCounter = leftpad(dec2hex(Math.floor(epoch / TOTP_INTERVAL)), 16, "0"); // TC - the counter
            var hash = CryptoJS.HmacSHA1(timeCounter, secret).toString(CryptoJS.enc.Hex);
            var offset = hex2dec(hash.substring(hash.length - 1));
            var otp = (hex2dec(hash.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
            otp = parseInt(otp.substr(otp.length - 6, 6), 10);
        } catch (error) {
            console.error(error);
            throw error;
        }
        for(var i=String(otp).length; String(otp).length < 6; i++){
            otp = String(otp) + '0';            
        }
        return parseInt(otp);
    };

    this.getOTPData= function () {
        return {
            name,
            secret,
            code: this.getOTP()
        };

    }


}
