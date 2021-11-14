let processExcel = (exceldata) => {
    // process excel data and return a js array
    console.log(exceldata);
}


let processCsv = (csvData) => {
    // process csv data and return a js array
    console.log(csvData);
}


let calculateOutput = (outputformat, operationType) => {
    /**
     * operationType should be (paydrc_to_telco or telco_to_paydrc)
     * if output == "excel" then return and excel file
     * else if output == "csv" then return csv file
     * this returned file should be automatically download by the user
     */
    console.log(outputformat, operationType);
}

export { processCsv, calculateOutput, processExcel};