<template>
  <div class="row mx-auto mb-5">
    <div class="col">
      <select
        @change="update"
        v-model="telcoid"
        class="form-select"
        aria-label="Default select example"
      >
        <option selected>Choose a telco operator</option>
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
          id="paydrc"
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
          id="telco"
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
  <div class="row mx-auto">
    <div class="col">
      <div class="alert alert-success" role="alert">Report produced succesfully, please download</div>
    </div>
  </div>
  <div class="row mx-auto">
    <div class="d-grid gap-2">
      <button class="btn btn-primary" type="button" @click="produce">
        <div class="spinner-border spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>&nbsp; Produce Report
      </button>
      <button class="btn btn-success" type="button" @click="download">
        <svg-icon type="mdi" :path="mdiDownload"></svg-icon>Download Report
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDownload } from "@mdi/js";
import readXlsxFile from 'read-excel-file';
import { calculateOutput } from "../utils/utilities";

let ops_type = ref(0);
let telcoid = ref(0);
let telco_name = ref("#TelcoOperator");
let switch_file = [];
let telco_file = [];
let report_data = [];

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

function updateRadio(event) {
  ops_type.value = event.target.value;
}

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

function produce() {
  report_data = calculateOutput(switch_file, telco_file, telcoid.value, ops_type.value)
}

function download() {
  console.log(report_data);
}


</script>
