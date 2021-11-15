let calculateOutput = (switchData, telco, telcoId, opsType) => {
    let output = {
        operators_type: "",
        global_amount_cdf_credit: 0,
        global_amount_cdf_debit: 0,
        global_amount_usd_credit: 0,
        global_amount_usd_debit: 0,
        checked_transactions: 0,
        not_matched_transactions: [],
        not_founded_transactions: []
    }


    if(opsType === "1"){
        output.operators_type = "Check Switch to Telco"
    }
    else if(opsType === "2"){
        output.operators_type = "Check Telco to Switch"
    }


    if (telcoId === "1") {
        computeAirtel(output, switchData, telco, opsType)
    }
    else if (telcoId === "2") {
        computeVodacom(output, switchData, telco, opsType)
    }
    else if (telcoId === "3") {
        computeOrange(output, switchData, telco, opsType)
    }
    return output;
}

let computeAirtel = (output, switchData, telco, opsType) => {
    console.log(output, switchData, telco, opsType)
}

let computeVodacom = (output, switchData, telco, opsType) => {
    if (opsType === "1") {
        switchData.forEach(transactions => {
            let telco_transac = telco.find(el => el[0] === transactions[0])

            if (telco_transac !== undefined) {

                if (telco_transac[1] === transactions[1] && telco_transac[4] === transactions[4] &&
                    telco_transac[2] === transactions[2] && telco_transac[3] === transactions[3]) {
                    if (transactions[1] === "debit") {
                        if (transactions[4] === "CDF") {
                            output.global_amount_cdf_debit += parseFloat(transactions[2])
                            output.checked_transactions += 1
                        }
                        else if (transactions[4] === "USD") {
                            output.global_amount_usd_debit += parseFloat(transactions[2])
                            output.checked_transactions += 1
                        }
                    }
                    else if (transactions[1] === "credit") {
                        if (transactions[4] === "CDF") {
                            output.global_amount_cdf_credit += parseFloat(transactions[2])
                            output.checked_transactions += 1
                        }
                        else if (transactions[4] === "USD") {
                            output.global_amount_usd_credit += parseFloat(transactions[2])
                            output.checked_transactions += 1
                        }
                    }
                }
                else {
                    output.not_matched_transactions.push(" ")
                    output.not_matched_transactions.push(transactions)
                    output.not_matched_transactions.push(telco_transac)
                }
            }
            else {
                output.not_founded_transactions.push(" ")
                output.not_founded_transactions.push(transactions)
            }
        });
    }
    else if (opsType === "2") {
        telco.forEach(telco_transactions => {
            let transactions = switchData.find(el => el[0] === telco_transactions[0])


            if (transactions !== undefined) {
                if (telco_transactions[1] === transactions[1] && telco_transactions[4] === transactions[4] &&
                    telco_transactions[2] === transactions[2] && telco_transactions[3] === transactions[3]) {
                    if (telco_transactions[1] === "debit") {
                        if (telco_transactions[4] === "CDF") {
                            output.global_amount_cdf_debit += parseFloat(telco_transactions[2])
                            output.checked_transactions += 1
                        }
                        else if (telco_transactions[4] === "USD") {
                            output.global_amount_usd_debit += parseFloat(telco_transactions[2])
                            output.checked_transactions += 1
                        }
                    }
                    else if (telco_transactions[1] === "credit") {
                        if (telco_transactions[4] === "CDF") {
                            output.global_amount_cdf_credit += parseFloat(telco_transactions[2])
                            output.checked_transactions += 1
                        }
                        else if (telco_transactions[4] === "USD") {
                            output.global_amount_usd_credit += parseFloat(telco_transactions[2])
                            output.checked_transactions += 1
                        }
                    }
                }
                else {
                    output.not_matched_transactions.push(" ")
                    output.not_matched_transactions.push(telco_transactions)
                    output.not_matched_transactions.push(transactions)
                }
            }
            else {
                output.not_matched_transactions.push(" ")
                output.not_founded_transactions.push(telco_transactions)
            }
        });
    }
}

let computeOrange = (output, switchData, telco, opsType) => {
    if (opsType === "1") {
        switchData.forEach(transactions => {
            let telco_transac = telco.find(el => el[0] === transactions[0])

            if (telco_transac !== undefined) {

                if (telco_transac[1] === transactions[1] && telco_transac[4] === transactions[4] &&
                    telco_transac[2] === transactions[2] && telco_transac[3] === transactions[3]) {
                    if (transactions[1] === "debit") {
                        if (transactions[4] === "CDF") {
                            output.global_amount_cdf_debit += parseFloat(transactions[2])
                            output.checked_transactions += 1
                        }
                        else if (transactions[4] === "USD") {
                            output.global_amount_usd_debit += parseFloat(transactions[2])
                            output.checked_transactions += 1
                        }
                    }
                    else if (transactions[1] === "credit") {
                        if (transactions[4] === "CDF") {
                            output.global_amount_cdf_credit += parseFloat(transactions[2])
                            output.checked_transactions += 1
                        }
                        else if (transactions[4] === "USD") {
                            output.global_amount_usd_credit += parseFloat(transactions[2])
                            output.checked_transactions += 1
                        }
                    }
                }
                else {
                    output.not_matched_transactions.push(" ")
                    output.not_matched_transactions.push(transactions)
                    output.not_matched_transactions.push(telco_transac)
                }
            }
            else {
                output.not_founded_transactions(" ")
                output.not_founded_transactions(transactions)
            }
        });
    }
    else if (opsType === "2") {
        telco.forEach(telco_transactions => {
            let transactions = switchData.find(el => el[0] === telco_transactions[0])

            if (transactions !== undefined) {
                if (telco_transactions[1] === transactions[1] && telco_transactions[4] === transactions[4] &&
                    telco_transactions[2] === transactions[2] && telco_transactions[3] === transactions[3]) {
                    if (telco_transactions[1] === "debit") {
                        if (telco_transactions[4] === "CDF") {
                            output.global_amount_cdf_debit += parseFloat(telco_transactions[2])
                            output.checked_transactions += 1
                        }
                        else if (telco_transactions[4] === "USD") {
                            output.global_amount_usd_debit += parseFloat(telco_transactions[2])
                            output.checked_transactions += 1
                        }
                    }
                    else if (telco_transactions[1] === "credit") {
                        if (telco_transactions[4] === "CDF") {
                            output.global_amount_cdf_credit += parseFloat(telco_transactions[2])
                            output.checked_transactions += 1
                        }
                        else if (telco_transactions[4] === "USD") {
                            output.global_amount_usd_credit += parseFloat(telco_transactions[2])
                            output.checked_transactions += 1
                        }
                    }
                }
                else {
                    output.not_matched_transactions.push(" ")
                    output.not_matched_transactions.push(telco_transactions)
                    output.not_matched_transactions.push(transactions)
                }
            }
            else {
                output.not_founded_transactions(" ")
                output.not_founded_transactions(telco_transactions)
            }


        });
    }
}


export { calculateOutput };