import { useState, type ChangeEvent, type FormEvent } from "react";
import { Icons } from "../../components";

// --- TYPES ---
interface StaffMember {
  id: string;
  name: string;
  role: string;
  post: string;
  grade: string;
  salary: string;
  email: string;
  phone: string;
  bloodGroup: string;
  status: string;
  offerStatus: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  bloodGroup: string;
  aadhaarNo: string;
  address: string;
  familyGuardian: string;
  qualification: string;
  qualificationDoc: string;
  role: string;
  post: string;
  grade: string;
  salary: string;
  joiningDate: string;
}

// --- INITIAL STAFF ROSTER ---
const INITIAL_STAFF_ROSTER: StaffMember[] = [
  {
    id: "STF-8801",
    name: "Dr. Rebecca Vance",
    role: "Teacher",
    post: "Senior Physics Faculty",
    grade: "Grade A",
    salary: "$78,000 / yr",
    email: "r.vance@scholix.edu",
    phone: "+1 (555) 234-9988",
    bloodGroup: "O+",
    status: "Active Deployed",
    offerStatus: "Signed & Attested",
  },
  {
    id: "STF-8802",
    name: "Marcus Brody",
    role: "Driver",
    post: "Senior Transport Operator",
    grade: "Grade C",
    salary: "$42,000 / yr",
    email: "m.brody@scholix.edu",
    phone: "+1 (555) 876-1122",
    bloodGroup: "A+",
    status: "Active Deployed",
    offerStatus: "Signed & Attested",
  },
  {
    id: "STF-8803",
    name: "Elena Rostova",
    role: "Nurse",
    post: "Campus Head Nurse",
    grade: "Grade B",
    salary: "$58,000 / yr",
    email: "e.rostova@scholix.edu",
    phone: "+1 (555) 345-4455",
    bloodGroup: "B+",
    status: "Active Deployed",
    offerStatus: "Signed & Attested",
  },
];

const StaffOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [attestationFile, setAttestationFile] = useState<string | null>(null);
  const [selectedMemberDrawer, setSelectedMemberDrawer] =
    useState<StaffMember | null>(null);
  const [staffList, setStaffList] =
    useState<StaffMember[]>(INITIAL_STAFF_ROSTER);

  // STEP 1 FORM STATE
  const [formData, setFormData] = useState<FormData>({
    fullName: "Eleanor Vance",
    email: "eleanor.vance@scholix.edu",
    phone: "+1 (555) 902-1144",
    bloodGroup: "O+",
    aadhaarNo: "9928-4401-8821",
    address: "742 Evergreen Terrace, Springfield",
    familyGuardian: "Robert Vance (Spouse) - +1 (555) 332-9090",
    qualification: "Ph.D. in Applied Mathematics",
    qualificationDoc: "PhD_Degree_Certificate.pdf",
    role: "Teacher",
    post: "Head of Mathematics Department",
    grade: "Grade A (Senior Executive)",
    salary: "75000",
    joiningDate: "2026-12-01",
  });

  const handleProceedToStep2 = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FormData,
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file.name }));
    }
  };

  const resetWorkflow = (): void => {
    setCurrentStep(1);
    setAttestationFile(null);
  };

  const handleProceedToStep3 = (): void => {
    setCurrentStep(3);
  };

  const handleCompleteOnboarding = (): void => {
    const newStaff: StaffMember = {
      id: `STF-${Math.floor(8800 + Math.random() * 100)}`,
      name: formData.fullName,
      role: formData.role,
      post: formData.post,
      grade: formData.grade,
      salary: `$${Number(formData.salary).toLocaleString()} / yr`,
      email: formData.email,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      status: "Active Deployed",
      offerStatus: "Signed & Attested",
    };

    setStaffList([newStaff, ...staffList]);
    setCurrentStep(4);
  };

  const handleAttestationUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    setAttestationFile(
      e.target.files?.[0]?.name || "Signed_Offer_Letter_Attested.pdf",
    );
  };

  return (
    <>
      {/* WORKFLOW STEPPER BAR */}
      <div className="p-8 pb-0">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-4 gap-2">
            <div
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                currentStep === 1
                  ? "border-blue-500 bg-blue-50/50 text-blue-700 font-bold"
                  : currentStep > 1
                    ? "border-emerald-200 bg-emerald-50/50 text-emerald-700 font-semibold"
                    : "border-slate-200 text-slate-400"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  currentStep === 1
                    ? "bg-blue-600 text-white"
                    : currentStep > 1
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {currentStep > 1 ? (
                  <Icons name="Check" className="w-4 h-4" />
                ) : (
                  "1"
                )}
              </div>
              <div>
                <p className="text-xs font-extrabold">1. Employee Details</p>
                <p className="text-[10px] text-slate-400">Personal & Salary</p>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                currentStep === 2
                  ? "border-blue-500 bg-blue-50/50 text-blue-700 font-bold"
                  : currentStep > 2
                    ? "border-emerald-200 bg-emerald-50/50 text-emerald-700 font-semibold"
                    : "border-slate-200 text-slate-400"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  currentStep === 2
                    ? "bg-blue-600 text-white"
                    : currentStep > 2
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {currentStep > 2 ? (
                  <Icons name="Check" className="w-4 h-4" />
                ) : (
                  "2"
                )}
              </div>
              <div>
                <p className="text-xs font-extrabold">2. Generate Offer</p>
                <p className="text-[10px] text-slate-400">Dynamic Letter</p>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                currentStep === 3
                  ? "border-blue-500 bg-blue-50/50 text-blue-700 font-bold"
                  : currentStep > 3
                    ? "border-emerald-200 bg-emerald-50/50 text-emerald-700 font-semibold"
                    : "border-slate-200 text-slate-400"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  currentStep === 3
                    ? "bg-blue-600 text-white"
                    : currentStep > 3
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {currentStep > 3 ? (
                  <Icons name="Check" className="w-4 h-4" />
                ) : (
                  "3"
                )}
              </div>
              <div>
                <p className="text-xs font-extrabold">3. Attestation Upload</p>
                <p className="text-[10px] text-slate-400">
                  Signed Offer & Docs
                </p>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                currentStep === 4
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold"
                  : "border-slate-200 text-slate-400"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  currentStep === 4
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                4
              </div>
              <div>
                <p className="text-xs font-extrabold">4. Deployment</p>
                <p className="text-[10px] text-slate-400">Active Directory</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-8 space-y-6">
        {/* STEP 1: REGISTRATION FORM */}
        {currentStep === 1 && (
          <form
            onSubmit={handleProceedToStep2}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-[#0F223D]">
                  Step 1: Comprehensive Employee Registration
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  Enter personal credentials, academic verification proof, and
                  compensation structure.
                </p>
              </div>
              <span className="bg-blue-100 text-blue-700 text-xs font-extrabold px-3 py-1 rounded-full">
                Phase 1 of 4
              </span>
            </div>

            {/* Personal Details */}
            <div className="space-y-3">
              <p className="text-xs font-extrabold text-[#0F223D] uppercase tracking-wider flex items-center gap-2">
                <Icons name="Users" className="w-4 h-4 text-blue-600" />{" "}
                Personal & Identity Particulars
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Full Candidate Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Primary Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="text"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  >
                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>AB+</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Aadhaar Number *
                  </label>
                  <input
                    id="aadhaarNo"
                    type="text"
                    required
                    value={formData.aadhaarNo}
                    onChange={handleInputChange}
                    placeholder="XXXX-XXXX-XXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Family / Guardian Details
                  </label>
                  <input
                    id="familyGuardian"
                    type="text"
                    value={formData.familyGuardian}
                    onChange={handleInputChange}
                    placeholder="Spouse/Parent Name & Contact"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-bold text-slate-600 mb-1">
                  Residential Address *
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Qualification & Document Upload */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <p className="text-xs font-extrabold text-[#0F223D] uppercase tracking-wider flex items-center gap-2">
                <Icons name="GraduationCap" className="w-4 h-4 text-blue-600" />{" "}
                Qualification & Academic Document Proof
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Highest Educational Qualification *
                  </label>
                  <input
                    id="qualification"
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={handleInputChange}
                    placeholder="e.g. Master of Science / Ph.D."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Upload Highest Qualification Document (PDF/JPG) *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="qualificationDocFile"
                      onChange={(e) => handleFileUpload(e, "qualificationDoc")}
                      className="hidden"
                    />
                    <label
                      htmlFor="qualificationDocFile"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-600 font-semibold cursor-pointer hover:bg-slate-100 flex items-center justify-between"
                    >
                      <span>
                        {formData.qualificationDoc || "Choose Document File..."}
                      </span>
                      <Icons name="Upload" className="w-4 h-4 text-blue-600" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Role, Grade & Salary */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <p className="text-xs font-extrabold text-[#0F223D] uppercase tracking-wider flex items-center gap-2">
                <Icons name="Briefcase" className="w-4 h-4 text-blue-600" />{" "}
                Designation, Grade & Salary Allocation
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Primary Role
                  </label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  >
                    <option>Teacher</option>
                    <option>Staff</option>
                    <option>Guard</option>
                    <option>Admin</option>
                    <option>Driver</option>
                    <option>Librarian</option>
                    <option>Counselor</option>
                    <option>Nurse</option>
                    <option>Accountant</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Post / Designation Title *
                  </label>
                  <input
                    id="post"
                    type="text"
                    required
                    value={formData.post}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Faculty"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Grade Level
                  </label>
                  <select
                    id="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  >
                    <option>Grade A (Senior Executive)</option>
                    <option>Grade B (Mid-Level Professional)</option>
                    <option>Grade C (Operational Support)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Annual CTC Salary ($) *
                  </label>
                  <input
                    id="salary"
                    type="text"
                    required
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. 75,000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-semibold outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#0F223D] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Generate Official Offer Letter</span>
                <Icons name="ArrowRight" className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: AUTO OFFER LETTER GENERATION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-md max-w-4xl mx-auto space-y-6 font-serif">
              <div className="flex justify-between items-start border-b-2 border-[#142B4A] pb-6 font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#D6B36A] flex items-center justify-center text-white font-black text-2xl shadow-md">
                    S
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-[#142B4A]">
                      SCHOLIX INTERNATIONAL ACADEMY
                    </h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                      Office of Human Resource Management
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs font-semibold text-slate-600">
                  <p>Ref: SCH/OFFER/2026/0992</p>
                  <p>Date: Nov 03, 2026</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-800 leading-relaxed font-sans">
                <p className="font-extrabold text-base">
                  STRICTLY CONFIDENTIAL - LETTER OF APPOINTMENT
                </p>
                <p>
                  Dear{" "}
                  <span className="font-bold text-[#142B4A]">
                    {formData.fullName}
                  </span>
                  ,
                </p>
                <p>
                  We are pleased to offer you the position of{" "}
                  <span className="font-bold">{formData.post}</span> (
                  {formData.role}) at Scholix International Academy under{" "}
                  <span className="font-bold">{formData.grade}</span>.
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">
                      Annual Compensation (CTC):
                    </span>
                    <span className="font-extrabold text-[#142B4A]">
                      ${Number(formData.salary).toLocaleString()} USD / annum
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">
                      Aadhaar Identity Reference:
                    </span>
                    <span className="font-extrabold text-slate-800">
                      {formData.aadhaarNo}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">
                      Highest Qualification Verified:
                    </span>
                    <span className="font-extrabold text-slate-800">
                      {formData.qualification} ({formData.qualificationDoc})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">
                      Proposed Joining Date:
                    </span>
                    <span className="font-extrabold text-emerald-600">
                      {formData.joiningDate}
                    </span>
                  </div>
                </div>

                <p>
                  Please review this offer letter. To accept, sign and attest
                  this letter and proceed to Step 3 for uploading the attested
                  agreement.
                </p>
              </div>

              <div className="pt-8 border-t border-slate-200 flex justify-between items-end font-sans text-xs">
                <div>
                  <div className="h-10 border-b border-slate-400 w-48 mb-1 flex items-end font-script italic text-slate-600">
                    Dr. Arthur Pendelton
                  </div>
                  <p className="font-extrabold text-[#142B4A]">
                    Head of Human Resources
                  </p>
                  <p className="text-slate-400">Scholix International</p>
                </div>
                <div className="text-right">
                  <div className="h-10 border-b border-slate-400 w-48 mb-1"></div>
                  <p className="font-extrabold text-[#142B4A]">
                    Candidate Signature
                  </p>
                  <p className="text-slate-400">({formData.fullName})</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
              >
                <Icons name="ArrowLeft" className="w-4 h-4" />
                Edit Details
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => alert("Printing Offer Letter...")}
                  className="px-5 py-2.5 bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <Icons name="Printer" className="w-4 h-4" /> Print Letter
                </button>
                <button
                  onClick={handleProceedToStep3}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2"
                >
                  <span>Proceed to Attestation Upload</span>
                  <Icons name="ArrowRight" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ATTESTATION & FILE UPLOAD */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
            <div>
              <h2 className="text-lg font-extrabold text-[#0F223D]">
                Step 3: Attest & Upload Signed Offer Letter
              </h2>
              <p className="text-xs text-slate-400 font-semibold">
                Upload the signed, candidate-attested copy of the offer letter
                to complete verification.
              </p>
            </div>

            <div className="p-6 bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-2xl text-center space-y-3">
              <Icons
                name="FileCheck"
                className="w-10 h-10 text-blue-600 mx-auto"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Upload Signed & Attested Offer Agreement
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Accepted Formats: Signed PDF, Scanned JPG/PNG (Max 10MB)
                </p>
              </div>
              <input
                type="file"
                id="attestationUpload"
                onChange={handleAttestationUpload}
                className="hidden"
              />
              <label
                htmlFor="attestationUpload"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-blue-700 shadow-sm transition-all"
              >
                <Icons name="Upload" className="w-4 h-4" />
                <span>{attestationFile || "Browse & Attach File"}</span>
              </label>
            </div>

            {attestationFile && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-bold">
                <div className="flex items-center gap-2">
                  <Icons
                    name="CheckCircle2"
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span>Attested File Attached: {attestationFile}</span>
                </div>
                <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded text-[10px]">
                  Ready for Deploy
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
              >
                <Icons name="ArrowLeft" className="w-4 h-4" /> Back to Letter
              </button>
              <button
                onClick={handleCompleteOnboarding}
                disabled={!attestationFile}
                className={`px-6 py-2.5 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all ${
                  attestationFile
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                <Icons name="BadgeCheck" className="w-4 h-4" />
                <span>Verify Attestation & Deploy Employee</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ACTIVE DEPLOYMENT SUCCESS */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
              <Icons name="Check" className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#0F223D]">
                Onboarding & Deployment Complete!
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                <span className="font-bold text-slate-800">
                  {formData.fullName}
                </span>{" "}
                has been officially verified, attested, and deployed into the
                active Scholix Staff Roster under role:{" "}
                <span className="font-bold text-blue-600">{formData.role}</span>
                .
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Assigned Post:</span>
                <span className="font-extrabold text-slate-800">
                  {formData.post}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">
                  Grade & Salary:
                </span>
                <span className="font-extrabold text-slate-800">
                  {formData.grade} • ${Number(formData.salary).toLocaleString()}{" "}
                  / yr
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Aadhaar / ID:</span>
                <span className="font-extrabold text-slate-800">
                  {formData.aadhaarNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">
                  Attested Offer Status:
                </span>
                <span className="font-black text-emerald-600">
                  Verified & Filed
                </span>
              </div>
            </div>

            <button
              onClick={resetWorkflow}
              className="px-6 py-3 bg-[#0F223D] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
            >
              <Icons name="Plus" className="w-4 h-4" />
              <span>Onboard Another Employee</span>
            </button>
          </div>
        )}

        {/* ACTIVE STAFF ROSTER QUEUE */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-[#0F223D]">
                Deployed Staff Directory Roster
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold">
                Live personnel with attested offer letters
              </p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-black px-3 py-1 rounded-full border border-emerald-200">
              {staffList.length} Active Employees
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {staffList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMemberDrawer(item)}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 cursor-pointer hover:border-blue-400 transition-all text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-[#0F223D] text-sm">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold">
                      {item.id} • {item.role}
                    </p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full">
                    {item.status}
                  </span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-600 font-medium border-t border-slate-200/60 pt-2">
                  <p>
                    <span className="text-slate-400">Post:</span> {item.post}
                  </p>
                  <p>
                    <span className="text-slate-400">Salary:</span>{" "}
                    {item.salary}
                  </p>
                  <p>
                    <span className="text-slate-400">Offer Status:</span>{" "}
                    <span className="font-bold text-emerald-600">
                      {item.offerStatus}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffOnboarding;
