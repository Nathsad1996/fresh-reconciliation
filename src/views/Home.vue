<template>
  <div class="row mx-auto mb-5">
    <div class="col">
      <select
        @change="update"
        v-model="telcoid"
        class="form-select"
      >
        <option value="0" selected>Choose a telco operator</option>
        <option value="1">Airtel</option>
        <option value="2">Vodacom</option>
        <option value="3">Orange</option>
      </select>
    </div>
  </div>
  <div class="row mx-auto mb-2">
    <div class="col">
      <div class="mb-3">
        <label for="formFile" class="form-label">Switch File</label>
        <input
          @change="upload('Switch', $event)"
          class="form-control"
          type="file"
          accept=".xlsx, .xls, application/msexcel"
        />
      </div>
    </div>
    <div class="col">
      <div class="mb-3">
        <label for="formFile" class="form-label">{{ telco_name }} File</label>
        <input
          @change="upload('Telco', $event)"
          class="form-control"
          type="file"
          accept=".xlsx, .xls, application/msexcel"
        />
      </div>
    </div>
  </div>
  <div class="row mx-auto mb-3">
    <div class="col-3">
      <div class="form-check">
        <input class="form-check-input" value="1" @change="updateRadio" type="radio" name="ops" />
        <label class="form-check-label">Check Switch to Telco</label>
      </div>
    </div>
    <div class="col-3">
      <div class="form-check">
        <input class="form-check-input" value="2" @change="updateRadio" type="radio" name="ops" />
        <label class="form-check-label">Check Telco to Switch</label>
      </div>
    </div>
  </div>
  <div class="row mx-auto" v-if="alert">
    <div class="col">
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        {{ message }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="close"
        ></button>
      </div>
    </div>
  </div>
  <div class="row mx-auto">
    <div class="d-grid gap-2">
      <button class="btn btn-primary" type="button" @click="produce">
        <div class="spinner-border spinner-border-sm" role="status" v-show="processing">
          <span class="visually-hidden">Loading...</span>
        </div>&nbsp; Produce Report
      </button>
      <button class="btn btn-success" type="button" @click="download">
        <svg-icon type="mdi" :path="mdiDownload"></svg-icon>&nbsp; Download Report
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDownload } from "@mdi/js";
import readXlsxFile from 'read-excel-file';
import { calculateOutput } from "../utils/utilities";

// alert message variable
let message = ref("");
let processing = ref(false);
let alert = ref(false);

// telco & switch variable
let ops_type = ref(0);
let telcoid = ref("0");
let telco_name = ref("");
let switch_file = [];
let telco_file = [];
let report_data = [];

// function to upload file
function upload(file, event) {
  let temp = event.target.files[0];
  readXlsxFile(temp).then((rows) => {
    if (file === 'Telco') {
      telco_file = rows;
    }
    else {
      switch_file = rows;
    }
  })
}

// function to get which operation to perform
function updateRadio(event) {
  ops_type.value = event.target.value;
}

// function to get which telco to perform reconciliation
function update() {
  if (telcoid.value === "1") {
    telco_name.value = "Airtel"
  }
  else if (telcoid.value === "2") {
    telco_name.value = "Vodacom"
  }
  else if (telcoid.value === "3") {
    telco_name.value = "Orange"
  }
  else {
    telco_name.value = "#TelcoOperator"
  }
}

// function to close alert message
function close() {
  alert.value = false;
  message.value = "Report produced succesfully, please download"
}

// function who compute reconciliation
function produce() {
  if (telco_file.length != 0 && switch_file.length != 0) {

    processing.value = true;
    alert.value = false;

    report_data = calculateOutput(switch_file, telco_file, telcoid.value, ops_type.value)

    alert.value = true;
    processing.value = false;
  }
  else {
    message.value = `Please select ${telco_name.value} file and switch file to process`
    alert.value = true;
  }
}

// export data to user in csv format
function download() {
  console.log(report_data);
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += [
    Object.keys(report_data).join(';'),
    Object.values(report_data).map(item => {
      if(Array.isArray(item)){
        let arrayString = "";
        item.forEach(transac => {
          arrayString += Object.values(transac).join(",");
        })
        return arrayString;
      }
      else{
        return item;
      }
    }).join(";")
  ].join("\n")
    .replace(/(^\[)|(\]$)/gm, "")

  const data = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", data);
  link.setAttribute("download", "reconciliation_output.csv");
  link.click();

}

// function that initialize values
onMounted(() => {
  message.value = "Report produced succesfully, Please download"
  telco_name.value = "<TelcoOperator>"
})

</script>
