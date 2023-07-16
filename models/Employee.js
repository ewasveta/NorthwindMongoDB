const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    company: String,
    last_name: String,
    first_name: String,
    email_address: String,
    job_title: String,
    business_phone: String,
    home_phone: String,
    fax_number: String,
    address: String,
    city:String,
    state_province: String,
    zip_postal_code: Number,
    country_region: String,
    web_page:String,
    salary: Number
})

module.exports = mongoose.model("employee", EmployeeSchema);


