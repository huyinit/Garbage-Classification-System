// import { DataForeservation } from "./define-api-booking";

export interface ResponseDeparment{
    id: number,
    tingId: string,
    dateOfBirth:string,
    departmentId: number,
    startDate: string,
    endDate: string,
    firstName: string,
    middleName: string,
    lastName: string,
    gender: string,
    homeTown: string,
    identity: string,
    maritalStatus: string,
    nationality: string,
    picture: string,
    status: number,
    mood: string,
    contactDetail: {
      employeeId: number,
      mask: number,
      addressStreet1: string,
      addressStreet2: string,
      city: string,
      country: string,
      homePhone: string,
      mobile: string,
      otherEmail: string,
      workEmail: string,
      workPhone: string,
      zipCode: string
    },
    companies: [
        number
    ],
    jobs: [
      {
        id: number,
        employeeId: number,
        categoryId: number,
        startDate: string,
        endDate: string,
        location: string,
        salary: number,
        specification: string,
        status: number,
        supervisorId: number,
        titleId: number
      }
    ]
  }

// export interface ResponseListHotel {
//     id: number,
//     name: string,
//     location: string,
//     note: string,
//     hotline: string,
//     managerId: string,
//     autoId: string | number |null
//     createDate: string,
//     dataForeservation: DataForeservation | null,
//     dbname: string |null,
//     ghiChu: string,
//     guid: string,
//     hotelName: string,
//     ipaddress: string | number | null,
//     isDeleted: boolean,
//     issDbname: string | null,
//     issIpaddress: string | null,
//     ma: string,
//     ngayBatDau: string | null,
//     ngayKetThuc: string |null,
//     parent: string |null,
//     parentGuid: string | null,
//     sequency: string |null,
//     userId: string |null,
//     company: {
//         id: number,
//         mask: number,
//         alias: string,
//         fullName: string,
//         logo: string,
//         note: string,
//         address: string,
//         registerDate: Date,
//         activeDate: Date,
//         outDate: Date
//     },
//     buildingBlocks: [
//         {
//             id: number,
//             operationCenterId: number,
//             name: string,
//             note: string
//         }
//     ],
//     departments: [
//         {
//             id: number,
//             name: string,
//             note: string,
//             operationCenterId: number,
//             operationCenterName: string,
//             nameEN: string
//         }
//     ],
//     jobTitles: [
//         {
//             id: number,
//             desc: string,
//             name: string,
//             nameEN: string,
//             companyId: number
//         }
//     ],
//     jobCategories: [
//         {
//             id: number,
//             desc: string,
//             name: string,
//             companyId: number,
//             departmentId: number,
//             nameEN: string
//         }
//     ]

// }
export interface ResponseLogin {
    errorCode: number;
    msg: string;
    token: string;
    setting: unknown;
    info: {
        id: string;
        userName: string;
        email: string;
        phoneNumber: string;
        roles: string[];
    };
}
export interface NewResponseLogin {
    // error: string;
    // msg: string;
    accessToken: string;
    // setting: unknown;
    // scope: string;
    // token_type: string;
    // expires_in: number;
    // refresh_token: string;
    data: {
        id: string;
        // userName: string;
        email: string;
        // phoneNumber: string;
        // roles: string[];
    };
}

export interface LoginRequest{
    account: string,
    password: string,
    remember: boolean,
}

export interface IUser{
    id: string,
    email: string,
}

export interface RegisterRequest{
    account: string,
    password: string,
    confirmPassword: string
}