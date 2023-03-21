const express = require('express')
const multer = require('multer')
const FormData = require("form-data")
const fs = require('fs')
const app = express()
const port = 6000
const cors = require('cors');
const axios = require('axios');
const DLP = require('@google-cloud/dlp');
// const projectId = process.env.GOOGLE_APPLICATION_CREDENTIALS;
require('dotenv').config({path:'./config.env'})
// const { DlpServiceClient } = require('@google-cloud/dlp');


'use strict';

const projectId = "linkedinmentor-381109";

function main(projectId) {

  console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const dlp = new DLP.DlpServiceClient();
  const string = 'Robert Frost';

  async function quickStart() {
    const minLikelihood = 'LIKELIHOOD_UNSPECIFIED';
    const maxFindings = 0;
    const infoTypes = [{name: 'PERSON_NAME'}, {name: 'US_STATE'}];
    const includeQuote = true;
    const item = {value: string};
    const request = {
      parent: `projects/${projectId}/locations/global`,
      inspectConfig: {
        infoTypes: infoTypes,
        minLikelihood: minLikelihood,
        limits: {
          maxFindingsPerRequest: maxFindings,
        },
        includeQuote: includeQuote,
      },
      item: item,
    };

    const [response] = await dlp.inspectContent(request);
    // const findings = response.result.findings;
    // if (findings.length > 0) {
    //   console.log('Findings:');
    //   findings.forEach(finding => {
    //     if (includeQuote) {
    //       console.log(`\tQuote: ${finding.quote}`);
    //     }
    //     console.log(`\tInfo type: ${finding.infoType.name}`);
    //     console.log(`\tLikelihood: ${finding.likelihood}`);
    //   });
    // } else {
    //   console.log('No findings.');
    // }
  }
  quickStart();

}

main(...process.argv.slice(2));
process.on('unhandledRejection', err => {
  console.error(err.message,"THIS IS THE REASON");
  process.exitCode = 1;
});