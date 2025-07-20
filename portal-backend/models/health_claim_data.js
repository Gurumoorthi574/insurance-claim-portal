const mongoose = require('mongoose');

const healthClaimDataSchema = new mongoose.Schema({
  uhid: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  email: { type: String },
  phone: { type: String },
  coveredByOtherInsurance: { type: String },
  companyName: { type: String },
  sumInsured: { type: String },
  claimTitle: { type: String },
  claimantName: { type: String },
  gender: { type: String },
  dateOfBirth: { type: String },
  relationship: { type: String },
  occupation: { type: String },
  hospitalName: { type: String },
  hospitalizationDueTo: { type: String },
  dateOfIncident: { type: String },
  dateOfAdmission: { type: String },
  dateOfDischarge: { type: String },
  injuryCause: { type: String },
  reportedToPolice: { type: String },
  mlcFirAttached: { type: String },
  status: { type: String, required: true, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending', trim: true }
}, { timestamps: true });

module.exports = mongoose.model('HealthClaimData', healthClaimDataSchema);
