import { CompensationRecord, NormalizedLevel, CompanyProfile } from "@/types";
import { MOCK_COMPANIES } from "./companies";

export const MOCK_SALARIES: CompensationRecord[] = [
  {
    "id": "rec_9jn11rx",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "QA Engineer 1",
    "yearsOfExperience": 5,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3400000,
    "stockPerYear": 2250000,
    "bonus": 730000,
    "totalCompensation": 6380000,
    "currency": "INR",
    "reportedAt": "2022-05-29T17:40:32.047Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_zxxtgjk",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "QA Engineer 3",
    "yearsOfExperience": 0,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 61000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 61000,
    "currency": "USD",
    "reportedAt": "2024-01-13T12:58:11.887Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_nq087sn",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Software Engineer 2",
    "yearsOfExperience": 0,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 600000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 600000,
    "currency": "INR",
    "reportedAt": "2023-10-05T05:39:09.204Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_2eftraj",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "ML Engineer 1",
    "yearsOfExperience": 14,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5100000,
    "stockPerYear": 3810000,
    "bonus": 560000,
    "totalCompensation": 9470000,
    "currency": "INR",
    "reportedAt": "2022-12-27T06:34:16.915Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_rz0uavx",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Manager 2",
    "yearsOfExperience": 25,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11000000,
    "stockPerYear": 9770000,
    "bonus": 2130000,
    "totalCompensation": 22900000,
    "currency": "INR",
    "reportedAt": "2024-11-28T07:37:46.056Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_4o4wzs7",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "QA Engineer 4",
    "yearsOfExperience": 14,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 405000,
    "stockPerYear": 140000,
    "bonus": 137000,
    "totalCompensation": 682000,
    "currency": "USD",
    "reportedAt": "2024-05-16T14:23:36.787Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_01a3hjj",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "SDE 4",
    "yearsOfExperience": 0,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 77000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 77000,
    "currency": "USD",
    "reportedAt": "2023-06-19T16:28:44.107Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_1441p9g",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Backend Engineer 3",
    "yearsOfExperience": 19,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 14200000,
    "stockPerYear": 7710000,
    "bonus": 3010000,
    "totalCompensation": 24920000,
    "currency": "INR",
    "reportedAt": "2023-11-12T01:37:08.098Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_g1734h5",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 1",
    "yearsOfExperience": 18,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12800000,
    "stockPerYear": 6450000,
    "bonus": 680000,
    "totalCompensation": 19930000,
    "currency": "INR",
    "reportedAt": "2022-08-15T18:51:52.722Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_w57q5i7",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "ML Engineer 3",
    "yearsOfExperience": 13,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5700000,
    "stockPerYear": 1380000,
    "bonus": 920000,
    "totalCompensation": 8000000,
    "currency": "INR",
    "reportedAt": "2023-05-05T05:39:15.350Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_sm6rrc5",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Designer 1",
    "yearsOfExperience": 20,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 14800000,
    "stockPerYear": 6630000,
    "bonus": 3450000,
    "totalCompensation": 24880000,
    "currency": "INR",
    "reportedAt": "2023-12-06T04:16:53.005Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_wvksgn7",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Engineering Manager 3",
    "yearsOfExperience": 12,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 6900000,
    "stockPerYear": 2940000,
    "bonus": 450000,
    "totalCompensation": 10290000,
    "currency": "INR",
    "reportedAt": "2022-02-24T19:46:04.601Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_43wm5xf",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Engineering Manager 2",
    "yearsOfExperience": 8,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5400000,
    "stockPerYear": 1730000,
    "bonus": 460000,
    "totalCompensation": 7590000,
    "currency": "INR",
    "reportedAt": "2024-09-05T06:25:01.580Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_u7uin75",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "QA Engineer 3",
    "yearsOfExperience": 13,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8550000,
    "stockPerYear": 5770000,
    "bonus": 2140000,
    "totalCompensation": 16460000,
    "currency": "INR",
    "reportedAt": "2023-11-21T18:57:33.627Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_pft3sy6",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Data Scientist 1",
    "yearsOfExperience": 7,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3200000,
    "stockPerYear": 3190000,
    "bonus": 680000,
    "totalCompensation": 7070000,
    "currency": "INR",
    "reportedAt": "2024-06-01T10:24:26.149Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_wk94ivj",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Data Analyst 3",
    "yearsOfExperience": 2,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1200000,
    "stockPerYear": 0,
    "bonus": 80000,
    "totalCompensation": 1280000,
    "currency": "INR",
    "reportedAt": "2024-12-28T07:28:35.161Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_0xc8zwp",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Data Analyst 1",
    "yearsOfExperience": 19,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 472000,
    "stockPerYear": 472000,
    "bonus": 103000,
    "totalCompensation": 1047000,
    "currency": "USD",
    "reportedAt": "2024-07-17T16:20:12.671Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_8nzz0c9",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Engineering Manager 2",
    "yearsOfExperience": 14,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7800000,
    "stockPerYear": 2320000,
    "bonus": 1020000,
    "totalCompensation": 11140000,
    "currency": "INR",
    "reportedAt": "2023-10-28T10:45:50.006Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_sq1z810",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Product Manager 1",
    "yearsOfExperience": 20,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9000000,
    "stockPerYear": 5250000,
    "bonus": 1570000,
    "totalCompensation": 15820000,
    "currency": "INR",
    "reportedAt": "2024-04-03T14:42:54.460Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_tprrz21",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Engineering Manager 4",
    "yearsOfExperience": 18,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9000000,
    "stockPerYear": 3800000,
    "bonus": 800000,
    "totalCompensation": 13600000,
    "currency": "INR",
    "reportedAt": "2023-12-21T03:51:57.831Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_8hdfsfw",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "QA Engineer 1",
    "yearsOfExperience": 1,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1500000,
    "stockPerYear": 750000,
    "bonus": 180000,
    "totalCompensation": 2430000,
    "currency": "INR",
    "reportedAt": "2023-04-29T19:16:02.554Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_thv64ll",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Manager 3",
    "yearsOfExperience": 19,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 13400000,
    "stockPerYear": 7410000,
    "bonus": 2330000,
    "totalCompensation": 23140000,
    "currency": "INR",
    "reportedAt": "2023-10-16T12:21:13.952Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_yea6kdl",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 4",
    "yearsOfExperience": 19,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9400000,
    "stockPerYear": 6670000,
    "bonus": 2230000,
    "totalCompensation": 18300000,
    "currency": "INR",
    "reportedAt": "2024-01-28T16:09:51.399Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_1pcuwds",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Data Analyst 3",
    "yearsOfExperience": 12,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 290000,
    "stockPerYear": 468000,
    "bonus": 98000,
    "totalCompensation": 856000,
    "currency": "USD",
    "reportedAt": "2024-11-20T02:49:59.267Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_jx1wvir",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Product Manager 3",
    "yearsOfExperience": 10,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 6600000,
    "stockPerYear": 1420000,
    "bonus": 1340000,
    "totalCompensation": 9360000,
    "currency": "INR",
    "reportedAt": "2024-12-29T11:10:43.499Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_7hvua22",
    "company": {
      "name": "Wipro",
      "slug": "wipro",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "QA Engineer 2",
    "yearsOfExperience": 2,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1100000,
    "stockPerYear": 0,
    "bonus": 190000,
    "totalCompensation": 1290000,
    "currency": "INR",
    "reportedAt": "2022-10-18T22:01:02.536Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_shtwowr",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "ML Engineer 4",
    "yearsOfExperience": 1,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1300000,
    "stockPerYear": 620000,
    "bonus": 230000,
    "totalCompensation": 2150000,
    "currency": "INR",
    "reportedAt": "2022-12-25T10:00:57.781Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_fkcxjid",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "ML Engineer 2",
    "yearsOfExperience": 0,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 400000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 400000,
    "currency": "INR",
    "reportedAt": "2022-11-01T13:57:39.461Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_au5to2f",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Backend Engineer 4",
    "yearsOfExperience": 12,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8250000,
    "stockPerYear": 3670000,
    "bonus": 870000,
    "totalCompensation": 12790000,
    "currency": "INR",
    "reportedAt": "2024-04-02T00:15:53.655Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_5gp8a3k",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Engineering Manager 1",
    "yearsOfExperience": 13,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 358000,
    "stockPerYear": 340000,
    "bonus": 60000,
    "totalCompensation": 758000,
    "currency": "USD",
    "reportedAt": "2023-08-24T02:01:41.736Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_mc0m9pd",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "SDE 3",
    "yearsOfExperience": 10,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 6300000,
    "stockPerYear": 5710000,
    "bonus": 950000,
    "totalCompensation": 12960000,
    "currency": "INR",
    "reportedAt": "2022-02-26T06:03:13.740Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_03yalbs",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Frontend Engineer 3",
    "yearsOfExperience": 16,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7200000,
    "stockPerYear": 5510000,
    "bonus": 1580000,
    "totalCompensation": 14290000,
    "currency": "INR",
    "reportedAt": "2024-05-18T16:08:16.921Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_50b7td4",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Software Engineer 4",
    "yearsOfExperience": 3,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 118000,
    "stockPerYear": 139000,
    "bonus": 24000,
    "totalCompensation": 281000,
    "currency": "USD",
    "reportedAt": "2023-10-20T02:50:32.962Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_gt91q62",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Designer 2",
    "yearsOfExperience": 15,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7800000,
    "stockPerYear": 7270000,
    "bonus": 1580000,
    "totalCompensation": 16650000,
    "currency": "INR",
    "reportedAt": "2023-12-07T21:54:54.502Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_006zv9c",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "ML Engineer 1",
    "yearsOfExperience": 19,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10000000,
    "stockPerYear": 7420000,
    "bonus": 660000,
    "totalCompensation": 18080000,
    "currency": "INR",
    "reportedAt": "2024-12-29T00:37:05.486Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_3hipani",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "DevOps 3",
    "yearsOfExperience": 6,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2400000,
    "stockPerYear": 1680000,
    "bonus": 360000,
    "totalCompensation": 4440000,
    "currency": "INR",
    "reportedAt": "2023-06-17T10:38:30.553Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_xw9viwg",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Engineering Manager 3",
    "yearsOfExperience": 11,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 4350000,
    "stockPerYear": 2160000,
    "bonus": 780000,
    "totalCompensation": 7290000,
    "currency": "INR",
    "reportedAt": "2022-10-30T20:32:50.063Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_dfgq99u",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Engineering Manager 1",
    "yearsOfExperience": 20,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 474000,
    "stockPerYear": 148000,
    "bonus": 102000,
    "totalCompensation": 724000,
    "currency": "USD",
    "reportedAt": "2022-01-11T16:33:55.665Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_f9zl8a5",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "SDE 1",
    "yearsOfExperience": 10,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 6750000,
    "stockPerYear": 3620000,
    "bonus": 1570000,
    "totalCompensation": 11940000,
    "currency": "INR",
    "reportedAt": "2024-12-21T09:28:27.057Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_8yn1c8i",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Software Engineer 4",
    "yearsOfExperience": 9,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3750000,
    "stockPerYear": 3270000,
    "bonus": 740000,
    "totalCompensation": 7760000,
    "currency": "INR",
    "reportedAt": "2022-06-19T14:42:14.528Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_uzsmr32",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 4",
    "yearsOfExperience": 12,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 6600000,
    "stockPerYear": 3550000,
    "bonus": 1170000,
    "totalCompensation": 11320000,
    "currency": "INR",
    "reportedAt": "2024-01-17T04:50:04.088Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_w6rzpy7",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "DevOps 4",
    "yearsOfExperience": 2,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1600000,
    "stockPerYear": 0,
    "bonus": 190000,
    "totalCompensation": 1790000,
    "currency": "INR",
    "reportedAt": "2022-09-20T02:57:57.490Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_ih9ut31",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Frontend Engineer 2",
    "yearsOfExperience": 8,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 4300000,
    "stockPerYear": 1700000,
    "bonus": 440000,
    "totalCompensation": 6440000,
    "currency": "INR",
    "reportedAt": "2022-02-19T15:02:33.848Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_26esdhg",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "SDE 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5250000,
    "stockPerYear": 1590000,
    "bonus": 420000,
    "totalCompensation": 7260000,
    "currency": "INR",
    "reportedAt": "2024-08-27T08:26:09.503Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_6ky9f5e",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Frontend Engineer 4",
    "yearsOfExperience": 16,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5400000,
    "stockPerYear": 3860000,
    "bonus": 1320000,
    "totalCompensation": 10580000,
    "currency": "INR",
    "reportedAt": "2023-10-14T01:22:57.498Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_ygowew1",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8200000,
    "stockPerYear": 8200000,
    "bonus": 1240000,
    "totalCompensation": 17640000,
    "currency": "INR",
    "reportedAt": "2022-10-01T01:12:13.855Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_n4nvtzp",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 1",
    "yearsOfExperience": 14,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 6600000,
    "stockPerYear": 1960000,
    "bonus": 1330000,
    "totalCompensation": 9890000,
    "currency": "INR",
    "reportedAt": "2024-08-19T17:11:31.684Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_6hykugq",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "QA Engineer 3",
    "yearsOfExperience": 8,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 4100000,
    "stockPerYear": 3180000,
    "bonus": 550000,
    "totalCompensation": 7830000,
    "currency": "INR",
    "reportedAt": "2022-02-08T20:28:19.756Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_re4jqa6",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "SDE 2",
    "yearsOfExperience": 0,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 400000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 400000,
    "currency": "INR",
    "reportedAt": "2023-12-08T13:04:49.932Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_la0kofi",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Frontend Engineer 2",
    "yearsOfExperience": 15,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9750000,
    "stockPerYear": 2860000,
    "bonus": 900000,
    "totalCompensation": 13510000,
    "currency": "INR",
    "reportedAt": "2023-06-10T03:04:28.046Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_qz6pnur",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "VP Engineering",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "VP Engineering 2",
    "yearsOfExperience": 17,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12800000,
    "stockPerYear": 12790000,
    "bonus": 3070000,
    "totalCompensation": 28660000,
    "currency": "INR",
    "reportedAt": "2022-03-05T10:47:12.496Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_c1g8uzv",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "VP Engineering",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "VP Engineering 2",
    "yearsOfExperience": 15,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7400000,
    "stockPerYear": 2790000,
    "bonus": 850000,
    "totalCompensation": 11040000,
    "currency": "INR",
    "reportedAt": "2023-01-26T19:19:14.441Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_qr8t47l",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8400000,
    "stockPerYear": 6970000,
    "bonus": 1570000,
    "totalCompensation": 16940000,
    "currency": "INR",
    "reportedAt": "2023-07-11T20:18:50.205Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_sbh7a9h",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Product Designer 2",
    "yearsOfExperience": 18,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 14000000,
    "stockPerYear": 9070000,
    "bonus": 2900000,
    "totalCompensation": 25970000,
    "currency": "INR",
    "reportedAt": "2023-04-13T04:20:46.354Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_nd7nedc",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "ML Engineer 1",
    "yearsOfExperience": 2,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1000000,
    "stockPerYear": 0,
    "bonus": 160000,
    "totalCompensation": 1160000,
    "currency": "INR",
    "reportedAt": "2024-12-27T23:15:28.893Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_28syqya",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "VP Engineering",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "VP Engineering 2",
    "yearsOfExperience": 23,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11000000,
    "stockPerYear": 4210000,
    "bonus": 2420000,
    "totalCompensation": 17630000,
    "currency": "INR",
    "reportedAt": "2024-12-21T11:32:49.057Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_kj2w4al",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "DevOps 2",
    "yearsOfExperience": 2,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1900000,
    "stockPerYear": 870000,
    "bonus": 180000,
    "totalCompensation": 2950000,
    "currency": "INR",
    "reportedAt": "2022-10-21T17:33:18.285Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_abq2jx5",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 2",
    "yearsOfExperience": 12,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10600000,
    "stockPerYear": 5320000,
    "bonus": 2470000,
    "totalCompensation": 18390000,
    "currency": "INR",
    "reportedAt": "2023-01-08T07:06:39.057Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_1nvipd8",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Data Scientist 2",
    "yearsOfExperience": 2,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1700000,
    "stockPerYear": 1450000,
    "bonus": 240000,
    "totalCompensation": 3390000,
    "currency": "INR",
    "reportedAt": "2023-09-20T05:36:57.921Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_r4ej5dm",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Data Analyst 4",
    "yearsOfExperience": 24,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10400000,
    "stockPerYear": 9050000,
    "bonus": 1040000,
    "totalCompensation": 20490000,
    "currency": "INR",
    "reportedAt": "2022-03-07T19:13:57.639Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_oiqyunh",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Designer 2",
    "yearsOfExperience": 24,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 17000000,
    "stockPerYear": 13930000,
    "bonus": 3310000,
    "totalCompensation": 34240000,
    "currency": "INR",
    "reportedAt": "2023-10-13T07:17:16.370Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_khjdyy6",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "SDE 4",
    "yearsOfExperience": 0,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 700000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 700000,
    "currency": "INR",
    "reportedAt": "2024-03-30T05:05:59.256Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_7e27btw",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Software Engineer 2",
    "yearsOfExperience": 1,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1400000,
    "stockPerYear": 0,
    "bonus": 140000,
    "totalCompensation": 1540000,
    "currency": "INR",
    "reportedAt": "2023-04-21T15:38:24.005Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_h0ilnly",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 3",
    "yearsOfExperience": 17,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12600000,
    "stockPerYear": 10150000,
    "bonus": 1060000,
    "totalCompensation": 23810000,
    "currency": "INR",
    "reportedAt": "2024-06-01T00:54:55.013Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_y6rk4kw",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 4",
    "yearsOfExperience": 23,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10200000,
    "stockPerYear": 4050000,
    "bonus": 2100000,
    "totalCompensation": 16350000,
    "currency": "INR",
    "reportedAt": "2023-02-04T12:14:14.479Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_kljxxt3",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "QA Engineer 1",
    "yearsOfExperience": 4,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1300000,
    "stockPerYear": 0,
    "bonus": 230000,
    "totalCompensation": 1530000,
    "currency": "INR",
    "reportedAt": "2024-04-18T15:05:13.442Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_s9uydsa",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Software Engineer 1",
    "yearsOfExperience": 16,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8000000,
    "stockPerYear": 6230000,
    "bonus": 1660000,
    "totalCompensation": 15890000,
    "currency": "INR",
    "reportedAt": "2024-03-21T10:08:10.760Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_prwg7vo",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "QA Engineer 1",
    "yearsOfExperience": 19,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 14800000,
    "stockPerYear": 10640000,
    "bonus": 2890000,
    "totalCompensation": 28330000,
    "currency": "INR",
    "reportedAt": "2023-03-23T17:31:18.865Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_xo60htn",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "ML Engineer 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1400000,
    "stockPerYear": 330000,
    "bonus": 90000,
    "totalCompensation": 1820000,
    "currency": "INR",
    "reportedAt": "2024-06-13T19:07:42.932Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_1n7mk9t",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "VP Engineering",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "VP Engineering 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 376000,
    "stockPerYear": 543000,
    "bonus": 36000,
    "totalCompensation": 955000,
    "currency": "USD",
    "reportedAt": "2022-05-30T16:09:28.832Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_kmtuloz",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "QA Engineer 3",
    "yearsOfExperience": 8,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2100000,
    "stockPerYear": 1100000,
    "bonus": 110000,
    "totalCompensation": 3310000,
    "currency": "INR",
    "reportedAt": "2023-03-04T09:02:55.085Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_52nlk7b",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "ML Engineer 3",
    "yearsOfExperience": 0,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 500000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 500000,
    "currency": "INR",
    "reportedAt": "2024-04-11T12:52:21.417Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_sxsnffo",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "ML Engineer 4",
    "yearsOfExperience": 15,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5400000,
    "stockPerYear": 3350000,
    "bonus": 880000,
    "totalCompensation": 9630000,
    "currency": "INR",
    "reportedAt": "2023-01-28T19:47:20.005Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_zy0nj8j",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "SDE 3",
    "yearsOfExperience": 2,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1600000,
    "stockPerYear": 0,
    "bonus": 320000,
    "totalCompensation": 1920000,
    "currency": "INR",
    "reportedAt": "2022-04-11T07:22:13.316Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_m5co2st",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "ML Engineer 2",
    "yearsOfExperience": 6,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1700000,
    "stockPerYear": 1250000,
    "bonus": 400000,
    "totalCompensation": 3350000,
    "currency": "INR",
    "reportedAt": "2024-03-02T03:18:11.306Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_6bithz3",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 4",
    "yearsOfExperience": 25,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 18800000,
    "stockPerYear": 5170000,
    "bonus": 1260000,
    "totalCompensation": 25230000,
    "currency": "INR",
    "reportedAt": "2023-12-05T05:48:08.407Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_ic0r1m4",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Data Scientist 1",
    "yearsOfExperience": 8,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 248000,
    "stockPerYear": 218000,
    "bonus": 41000,
    "totalCompensation": 507000,
    "currency": "USD",
    "reportedAt": "2024-03-28T17:10:11.090Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_m6x2zty",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Software Engineer 1",
    "yearsOfExperience": 22,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 16000000,
    "stockPerYear": 3680000,
    "bonus": 1240000,
    "totalCompensation": 20920000,
    "currency": "INR",
    "reportedAt": "2022-11-13T04:43:47.118Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_xdroaz2",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "VP Engineering",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "VP Engineering 3",
    "yearsOfExperience": 19,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9000000,
    "stockPerYear": 8180000,
    "bonus": 480000,
    "totalCompensation": 17660000,
    "currency": "INR",
    "reportedAt": "2024-06-29T16:29:39.575Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_1ve5vur",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Data Scientist 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1000000,
    "stockPerYear": 250000,
    "bonus": 140000,
    "totalCompensation": 1390000,
    "currency": "INR",
    "reportedAt": "2024-03-23T07:01:01.081Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_37lt07p",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Data Analyst 1",
    "yearsOfExperience": 15,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5700000,
    "stockPerYear": 4420000,
    "bonus": 1270000,
    "totalCompensation": 11390000,
    "currency": "INR",
    "reportedAt": "2024-06-12T08:49:26.090Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_kd6emf3",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Backend Engineer 2",
    "yearsOfExperience": 5,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2600000,
    "stockPerYear": 830000,
    "bonus": 400000,
    "totalCompensation": 3830000,
    "currency": "INR",
    "reportedAt": "2023-08-04T00:32:03.760Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_8zv5jox",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Engineering Manager 2",
    "yearsOfExperience": 16,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9150000,
    "stockPerYear": 3610000,
    "bonus": 2140000,
    "totalCompensation": 14900000,
    "currency": "INR",
    "reportedAt": "2023-04-11T17:09:13.861Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_wzd7nwu",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Frontend Engineer 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12800000,
    "stockPerYear": 5320000,
    "bonus": 1330000,
    "totalCompensation": 19450000,
    "currency": "INR",
    "reportedAt": "2024-09-27T09:31:49.006Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_qldpih5",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Data Analyst 2",
    "yearsOfExperience": 13,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 371000,
    "stockPerYear": 368000,
    "bonus": 45000,
    "totalCompensation": 784000,
    "currency": "USD",
    "reportedAt": "2024-09-22T10:23:36.873Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_adzti20",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Product Manager 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 700000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 700000,
    "currency": "INR",
    "reportedAt": "2023-04-02T15:36:47.121Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_1oc1lxy",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "ML Engineer 4",
    "yearsOfExperience": 6,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2000000,
    "stockPerYear": 1410000,
    "bonus": 180000,
    "totalCompensation": 3590000,
    "currency": "INR",
    "reportedAt": "2022-07-12T17:26:24.702Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_pw7q5xh",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Frontend Engineer 4",
    "yearsOfExperience": 16,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7400000,
    "stockPerYear": 3630000,
    "bonus": 920000,
    "totalCompensation": 11950000,
    "currency": "INR",
    "reportedAt": "2023-06-30T01:43:22.468Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_f1bcluq",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Data Scientist 4",
    "yearsOfExperience": 16,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 440000,
    "stockPerYear": 583000,
    "bonus": 89000,
    "totalCompensation": 1112000,
    "currency": "USD",
    "reportedAt": "2022-06-30T07:00:54.185Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_f9eqtdm",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Product Manager 1",
    "yearsOfExperience": 12,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 270000,
    "stockPerYear": 173000,
    "bonus": 82000,
    "totalCompensation": 525000,
    "currency": "USD",
    "reportedAt": "2022-03-10T21:30:19.108Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_zp4zuka",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Product Designer 1",
    "yearsOfExperience": 25,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 576000,
    "stockPerYear": 420000,
    "bonus": 114000,
    "totalCompensation": 1110000,
    "currency": "USD",
    "reportedAt": "2022-05-17T20:41:39.516Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_2l68109",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 2",
    "yearsOfExperience": 16,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12800000,
    "stockPerYear": 12510000,
    "bonus": 2690000,
    "totalCompensation": 28000000,
    "currency": "INR",
    "reportedAt": "2024-11-06T20:57:17.040Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_w85ntam",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 1",
    "yearsOfExperience": 19,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 14600000,
    "stockPerYear": 8650000,
    "bonus": 2800000,
    "totalCompensation": 26050000,
    "currency": "INR",
    "reportedAt": "2024-02-16T00:58:20.812Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_iqtxv1f",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Frontend Engineer 1",
    "yearsOfExperience": 18,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8000000,
    "stockPerYear": 7050000,
    "bonus": 1450000,
    "totalCompensation": 16500000,
    "currency": "INR",
    "reportedAt": "2022-04-12T12:36:46.488Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_42s0563",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 2",
    "yearsOfExperience": 15,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11400000,
    "stockPerYear": 5460000,
    "bonus": 720000,
    "totalCompensation": 17580000,
    "currency": "INR",
    "reportedAt": "2024-11-14T22:24:56.374Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_42hl298",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Backend Engineer 4",
    "yearsOfExperience": 24,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11600000,
    "stockPerYear": 3840000,
    "bonus": 2740000,
    "totalCompensation": 18180000,
    "currency": "INR",
    "reportedAt": "2023-01-30T11:30:16.597Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_jzdi9di",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Engineering Manager 1",
    "yearsOfExperience": 12,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5250000,
    "stockPerYear": 2600000,
    "bonus": 400000,
    "totalCompensation": 8250000,
    "currency": "INR",
    "reportedAt": "2022-02-20T12:33:04.669Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_pp0msqc",
    "company": {
      "name": "Wipro",
      "slug": "wipro",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "QA Engineer 1",
    "yearsOfExperience": 13,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5250000,
    "stockPerYear": 1180000,
    "bonus": 670000,
    "totalCompensation": 7100000,
    "currency": "INR",
    "reportedAt": "2023-08-25T04:28:13.530Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_9uyqidv",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Software Engineer 4",
    "yearsOfExperience": 13,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5400000,
    "stockPerYear": 1430000,
    "bonus": 1130000,
    "totalCompensation": 7960000,
    "currency": "INR",
    "reportedAt": "2024-01-27T10:08:49.201Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_7cp11yx",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Manager 4",
    "yearsOfExperience": 24,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 18000000,
    "stockPerYear": 5550000,
    "bonus": 3920000,
    "totalCompensation": 27470000,
    "currency": "INR",
    "reportedAt": "2023-01-09T17:04:34.165Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_oz4jcr4",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "ML Engineer 4",
    "yearsOfExperience": 5,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3200000,
    "stockPerYear": 2210000,
    "bonus": 310000,
    "totalCompensation": 5720000,
    "currency": "INR",
    "reportedAt": "2024-10-08T11:37:48.438Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_seiypqd",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Data Scientist 4",
    "yearsOfExperience": 20,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 16000000,
    "stockPerYear": 9520000,
    "bonus": 1990000,
    "totalCompensation": 27510000,
    "currency": "INR",
    "reportedAt": "2024-08-02T01:37:28.791Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_mpi1oou",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Engineering Manager 2",
    "yearsOfExperience": 15,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8200000,
    "stockPerYear": 2560000,
    "bonus": 1050000,
    "totalCompensation": 11810000,
    "currency": "INR",
    "reportedAt": "2023-02-15T07:01:23.776Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_l0s1ljl",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Backend Engineer 1",
    "yearsOfExperience": 6,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 177000,
    "stockPerYear": 293000,
    "bonus": 55000,
    "totalCompensation": 525000,
    "currency": "USD",
    "reportedAt": "2024-03-17T17:31:48.528Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_rxllhzo",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 3",
    "yearsOfExperience": 18,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 14000000,
    "stockPerYear": 12490000,
    "bonus": 930000,
    "totalCompensation": 27420000,
    "currency": "INR",
    "reportedAt": "2022-09-23T16:22:26.544Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_fmr40qg",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Frontend Engineer 1",
    "yearsOfExperience": 6,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3500000,
    "stockPerYear": 1390000,
    "bonus": 720000,
    "totalCompensation": 5610000,
    "currency": "INR",
    "reportedAt": "2023-09-04T02:17:26.489Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_smfp88y",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "ML Engineer 3",
    "yearsOfExperience": 7,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3800000,
    "stockPerYear": 3580000,
    "bonus": 250000,
    "totalCompensation": 7630000,
    "currency": "INR",
    "reportedAt": "2024-06-10T16:26:01.950Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_rzxft4o",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "ML Engineer 4",
    "yearsOfExperience": 12,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7200000,
    "stockPerYear": 6810000,
    "bonus": 1510000,
    "totalCompensation": 15520000,
    "currency": "INR",
    "reportedAt": "2023-06-25T00:42:51.185Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_a066gqk",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Frontend Engineer 4",
    "yearsOfExperience": 2,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1600000,
    "stockPerYear": 1230000,
    "bonus": 390000,
    "totalCompensation": 3220000,
    "currency": "INR",
    "reportedAt": "2022-10-27T16:58:07.812Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_p2hlk1a",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Data Analyst 4",
    "yearsOfExperience": 12,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5100000,
    "stockPerYear": 1530000,
    "bonus": 650000,
    "totalCompensation": 7280000,
    "currency": "INR",
    "reportedAt": "2022-01-08T01:02:47.776Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_lwrhb2g",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Engineering Manager 2",
    "yearsOfExperience": 14,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 4950000,
    "stockPerYear": 2830000,
    "bonus": 420000,
    "totalCompensation": 8200000,
    "currency": "INR",
    "reportedAt": "2022-03-10T01:03:47.016Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_2w8z5q0",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Data Analyst 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1700000,
    "stockPerYear": 380000,
    "bonus": 110000,
    "totalCompensation": 2190000,
    "currency": "INR",
    "reportedAt": "2024-07-13T10:56:34.454Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_sbz6uch",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Designer 4",
    "yearsOfExperience": 16,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 421000,
    "stockPerYear": 146000,
    "bonus": 43000,
    "totalCompensation": 610000,
    "currency": "USD",
    "reportedAt": "2023-05-16T20:30:04.627Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_yvlh8pu",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Data Scientist 3",
    "yearsOfExperience": 19,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 13600000,
    "stockPerYear": 12090000,
    "bonus": 1850000,
    "totalCompensation": 27540000,
    "currency": "INR",
    "reportedAt": "2022-03-30T20:37:47.396Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_n61rhb5",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "QA Engineer 2",
    "yearsOfExperience": 1,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1800000,
    "stockPerYear": 1210000,
    "bonus": 170000,
    "totalCompensation": 3180000,
    "currency": "INR",
    "reportedAt": "2022-07-29T11:31:39.668Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_xmqr897",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Product Manager 2",
    "yearsOfExperience": 2,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2100000,
    "stockPerYear": 890000,
    "bonus": 320000,
    "totalCompensation": 3310000,
    "currency": "INR",
    "reportedAt": "2022-07-11T13:30:30.404Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_zczhfb5",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 1",
    "yearsOfExperience": 15,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7200000,
    "stockPerYear": 7120000,
    "bonus": 580000,
    "totalCompensation": 14900000,
    "currency": "INR",
    "reportedAt": "2023-08-10T23:38:11.347Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_h72i8ds",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 2",
    "yearsOfExperience": 19,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8600000,
    "stockPerYear": 2220000,
    "bonus": 710000,
    "totalCompensation": 11530000,
    "currency": "INR",
    "reportedAt": "2024-05-19T11:15:19.587Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_089c98j",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "ML Engineer 4",
    "yearsOfExperience": 3,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2800000,
    "stockPerYear": 720000,
    "bonus": 550000,
    "totalCompensation": 4070000,
    "currency": "INR",
    "reportedAt": "2023-01-09T12:10:50.238Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_pmfnhhm",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Frontend Engineer 4",
    "yearsOfExperience": 0,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 400000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 400000,
    "currency": "INR",
    "reportedAt": "2022-08-09T06:11:15.326Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_25rbktr",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "ML Engineer 2",
    "yearsOfExperience": 20,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8800000,
    "stockPerYear": 6030000,
    "bonus": 790000,
    "totalCompensation": 15620000,
    "currency": "INR",
    "reportedAt": "2023-12-24T06:25:39.354Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_zjv0z34",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 1",
    "yearsOfExperience": 15,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 429000,
    "stockPerYear": 639000,
    "bonus": 90000,
    "totalCompensation": 1158000,
    "currency": "USD",
    "reportedAt": "2023-12-25T21:48:58.946Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_kwba63f",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Data Scientist 1",
    "yearsOfExperience": 19,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8800000,
    "stockPerYear": 4660000,
    "bonus": 1820000,
    "totalCompensation": 15280000,
    "currency": "INR",
    "reportedAt": "2022-06-26T03:32:46.658Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_jrl303z",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "SDE 1",
    "yearsOfExperience": 16,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 333000,
    "stockPerYear": 238000,
    "bonus": 87000,
    "totalCompensation": 658000,
    "currency": "USD",
    "reportedAt": "2023-05-16T08:06:09.235Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_vfg076c",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Backend Engineer 3",
    "yearsOfExperience": 0,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 600000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 600000,
    "currency": "INR",
    "reportedAt": "2022-09-04T14:54:42.893Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_il7wtdn",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Designer 2",
    "yearsOfExperience": 23,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 16000000,
    "stockPerYear": 10460000,
    "bonus": 1330000,
    "totalCompensation": 27790000,
    "currency": "INR",
    "reportedAt": "2022-12-10T15:46:46.795Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_48azsj3",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Backend Engineer 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9000000,
    "stockPerYear": 6810000,
    "bonus": 1210000,
    "totalCompensation": 17020000,
    "currency": "INR",
    "reportedAt": "2023-12-01T07:43:57.367Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_2pnma3z",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Backend Engineer 2",
    "yearsOfExperience": 7,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3200000,
    "stockPerYear": 1430000,
    "bonus": 560000,
    "totalCompensation": 5190000,
    "currency": "INR",
    "reportedAt": "2022-04-18T17:18:38.952Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_j7cnbp5",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Backend Engineer 2",
    "yearsOfExperience": 5,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2600000,
    "stockPerYear": 1980000,
    "bonus": 260000,
    "totalCompensation": 4840000,
    "currency": "INR",
    "reportedAt": "2023-06-28T11:22:54.351Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_74roef9",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Product Designer 2",
    "yearsOfExperience": 0,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 94000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 94000,
    "currency": "USD",
    "reportedAt": "2024-02-13T03:16:56.582Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_mmnjmhp",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Product Designer 2",
    "yearsOfExperience": 17,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12600000,
    "stockPerYear": 3800000,
    "bonus": 810000,
    "totalCompensation": 17210000,
    "currency": "INR",
    "reportedAt": "2024-01-01T15:52:11.370Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_wjele3g",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 4",
    "yearsOfExperience": 13,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10200000,
    "stockPerYear": 3730000,
    "bonus": 2470000,
    "totalCompensation": 16400000,
    "currency": "INR",
    "reportedAt": "2023-07-09T10:21:05.930Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_nr5rpyg",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "ML Engineer 1",
    "yearsOfExperience": 13,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7500000,
    "stockPerYear": 2860000,
    "bonus": 660000,
    "totalCompensation": 11020000,
    "currency": "INR",
    "reportedAt": "2022-02-22T13:50:42.376Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_95bk3k8",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Backend Engineer 1",
    "yearsOfExperience": 5,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3300000,
    "stockPerYear": 1960000,
    "bonus": 690000,
    "totalCompensation": 5950000,
    "currency": "INR",
    "reportedAt": "2022-04-13T01:59:26.806Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_lwtqduh",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Software Engineer 3",
    "yearsOfExperience": 23,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 17000000,
    "stockPerYear": 15300000,
    "bonus": 4230000,
    "totalCompensation": 36530000,
    "currency": "INR",
    "reportedAt": "2024-05-06T19:32:15.249Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_ef06p1z",
    "company": {
      "name": "Wipro",
      "slug": "wipro",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Data Scientist 2",
    "yearsOfExperience": 0,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1000000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 1000000,
    "currency": "INR",
    "reportedAt": "2023-10-01T03:43:21.061Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_fukp0rf",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "SDE 1",
    "yearsOfExperience": 2,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 100000,
    "stockPerYear": 94000,
    "bonus": 21000,
    "totalCompensation": 215000,
    "currency": "USD",
    "reportedAt": "2022-02-23T18:25:08.820Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_ayjqexm",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "DevOps 3",
    "yearsOfExperience": 7,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2100000,
    "stockPerYear": 1640000,
    "bonus": 330000,
    "totalCompensation": 4070000,
    "currency": "INR",
    "reportedAt": "2024-01-31T08:15:03.176Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_vwhrav1",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Backend Engineer 4",
    "yearsOfExperience": 0,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 400000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 400000,
    "currency": "INR",
    "reportedAt": "2023-06-14T22:05:43.553Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_nx9mqkd",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "QA Engineer 1",
    "yearsOfExperience": 14,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11000000,
    "stockPerYear": 7740000,
    "bonus": 1350000,
    "totalCompensation": 20090000,
    "currency": "INR",
    "reportedAt": "2022-02-07T18:26:53.321Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_5ks27zu",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Data Scientist 3",
    "yearsOfExperience": 9,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 272000,
    "stockPerYear": 415000,
    "bonus": 63000,
    "totalCompensation": 750000,
    "currency": "USD",
    "reportedAt": "2022-03-22T00:55:09.818Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_5jmjj4i",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "ML Engineer 1",
    "yearsOfExperience": 9,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 4350000,
    "stockPerYear": 1790000,
    "bonus": 670000,
    "totalCompensation": 6810000,
    "currency": "INR",
    "reportedAt": "2022-02-12T07:24:59.492Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_mv3k3uv",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Backend Engineer 4",
    "yearsOfExperience": 14,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5850000,
    "stockPerYear": 4050000,
    "bonus": 540000,
    "totalCompensation": 10440000,
    "currency": "INR",
    "reportedAt": "2023-01-20T22:22:16.348Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_gorxylb",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Backend Engineer 4",
    "yearsOfExperience": 24,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11400000,
    "stockPerYear": 8940000,
    "bonus": 1460000,
    "totalCompensation": 21800000,
    "currency": "INR",
    "reportedAt": "2024-09-17T10:48:03.735Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_hnh6qsa",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "ML Engineer 3",
    "yearsOfExperience": 0,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 85000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 85000,
    "currency": "USD",
    "reportedAt": "2024-08-09T13:10:16.721Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_0rklyj5",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Software Engineer 4",
    "yearsOfExperience": 7,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1800000,
    "stockPerYear": 1110000,
    "bonus": 330000,
    "totalCompensation": 3240000,
    "currency": "INR",
    "reportedAt": "2024-09-30T05:16:03.780Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_embpkl7",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Engineering Manager 4",
    "yearsOfExperience": 16,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 448000,
    "stockPerYear": 521000,
    "bonus": 80000,
    "totalCompensation": 1049000,
    "currency": "USD",
    "reportedAt": "2022-07-05T02:06:51.255Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_ztadkx3",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "QA Engineer 3",
    "yearsOfExperience": 1,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2100000,
    "stockPerYear": 1810000,
    "bonus": 190000,
    "totalCompensation": 4100000,
    "currency": "INR",
    "reportedAt": "2022-08-30T18:48:04.646Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_vk2aoj6",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Software Engineer 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1100000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 1100000,
    "currency": "INR",
    "reportedAt": "2023-03-14T13:59:29.670Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_s85a82v",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Frontend Engineer 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 410000,
    "stockPerYear": 360000,
    "bonus": 41000,
    "totalCompensation": 811000,
    "currency": "USD",
    "reportedAt": "2023-10-22T10:31:21.494Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_b7xqsag",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Engineering Manager 1",
    "yearsOfExperience": 13,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7350000,
    "stockPerYear": 3860000,
    "bonus": 1410000,
    "totalCompensation": 12620000,
    "currency": "INR",
    "reportedAt": "2022-11-21T18:34:31.668Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_yboxz4b",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Product Designer 3",
    "yearsOfExperience": 0,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 95000,
    "stockPerYear": 43000,
    "bonus": 22000,
    "totalCompensation": 160000,
    "currency": "USD",
    "reportedAt": "2024-05-23T08:39:32.396Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_7rnc22h",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "QA Engineer 3",
    "yearsOfExperience": 0,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 900000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 900000,
    "currency": "INR",
    "reportedAt": "2024-08-23T10:35:15.291Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_f3b3jmq",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Backend Engineer 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 83000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 83000,
    "currency": "USD",
    "reportedAt": "2022-05-10T07:20:15.024Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_bc5so67",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Product Manager 4",
    "yearsOfExperience": 6,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1900000,
    "stockPerYear": 1190000,
    "bonus": 410000,
    "totalCompensation": 3500000,
    "currency": "INR",
    "reportedAt": "2024-04-06T19:50:02.555Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_60q14p4",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "QA Engineer 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 800000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 800000,
    "currency": "INR",
    "reportedAt": "2022-03-26T14:29:45.555Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_lttakl2",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "ML Engineer 1",
    "yearsOfExperience": 2,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 129000,
    "stockPerYear": 106000,
    "bonus": 10000,
    "totalCompensation": 245000,
    "currency": "USD",
    "reportedAt": "2022-07-08T22:26:12.107Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_3h8emu9",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Product Manager 4",
    "yearsOfExperience": 4,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2900000,
    "stockPerYear": 1260000,
    "bonus": 460000,
    "totalCompensation": 4620000,
    "currency": "INR",
    "reportedAt": "2023-05-02T14:53:59.809Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_lrlgxuh",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 1",
    "yearsOfExperience": 17,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 13600000,
    "stockPerYear": 11720000,
    "bonus": 2830000,
    "totalCompensation": 28150000,
    "currency": "INR",
    "reportedAt": "2024-12-15T23:03:10.936Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_ahkidxe",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "DevOps 1",
    "yearsOfExperience": 2,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1300000,
    "stockPerYear": 0,
    "bonus": 90000,
    "totalCompensation": 1390000,
    "currency": "INR",
    "reportedAt": "2022-09-09T13:54:45.968Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_7p6g4qo",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Software Engineer 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1200000,
    "stockPerYear": 0,
    "bonus": 300000,
    "totalCompensation": 1500000,
    "currency": "INR",
    "reportedAt": "2022-04-09T04:40:06.367Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_dtqn7hi",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Backend Engineer 3",
    "yearsOfExperience": 8,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3700000,
    "stockPerYear": 2490000,
    "bonus": 720000,
    "totalCompensation": 6910000,
    "currency": "INR",
    "reportedAt": "2024-09-16T13:21:30.923Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_7apo7ir",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Engineering Manager 4",
    "yearsOfExperience": 12,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5400000,
    "stockPerYear": 3900000,
    "bonus": 460000,
    "totalCompensation": 9760000,
    "currency": "INR",
    "reportedAt": "2024-09-27T09:00:30.971Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_m1496n2",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Data Analyst 1",
    "yearsOfExperience": 16,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8600000,
    "stockPerYear": 8370000,
    "bonus": 1580000,
    "totalCompensation": 18550000,
    "currency": "INR",
    "reportedAt": "2023-05-29T11:34:11.900Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_ig66f01",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Data Analyst 4",
    "yearsOfExperience": 1,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2000000,
    "stockPerYear": 890000,
    "bonus": 430000,
    "totalCompensation": 3320000,
    "currency": "INR",
    "reportedAt": "2024-02-05T11:37:58.010Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_8qyxdk8",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Backend Engineer 4",
    "yearsOfExperience": 10,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 242000,
    "stockPerYear": 400000,
    "bonus": 18000,
    "totalCompensation": 660000,
    "currency": "USD",
    "reportedAt": "2024-05-23T13:25:45.311Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_t7e30ar",
    "company": {
      "name": "Wipro",
      "slug": "wipro",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Engineering Manager 4",
    "yearsOfExperience": 15,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5250000,
    "stockPerYear": 2060000,
    "bonus": 700000,
    "totalCompensation": 8010000,
    "currency": "INR",
    "reportedAt": "2024-10-28T14:36:42.601Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_ymlzmrw",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Data Scientist 4",
    "yearsOfExperience": 15,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 6000000,
    "stockPerYear": 3170000,
    "bonus": 710000,
    "totalCompensation": 9880000,
    "currency": "INR",
    "reportedAt": "2023-07-09T18:32:10.017Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_wisseml",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Frontend Engineer 2",
    "yearsOfExperience": 0,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 400000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 400000,
    "currency": "INR",
    "reportedAt": "2024-11-09T03:54:48.151Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_ssy16zg",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Backend Engineer 2",
    "yearsOfExperience": 1,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1600000,
    "stockPerYear": 1050000,
    "bonus": 230000,
    "totalCompensation": 2880000,
    "currency": "INR",
    "reportedAt": "2024-11-14T08:34:44.461Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_d8cotax",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Frontend Engineer 2",
    "yearsOfExperience": 23,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11000000,
    "stockPerYear": 4110000,
    "bonus": 2010000,
    "totalCompensation": 17120000,
    "currency": "INR",
    "reportedAt": "2023-02-18T05:57:41.372Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_ts4725y",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Data Analyst 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1200000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 1200000,
    "currency": "INR",
    "reportedAt": "2024-02-01T10:22:07.433Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_7jrywhp",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "ML Engineer 4",
    "yearsOfExperience": 18,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 429000,
    "stockPerYear": 669000,
    "bonus": 107000,
    "totalCompensation": 1205000,
    "currency": "USD",
    "reportedAt": "2024-01-18T18:25:14.273Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_9zarn9x",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Software Engineer 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5700000,
    "stockPerYear": 3870000,
    "bonus": 1270000,
    "totalCompensation": 10840000,
    "currency": "INR",
    "reportedAt": "2023-12-07T09:34:56.151Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_06iuqr5",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "ML Engineer 3",
    "yearsOfExperience": 21,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9800000,
    "stockPerYear": 6410000,
    "bonus": 2040000,
    "totalCompensation": 18250000,
    "currency": "INR",
    "reportedAt": "2024-04-10T15:13:17.563Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_mw83ha3",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Product Manager 3",
    "yearsOfExperience": 3,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 138000,
    "stockPerYear": 193000,
    "bonus": 41000,
    "totalCompensation": 372000,
    "currency": "USD",
    "reportedAt": "2022-05-07T01:36:13.491Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_7ujclbd",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Frontend Engineer 4",
    "yearsOfExperience": 12,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5100000,
    "stockPerYear": 4960000,
    "bonus": 690000,
    "totalCompensation": 10750000,
    "currency": "INR",
    "reportedAt": "2023-12-07T04:45:43.180Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_bjj6xz7",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Software Engineer 2",
    "yearsOfExperience": 11,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3900000,
    "stockPerYear": 1330000,
    "bonus": 740000,
    "totalCompensation": 5970000,
    "currency": "INR",
    "reportedAt": "2023-02-14T12:00:06.611Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_vojg4xu",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "QA Engineer 2",
    "yearsOfExperience": 0,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1100000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 1100000,
    "currency": "INR",
    "reportedAt": "2024-05-16T04:28:39.055Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_7yiy2a7",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Data Scientist 2",
    "yearsOfExperience": 16,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7400000,
    "stockPerYear": 4170000,
    "bonus": 530000,
    "totalCompensation": 12100000,
    "currency": "INR",
    "reportedAt": "2022-07-11T21:36:40.392Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_pzbjzmn",
    "company": {
      "name": "Wipro",
      "slug": "wipro",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "ML Engineer 2",
    "yearsOfExperience": 15,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5550000,
    "stockPerYear": 3340000,
    "bonus": 760000,
    "totalCompensation": 9650000,
    "currency": "INR",
    "reportedAt": "2024-06-18T21:11:04.699Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_t0uskpi",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "SDE 1",
    "yearsOfExperience": 4,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3200000,
    "stockPerYear": 2880000,
    "bonus": 410000,
    "totalCompensation": 6490000,
    "currency": "INR",
    "reportedAt": "2024-05-23T19:13:33.426Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_07ssv7h",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 1",
    "yearsOfExperience": 12,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10200000,
    "stockPerYear": 6340000,
    "bonus": 1320000,
    "totalCompensation": 17860000,
    "currency": "INR",
    "reportedAt": "2022-08-24T17:31:11.468Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_7ftcyt2",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "VP Engineering",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "VP Engineering 2",
    "yearsOfExperience": 21,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 15400000,
    "stockPerYear": 6420000,
    "bonus": 2900000,
    "totalCompensation": 24720000,
    "currency": "INR",
    "reportedAt": "2024-11-04T19:49:13.332Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_y0hwr3n",
    "company": {
      "name": "Wipro",
      "slug": "wipro",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 4",
    "yearsOfExperience": 21,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10400000,
    "stockPerYear": 7700000,
    "bonus": 1730000,
    "totalCompensation": 19830000,
    "currency": "INR",
    "reportedAt": "2022-09-15T04:09:40.782Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_fgc0sdg",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Software Engineer 4",
    "yearsOfExperience": 22,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 544000,
    "stockPerYear": 279000,
    "bonus": 47000,
    "totalCompensation": 870000,
    "currency": "USD",
    "reportedAt": "2023-10-07T13:14:34.039Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_1e38yue",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Product Manager 4",
    "yearsOfExperience": 5,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1700000,
    "stockPerYear": 950000,
    "bonus": 140000,
    "totalCompensation": 2790000,
    "currency": "INR",
    "reportedAt": "2023-09-15T12:49:25.812Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_i17z3km",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 2",
    "yearsOfExperience": 17,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7800000,
    "stockPerYear": 4080000,
    "bonus": 1280000,
    "totalCompensation": 13160000,
    "currency": "INR",
    "reportedAt": "2023-07-16T17:26:10.398Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_q5ensmz",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Data Scientist 2",
    "yearsOfExperience": 5,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2700000,
    "stockPerYear": 780000,
    "bonus": 580000,
    "totalCompensation": 4060000,
    "currency": "INR",
    "reportedAt": "2024-12-19T16:51:11.391Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_14egm4x",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Product Manager 2",
    "yearsOfExperience": 2,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1700000,
    "stockPerYear": 1050000,
    "bonus": 240000,
    "totalCompensation": 2990000,
    "currency": "INR",
    "reportedAt": "2024-03-18T19:48:03.617Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_pnakea2",
    "company": {
      "name": "Swiggy",
      "slug": "swiggy",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Product Designer 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5100000,
    "stockPerYear": 3820000,
    "bonus": 260000,
    "totalCompensation": 9180000,
    "currency": "INR",
    "reportedAt": "2022-10-11T20:16:39.650Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_snm31up",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "DevOps 3",
    "yearsOfExperience": 2,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2100000,
    "stockPerYear": 580000,
    "bonus": 220000,
    "totalCompensation": 2900000,
    "currency": "INR",
    "reportedAt": "2022-05-05T20:34:21.754Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_wfzzqhn",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Data Analyst 4",
    "yearsOfExperience": 8,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2700000,
    "stockPerYear": 1240000,
    "bonus": 280000,
    "totalCompensation": 4220000,
    "currency": "INR",
    "reportedAt": "2023-09-07T16:43:09.835Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_mssjng2",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "QA Engineer 4",
    "yearsOfExperience": 17,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 14000000,
    "stockPerYear": 3230000,
    "bonus": 2930000,
    "totalCompensation": 20160000,
    "currency": "INR",
    "reportedAt": "2022-08-21T10:16:54.525Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_1f37yxb",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Software Engineer 4",
    "yearsOfExperience": 11,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 5100000,
    "stockPerYear": 2130000,
    "bonus": 700000,
    "totalCompensation": 7930000,
    "currency": "INR",
    "reportedAt": "2022-03-17T09:03:52.567Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_im18bl9",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Data Analyst 4",
    "yearsOfExperience": 2,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 900000,
    "stockPerYear": 0,
    "bonus": 70000,
    "totalCompensation": 970000,
    "currency": "INR",
    "reportedAt": "2022-02-06T19:22:21.211Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_au97mzd",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "VP Engineering",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "VP Engineering 2",
    "yearsOfExperience": 21,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 485000,
    "stockPerYear": 554000,
    "bonus": 72000,
    "totalCompensation": 1111000,
    "currency": "USD",
    "reportedAt": "2024-10-13T13:15:51.924Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_ziy3618",
    "company": {
      "name": "Wipro",
      "slug": "wipro",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "ML Engineer 1",
    "yearsOfExperience": 10,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 4800000,
    "stockPerYear": 2680000,
    "bonus": 720000,
    "totalCompensation": 8200000,
    "currency": "INR",
    "reportedAt": "2024-12-06T10:01:31.100Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_jj9hit1",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 1",
    "yearsOfExperience": 23,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10200000,
    "stockPerYear": 2870000,
    "bonus": 1490000,
    "totalCompensation": 14560000,
    "currency": "INR",
    "reportedAt": "2022-10-25T11:55:38.926Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_yga8ydk",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 1",
    "yearsOfExperience": 25,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10800000,
    "stockPerYear": 8990000,
    "bonus": 930000,
    "totalCompensation": 20720000,
    "currency": "INR",
    "reportedAt": "2022-05-20T17:12:07.204Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_814j9a4",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Backend Engineer",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "Backend Engineer 3",
    "yearsOfExperience": 14,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7950000,
    "stockPerYear": 5710000,
    "bonus": 1130000,
    "totalCompensation": 14790000,
    "currency": "INR",
    "reportedAt": "2023-03-07T12:36:06.855Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_j6ikrrp",
    "company": {
      "name": "Netflix",
      "slug": "netflix",
      "industry": "Media & Entertainment",
      "size": "10,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 2",
    "yearsOfExperience": 17,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 426000,
    "stockPerYear": 696000,
    "bonus": 145000,
    "totalCompensation": 1267000,
    "currency": "USD",
    "reportedAt": "2023-04-23T03:05:56.845Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_mbrc0g8",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "ML Engineer 3",
    "yearsOfExperience": 0,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1000000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 1000000,
    "currency": "INR",
    "reportedAt": "2023-08-20T20:42:41.158Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_u15y2zy",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Software Engineer 1",
    "yearsOfExperience": 16,
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7600000,
    "stockPerYear": 7550000,
    "bonus": 830000,
    "totalCompensation": 15980000,
    "currency": "INR",
    "reportedAt": "2022-03-06T13:04:58.082Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_x7ha6ac",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Product Designer 1",
    "yearsOfExperience": 5,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2900000,
    "stockPerYear": 1420000,
    "bonus": 490000,
    "totalCompensation": 4810000,
    "currency": "INR",
    "reportedAt": "2024-11-01T02:12:46.552Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_gi8vfq5",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Product Designer 2",
    "yearsOfExperience": 5,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 130000,
    "stockPerYear": 48000,
    "bonus": 32000,
    "totalCompensation": 210000,
    "currency": "USD",
    "reportedAt": "2024-06-16T11:51:50.102Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_khml7lp",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 1",
    "yearsOfExperience": 15,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 13000000,
    "stockPerYear": 11820000,
    "bonus": 860000,
    "totalCompensation": 25680000,
    "currency": "INR",
    "reportedAt": "2023-07-24T21:01:39.137Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_smhtfm4",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 1",
    "yearsOfExperience": 21,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 16000000,
    "stockPerYear": 13630000,
    "bonus": 1510000,
    "totalCompensation": 31140000,
    "currency": "INR",
    "reportedAt": "2022-12-30T22:30:57.485Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_ymydat8",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 1",
    "yearsOfExperience": 23,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10600000,
    "stockPerYear": 3610000,
    "bonus": 610000,
    "totalCompensation": 14820000,
    "currency": "INR",
    "reportedAt": "2022-02-07T00:27:25.457Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_9yh9h2e",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Product Manager 3",
    "yearsOfExperience": 22,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9800000,
    "stockPerYear": 2080000,
    "bonus": 1610000,
    "totalCompensation": 13490000,
    "currency": "INR",
    "reportedAt": "2023-08-05T16:05:36.732Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_x03x1pz",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Product Designer 3",
    "yearsOfExperience": 3,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1000000,
    "stockPerYear": 0,
    "bonus": 160000,
    "totalCompensation": 1160000,
    "currency": "INR",
    "reportedAt": "2023-12-11T18:53:57.572Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_93lvmq7",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "VP Engineering",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "VP Engineering 2",
    "yearsOfExperience": 20,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8800000,
    "stockPerYear": 3580000,
    "bonus": 1080000,
    "totalCompensation": 13460000,
    "currency": "INR",
    "reportedAt": "2024-06-29T01:19:48.636Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_mp2boou",
    "company": {
      "name": "Infosys",
      "slug": "infosys",
      "industry": "Consulting",
      "size": "100,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Product Manager 4",
    "yearsOfExperience": 20,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9000000,
    "stockPerYear": 6150000,
    "bonus": 1500000,
    "totalCompensation": 16650000,
    "currency": "INR",
    "reportedAt": "2024-12-22T18:16:00.596Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_r44m3c7",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "DevOps 2",
    "yearsOfExperience": 12,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 8250000,
    "stockPerYear": 3750000,
    "bonus": 1130000,
    "totalCompensation": 13130000,
    "currency": "INR",
    "reportedAt": "2024-09-10T01:49:36.567Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_5bfxrih",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 2",
    "yearsOfExperience": 21,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 504000,
    "stockPerYear": 486000,
    "bonus": 160000,
    "totalCompensation": 1150000,
    "currency": "USD",
    "reportedAt": "2023-03-04T08:01:49.680Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_ug6yhbb",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 2",
    "yearsOfExperience": 13,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11800000,
    "stockPerYear": 11480000,
    "bonus": 2540000,
    "totalCompensation": 25820000,
    "currency": "INR",
    "reportedAt": "2024-02-08T06:23:40.310Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_vf2rzig",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 1",
    "yearsOfExperience": 13,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 381000,
    "stockPerYear": 222000,
    "bonus": 28000,
    "totalCompensation": 631000,
    "currency": "USD",
    "reportedAt": "2023-07-06T04:16:38.341Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_dz57l9f",
    "company": {
      "name": "Uber",
      "slug": "uber",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Product Manager",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "Product Manager 3",
    "yearsOfExperience": 15,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 13000000,
    "stockPerYear": 10540000,
    "bonus": 1330000,
    "totalCompensation": 24870000,
    "currency": "INR",
    "reportedAt": "2023-07-26T07:23:46.923Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_e39bqs0",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "SDE 2",
    "yearsOfExperience": 15,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12400000,
    "stockPerYear": 4760000,
    "bonus": 2010000,
    "totalCompensation": 19170000,
    "currency": "INR",
    "reportedAt": "2024-02-07T19:33:00.242Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_0hhqa2q",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "SDE",
    "normalizedLevel": NormalizedLevel.PRINCIPAL,
    "rawTitle": "SDE 2",
    "yearsOfExperience": 16,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 6300000,
    "stockPerYear": 3110000,
    "bonus": 1510000,
    "totalCompensation": 10920000,
    "currency": "INR",
    "reportedAt": "2023-06-16T05:13:08.287Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_xque8xl",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "DevOps 4",
    "yearsOfExperience": 8,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3300000,
    "stockPerYear": 1270000,
    "bonus": 380000,
    "totalCompensation": 4950000,
    "currency": "INR",
    "reportedAt": "2024-08-01T20:31:58.573Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_7m2exgg",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Data Scientist 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 500000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 500000,
    "currency": "INR",
    "reportedAt": "2023-07-30T06:45:55.693Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_1ffcb8j",
    "company": {
      "name": "Razorpay",
      "slug": "razorpay",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Data Analyst 1",
    "yearsOfExperience": 22,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10400000,
    "stockPerYear": 3920000,
    "bonus": 2440000,
    "totalCompensation": 16760000,
    "currency": "INR",
    "reportedAt": "2023-01-01T10:46:28.394Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_8ka2i0c",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "ML Engineer 4",
    "yearsOfExperience": 0,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 400000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 400000,
    "currency": "INR",
    "reportedAt": "2022-12-29T03:44:01.498Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_lq05osr",
    "company": {
      "name": "Stripe",
      "slug": "stripe",
      "industry": "Finance",
      "size": "5,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Frontend Engineer 4",
    "yearsOfExperience": 2,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2600000,
    "stockPerYear": 1550000,
    "bonus": 610000,
    "totalCompensation": 4760000,
    "currency": "INR",
    "reportedAt": "2023-06-14T17:59:48.976Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_tej68m5",
    "company": {
      "name": "Microsoft",
      "slug": "microsoft",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Data Analyst 1",
    "yearsOfExperience": 18,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12800000,
    "stockPerYear": 7380000,
    "bonus": 3150000,
    "totalCompensation": 23330000,
    "currency": "INR",
    "reportedAt": "2024-09-25T12:33:03.064Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_f48lqi6",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "QA Engineer 4",
    "yearsOfExperience": 15,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 368000,
    "stockPerYear": 125000,
    "bonus": 30000,
    "totalCompensation": 523000,
    "currency": "USD",
    "reportedAt": "2022-03-07T01:41:35.935Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_xw2cmqi",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Product Designer 2",
    "yearsOfExperience": 5,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2900000,
    "stockPerYear": 2610000,
    "bonus": 450000,
    "totalCompensation": 5960000,
    "currency": "INR",
    "reportedAt": "2023-01-07T16:03:18.322Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_57z44dz",
    "company": {
      "name": "Goldman Sachs",
      "slug": "goldman-sachs",
      "industry": "Finance",
      "size": "10,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Engineering Manager 2",
    "yearsOfExperience": 12,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 7950000,
    "stockPerYear": 1780000,
    "bonus": 1640000,
    "totalCompensation": 11370000,
    "currency": "INR",
    "reportedAt": "2022-05-23T01:44:02.715Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_4nwyxnl",
    "company": {
      "name": "CRED",
      "slug": "cred",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 2",
    "yearsOfExperience": 21,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9200000,
    "stockPerYear": 8540000,
    "bonus": 1070000,
    "totalCompensation": 18810000,
    "currency": "INR",
    "reportedAt": "2022-01-25T11:34:35.159Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_mpu6f13",
    "company": {
      "name": "Google",
      "slug": "google",
      "industry": "Technology",
      "size": "100,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "QA Engineer 3",
    "yearsOfExperience": 0,
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 87000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 87000,
    "currency": "USD",
    "reportedAt": "2024-04-04T11:02:38.667Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_8jallrs",
    "company": {
      "name": "McKinsey & Company",
      "slug": "mckinsey",
      "industry": "Consulting",
      "size": "10,000+"
    },
    "role": "CTO",
    "normalizedLevel": NormalizedLevel.EXEC,
    "rawTitle": "CTO 4",
    "yearsOfExperience": 16,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 13000000,
    "stockPerYear": 8970000,
    "bonus": 880000,
    "totalCompensation": 22850000,
    "currency": "INR",
    "reportedAt": "2022-08-12T05:17:08.712Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_tupueg7",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "QA Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "QA Engineer 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 900000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 900000,
    "currency": "INR",
    "reportedAt": "2022-08-16T10:25:36.916Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_39ctehk",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "DevOps 1",
    "yearsOfExperience": 5,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 2900000,
    "stockPerYear": 1430000,
    "bonus": 200000,
    "totalCompensation": 4530000,
    "currency": "INR",
    "reportedAt": "2022-10-17T23:37:14.671Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_arx84qh",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 1",
    "yearsOfExperience": 15,
    "location": {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 12200000,
    "stockPerYear": 12060000,
    "bonus": 1860000,
    "totalCompensation": 26120000,
    "currency": "INR",
    "reportedAt": "2024-02-28T19:43:24.351Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_wb2myj7",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "ML Engineer",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "ML Engineer 3",
    "yearsOfExperience": 16,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 13600000,
    "stockPerYear": 12200000,
    "bonus": 1130000,
    "totalCompensation": 26930000,
    "currency": "INR",
    "reportedAt": "2023-07-02T16:51:19.412Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_wrfa3ud",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "DevOps 2",
    "yearsOfExperience": 21,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 16600000,
    "stockPerYear": 6030000,
    "bonus": 950000,
    "totalCompensation": 23580000,
    "currency": "INR",
    "reportedAt": "2023-04-03T22:57:01.204Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_vouapa0",
    "company": {
      "name": "Adobe",
      "slug": "adobe",
      "industry": "Technology",
      "size": "10,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.SENIOR,
    "rawTitle": "Software Engineer 1",
    "yearsOfExperience": 8,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 3700000,
    "stockPerYear": 1070000,
    "bonus": 650000,
    "totalCompensation": 5420000,
    "currency": "INR",
    "reportedAt": "2024-12-14T03:01:34.541Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_097fy1b",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.INTERN,
    "rawTitle": "Frontend Engineer 4",
    "yearsOfExperience": 0,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 400000,
    "stockPerYear": 0,
    "bonus": 0,
    "totalCompensation": 400000,
    "currency": "INR",
    "reportedAt": "2023-06-17T16:23:56.595Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_gcjcfld",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Data Scientist 2",
    "yearsOfExperience": 3,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1600000,
    "stockPerYear": 0,
    "bonus": 340000,
    "totalCompensation": 1940000,
    "currency": "INR",
    "reportedAt": "2023-03-18T10:17:17.466Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_an5l81t",
    "company": {
      "name": "Atlassian",
      "slug": "atlassian",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Data Analyst",
    "normalizedLevel": NormalizedLevel.STAFF,
    "rawTitle": "Data Analyst 2",
    "yearsOfExperience": 8,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "Global",
      "region": "Global"
    },
    "baseSalary": 234000,
    "stockPerYear": 309000,
    "bonus": 23000,
    "totalCompensation": 566000,
    "currency": "USD",
    "reportedAt": "2023-12-06T15:48:38.778Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Great WLB"
    ]
  },
  {
    "id": "rec_e3sb9cp",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Software Engineer 2",
    "yearsOfExperience": 0,
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "United States",
      "region": "North America"
    },
    "baseSalary": 85000,
    "stockPerYear": 135000,
    "bonus": 10000,
    "totalCompensation": 230000,
    "currency": "USD",
    "reportedAt": "2022-11-08T13:10:48.335Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Hybrid",
      "Sign-on Bonus"
    ]
  },
  {
    "id": "rec_nbhymla",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Director of Engineering",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Director of Engineering 4",
    "yearsOfExperience": 12,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 11200000,
    "stockPerYear": 8210000,
    "bonus": 2530000,
    "totalCompensation": 21940000,
    "currency": "INR",
    "reportedAt": "2024-06-06T02:48:18.394Z",
    "verified": false,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_ruojvow",
    "company": {
      "name": "Zomato",
      "slug": "zomato",
      "industry": "Technology",
      "size": "5,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Data Scientist 1",
    "yearsOfExperience": 20,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 9200000,
    "stockPerYear": 8360000,
    "bonus": 590000,
    "totalCompensation": 18150000,
    "currency": "INR",
    "reportedAt": "2024-12-28T19:10:10.224Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_wjgb7v3",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Software Engineer",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "Software Engineer 1",
    "yearsOfExperience": 2,
    "location": {
      "city": "Delhi NCR",
      "state": "Delhi",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 900000,
    "stockPerYear": 0,
    "bonus": 150000,
    "totalCompensation": 1050000,
    "currency": "INR",
    "reportedAt": "2022-05-30T13:39:59.566Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Remote",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_mo0h0sn",
    "company": {
      "name": "Flipkart",
      "slug": "flipkart",
      "industry": "E-commerce",
      "size": "10,000+"
    },
    "role": "DevOps",
    "normalizedLevel": NormalizedLevel.MID,
    "rawTitle": "DevOps 3",
    "yearsOfExperience": 5,
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1700000,
    "stockPerYear": 650000,
    "bonus": 170000,
    "totalCompensation": 2520000,
    "currency": "INR",
    "reportedAt": "2024-02-19T09:10:01.259Z",
    "verified": false,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
  {
    "id": "rec_o4l281o",
    "company": {
      "name": "Meta",
      "slug": "meta",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Engineering Manager",
    "normalizedLevel": NormalizedLevel.DIRECTOR,
    "rawTitle": "Engineering Manager 4",
    "yearsOfExperience": 16,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 13600000,
    "stockPerYear": 5560000,
    "bonus": 1070000,
    "totalCompensation": 20230000,
    "currency": "INR",
    "reportedAt": "2023-06-25T01:19:49.968Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "Hybrid",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_65us73h",
    "company": {
      "name": "PhonePe",
      "slug": "phonepe",
      "industry": "Finance",
      "size": "1,000+"
    },
    "role": "Product Designer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Product Designer 3",
    "yearsOfExperience": 19,
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 10000000,
    "stockPerYear": 9580000,
    "bonus": 1600000,
    "totalCompensation": 21180000,
    "currency": "INR",
    "reportedAt": "2022-05-19T01:26:20.411Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Great WLB"
    ]
  },
  {
    "id": "rec_o6meoay",
    "company": {
      "name": "Salesforce",
      "slug": "salesforce",
      "industry": "Technology",
      "size": "50,000+"
    },
    "role": "Frontend Engineer",
    "normalizedLevel": NormalizedLevel.VP,
    "rawTitle": "Frontend Engineer 2",
    "yearsOfExperience": 20,
    "location": {
      "city": "Remote",
      "state": "",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 15200000,
    "stockPerYear": 3080000,
    "bonus": 1510000,
    "totalCompensation": 19790000,
    "currency": "INR",
    "reportedAt": "2024-07-24T03:48:11.306Z",
    "verified": true,
    "dataSource": "W2 / Form 16",
    "tags": [
      "On-site",
      "Stock Growth"
    ]
  },
  {
    "id": "rec_wwcw79n",
    "company": {
      "name": "Amazon",
      "slug": "amazon",
      "industry": "E-commerce",
      "size": "100,000+"
    },
    "role": "Data Scientist",
    "normalizedLevel": NormalizedLevel.JUNIOR,
    "rawTitle": "Data Scientist 1",
    "yearsOfExperience": 0,
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "region": "Asia Pacific"
    },
    "baseSalary": 1000000,
    "stockPerYear": 420000,
    "bonus": 130000,
    "totalCompensation": 1550000,
    "currency": "INR",
    "reportedAt": "2023-07-01T15:32:30.850Z",
    "verified": true,
    "dataSource": "Offer Letter",
    "tags": [
      "Remote",
      "Great WLB"
    ]
  },
];

// Helper Functions
export function getSalariesByCompany(slug: string): CompensationRecord[] {
  return MOCK_SALARIES.filter(s => s.company.slug === slug);
}

export function getSalariesByLevel(level: NormalizedLevel): CompensationRecord[] {
  return MOCK_SALARIES.filter(s => s.normalizedLevel === level);
}

export function getPercentile(records: CompensationRecord[], field: keyof CompensationRecord, pct: number): number {
  if (records.length === 0) return 0;
  const sorted = [...records]
    .map(r => r[field] as number)
    .sort((a, b) => a - b);
  const index = Math.max(0, Math.min(sorted.length - 1, Math.ceil((pct / 100) * sorted.length) - 1));
  return sorted[index] || 0;
}

export function getCompanyProfile(slug: string): CompanyProfile | null {
  const companyData = MOCK_COMPANIES.find(c => c.slug === slug);
  if (!companyData) return null;

  const salaries = getSalariesByCompany(slug);
  
  const levelDist: Record<string, number> = {};
  const roleDist: Record<string, number> = {};
  
  salaries.forEach(s => {
    levelDist[s.normalizedLevel] = (levelDist[s.normalizedLevel] || 0) + 1;
    roleDist[s.role] = (roleDist[s.role] || 0) + 1;
  });

  return {
    id: companyData.slug,
    name: companyData.name,
    slug: companyData.slug,
    logo: companyData.logo,
    industry: companyData.industry,
    medianBase: getPercentile(salaries, 'baseSalary', 50),
    medianTotal: getPercentile(salaries, 'totalCompensation', 50),
    p25Total: getPercentile(salaries, 'totalCompensation', 25),
    p75Total: getPercentile(salaries, 'totalCompensation', 75),
    p90Total: getPercentile(salaries, 'totalCompensation', 90),
    dataPointCount: salaries.length,
    levelDistribution: levelDist as Record<NormalizedLevel, number>,
    roleDistribution: roleDist
  };
}
