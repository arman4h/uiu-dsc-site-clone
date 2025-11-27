import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  Copy,
  Upload,
} from 'lucide-react'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

export const Route = createFileRoute('/join')({
  component: RouteComponent,
})

interface FormData {
  // Personal Information
  fullName: string
  gender: string
  dateOfBirth: { year: string; month: string; day: string }
  bloodGroup: string
  presentAddress: string
  permanentAddress: string
  tShirtSize: string

  // Academic Information
  studentId: string
  universityEmail: string
  school: string
  department: string
  currentSemester: string

  // Contact Information
  phoneNumber: string
  emergencyPhoneNumber: string
  personalEmail: string
  secondaryEmail: string
  facebookProfile: string
  linkedinProfile: string

  // Payment Information
  paymentMethod: string
  paymentPhone: string
  transactionId: string

  // Photo Upload
  photoFile: File | null
  termsAccepted: boolean
}

function RouteComponent() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    gender: '',
    dateOfBirth: { year: '', month: '', day: '' },
    bloodGroup: '',
    presentAddress: '',
    permanentAddress: '',
    tShirtSize: '',
    studentId: '',
    universityEmail: '',
    school: '',
    department: '',
    currentSemester: '',
    phoneNumber: '',
    emergencyPhoneNumber: '',
    personalEmail: '',
    secondaryEmail: '',
    facebookProfile: '',
    linkedinProfile: '',
    paymentMethod: '',
    paymentPhone: '',
    transactionId: '',
    photoFile: null,
    termsAccepted: false,
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else if (name.startsWith('dateOfBirth.')) {
      const field = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: {
          ...prev.dateOfBirth,
          [field]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photoFile: file,
      }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Application submitted! (demo mode)')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cyan-600">Join Our Club</h1>
          <p className="mt-3 text-gray-600">Fill out the form below to become a member of the UIU Data Science Club.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-cyan-400/20 p-8 space-y-8">
          {/* Personal Information Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h2>
            <p className="text-sm text-gray-500 mb-6">Please provide all the required information to complete your registration.</p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <div className="grid grid-cols-3 gap-4">
                  <select
                    name="dateOfBirth.year"
                    value={formData.dateOfBirth.year}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Year</option>
                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    name="dateOfBirth.month"
                    value={formData.dateOfBirth.month}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={String(month)}>
                        {String(month).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    name="dateOfBirth.day"
                    value={formData.dateOfBirth.day}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={String(day)}>
                        {String(day).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select blood group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Present Address</label>
                <input
                  type="text"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleInputChange}
                  placeholder="Your current address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Address</label>
                <input
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  placeholder="Your permanent address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">T-Shirt Size</label>
                <select
                  name="tShirtSize"
                  value={formData.tShirtSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="">Select t-shirt size</option>
                  <option value="XS">Extra Small (XS)</option>
                  <option value="S">Small (S)</option>
                  <option value="M">Medium (M)</option>
                  <option value="L">Large (L)</option>
                  <option value="XL">Extra Large (XL)</option>
                  <option value="XXL">2XL</option>
                </select>
              </div>
            </div>
          </section>

          {/* Academic Information Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Academic Information</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    placeholder="DIU123456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University Email</label>
                  <input
                    type="email"
                    name="universityEmail"
                    value={formData.universityEmail}
                    onChange={handleInputChange}
                    placeholder="name@diu.edu.bd"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Must be a valid .diu.edu.bd email address</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select school</option>
                    <option value="FSE">Faculty of Science & Engineering</option>
                    <option value="FBM">Faculty of Business & Management</option>
                    <option value="FOL">Faculty of Liberal Arts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select department</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="EEE">Electrical & Electronic Engineering</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="BBA">Business Administration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
                <select
                  name="currentSemester"
                  value={formData.currentSemester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="">Select semester</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((sem) => (
                    <option key={sem} value={String(sem)}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Contact Information Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone Number</label>
                  <input
                    type="tel"
                    name="emergencyPhoneNumber"
                    value={formData.emergencyPhoneNumber}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Personal Email</label>
                  <input
                    type="email"
                    name="personalEmail"
                    value={formData.personalEmail}
                    onChange={handleInputChange}
                    placeholder="youremail@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Email (Optional)</label>
                  <input
                    type="email"
                    name="secondaryEmail"
                    value={formData.secondaryEmail}
                    onChange={handleInputChange}
                    placeholder="secondary@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Profile (Optional)</label>
                  <input
                    type="text"
                    name="facebookProfile"
                    value={formData.facebookProfile}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile (Optional)</label>
                  <input
                    type="text"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Information Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Information</h2>
            <p className="text-sm text-gray-600 mb-6">Registration Fee: 500 TK</p>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cyan-900 mb-2">Important Information:</p>
                  <ol className="text-sm text-cyan-900 space-y-1 list-decimal list-inside">
                    <li>Send the payment using any of the following method</li>
                    <li>Use the account number for payment</li>
                    <li>Keep the transaction ID safe</li>
                    <li>Fill in the payment details below</li>
                  </ol>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bkash */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Bkash</h3>
                    <span className="text-xs text-gray-500">Personal Number</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-mono font-semibold text-gray-800">01993-439115</code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('01993-439115')}
                      className="p-1 hover:bg-gray-100 rounded">
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Rocket */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Rocket</h3>
                    <span className="text-xs text-gray-500">Personal Number</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-mono font-semibold text-gray-800">01993-439115</code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('01993-439115')}
                      className="p-1 hover:bg-gray-100 rounded">
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select payment method</option>
                    <option value="bkash">Bkash</option>
                    <option value="rocket">Rocket</option>
                    <option value="nagad">Nagad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Phone Number</label>
                  <input
                    type="tel"
                    name="paymentPhone"
                    value={formData.paymentPhone}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">The number you used to send money</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction/Reference ID (for online payment)</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="TxID1234567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p className="text-xs text-gray-400 mt-1">Enter the Transaction ID if you need to send money</p>
              </div>
            </div>
          </section>

          {/* Photo Upload Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Photo Upload</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (for ID Card)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <p className="text-sm text-gray-600">
                    <span className="text-cyan-600 font-medium">Choose file</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
              {formData.photoFile && <p className="text-sm text-green-600 mt-2">✓ {formData.photoFile.name} selected</p>}
            </div>
          </section>

          {/* Terms and Conditions */}
          <section>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-cyan-600 rounded focus:ring-2 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-600">
                I accept the terms and conditions <a href="#" className="text-cyan-600 hover:underline">See Checkout for complete Terms and Conditions</a>
              </span>
            </label>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white font-semibold py-3 rounded-lg hover:bg-cyan-700 transition-colors">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}
