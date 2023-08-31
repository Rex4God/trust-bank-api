"use strict";

exports.generateAccountNumber = async (prefix) => {
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000);
    return `${prefix}${randomDigits}`;
}


