const mongoose  = require('mongoose');

// Sub-schema for individual expense items, part of Form 4
const expenseItemSchema = new mongoose.Schema({
  serviceType: { type: String, required: false },
  date: { type: String, required: false }, // Consider using Date type if date-specific queries are needed
  amount: { type: Number, required: false }
}, { _id: false }); // No separate _id for subdocuments unless necessary

const userformdetailSchema = new mongoose.Schema({
  // Form 1: Personal & Policy Details (Primary Insured)
  policyNumber: { type: String, required: false },    // From form.policyNumber
  firstName: { type: String, required: false },       // From form.firstname
  lastName: { type: String, required: false },        // From form.lastname
  dateOfBirth: { type: String, required: false },     // From form.dateOfBirth
  emailAddress: { type: String, required: false },    // Email of the user the claim is for (Assigned To). Was 'email'.
  phoneNumber: { type: String, required: false },     // From form.phoneNumber, was 'phone'
  address: { type: String, required: false },  
  relationshipToPatient: { type: String, required: false },       // Assuming from form.address (Form 1)

  // Form 2: Medical Provider Information
  providerName: { type: String, required: false },    // From form.providerName
  providerType: { type: String, required: false },    // From form.providerType
  providerId: { type: String, required: false },      // From form.providerId
  facilityName: { type: String, required: false },    // From form.facilityName (ensure 'facllityName' typo in ClaimSecondForm is corrected to 'facilityName' in form context)
  facilityAddress: { type: String, required: false }, // From form.facilityAddress
  dateOfService: { type: String, required: false },   // From form.dateOfService
  referralType: { type: String, required: false },    // From form.referralType

  // Form 3: Treatment Details
  dateOfIllness: { type: String, required: false }, // From form.dateOfIllness
  primaryDiagnosis: { type: String, required: false },     // From form.primaryDiagnosis
  diagnosisCode: { type: String, required: false },        // From form.diagnosisCode
  typeOfVisit: { type: String, required: false },          // From form.typeOfVisit
  symptomsDescription: { type: String, required: false },
  treatmentProvided: { type: String, required: false },
  workRelated: { type: String, required: false },
  autoAccidentRelated: { type: String, required: false },

  // Form 4: Medical Expenses
  expenseItems: [expenseItemSchema],                      // From form.expenseItems
  totalClaimAmount: { type: Number, required: false },    // From form.totalClaimAmount
  // uploadedDocumentPaths: [{ type: String, required: false }], // Optional: For storing paths of uploaded files if implemented

  // Additional details (can be from forms or pre-filled, retained/adapted from old schema)
  insurancePolicyType: { type: String, required: false }, // Was 'type'
  insuranceCompanyName: { type: String, required: false },// Was 'companyName'
  sumInsured: { type: String, required: false },          // Was 'amount', consider Number type

  // Claimant/Patient Details (if different from primary insured, or for patient-specific info)
  claimantFirstName: { type: String, required: false },   // Was 'insuredFirstName'
  claimantLastName: { type: String, required: false },    // Was 'insuredLastName'
  claimantGender: { type: String, required: false },      // Was 'gender'
  claimantDateOfBirth: { type: String, required: false }, // Was 'dob'
  claimantRelationshipToPolicyholder: { type: String, required: false }, // Was 'relationship'
  claimantOccupation: { type: String, required: false },  // Was 'occupation'

  // Specific Hospitalization Details (if collected beyond basic facility info)
  roomCategory: { type: String, required: false },
  hospitalizationDueTo: { type: String, required: false },
  dateOfIncident: { type: String, required: false },
  dateOfAdmission: { type: String, required: false },
  dateOfDischarge: { type: String, required: false },
  injuryCause: { type: String, required: false },
  reportedToPolice: { type: String, enum: ['Yes', 'No', 'N/A'], required: false },
  mlcFirAttached: { type: String, enum: ['Yes', 'No', 'N/A'], required: false },

  // Claim Meta-Information
  claimTitle: { type: String, required: false },        // Was 'title'
  claimDescription: { type: String, required: false },  // Was 'description'
  // 'createdAt' from timestamps can serve as claim submission date (was 'date')
  createdBy: { type: String, required: false }, // Email of the user who created the claim (can be admin)
  assignedTo: { type: String, required: false }, // Email of the user the claim is assigned to (was 'emailAddress')
  createdAt: { type: Date, default: Date.now }, // Automatically set to current date/time
  updatedAt: { type: Date, default: Date.now }, // Automatically set to current date/time on update
  remark: { type: String, required: false },

  // Status of the claim
  status: { type: String, required: true, enum: ['Pending', 'Referred', 'Approved', 'Rejected', 'Information Requested'], default: 'Pending', trim: true }
}, { timestamps: true });

module.exports = mongoose.models.UserFormDetails || mongoose.model('UserFormDetails', userformdetailSchema);