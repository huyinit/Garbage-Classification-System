// import { AnyAction } from "redux";
// import { Epic } from "redux-observable";
// import { RootState } from "redux/root.reducer";
// import { ThemePalette } from "theme";
// import { IconName } from "./define-icon";

// export type RootEpic = Epic<AnyAction, AnyAction, RootState>;
export interface SystemConfig {
    protocol: 'http' | 'https';
    hostIdentity: string;
    hostMailService: string,
    hostMeetings: string,
    hostMember: string,
    hostTask: string,
}
export interface RouterItem {
    path: string;
    component: React.ComponentClass | React.FunctionComponent;
    noExact?: boolean;
    isPrivate?: boolean;
}

export interface User {
    userName: string;
    email: string;
    id: string;
    roles: string;
    client_id: string,
    expires_in: string
}
export interface Login {
    loginName: string;
    password: string;
    remember: boolean
}
export interface ForgotType {
    email: string;
}
export interface UserResponse {
    amr: string[],
    aud: string,
    auth_time: number,
    client_id: string,
    exp: number,
    iat: number,
    idp: string,
    iss: string,
    nbf: number,
    profile: User,
    role: string,
    scope: string[],
    sub: string
}

// export type ColorCustom = keyof ThemePalette;
export type Size = "default" | "mini" | "small" | "medium" | "big" | "large";
type RotateDeg = 0 | 45 | 90 | 135 | 180 | 225 | 270;
export type Placement =
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom";

export interface TooltipPropsIcon {
    title: string;
    placement?: Placement;
}
// export interface PropsIcon extends Props {
//     name?: IconName | string;
//     colorSvg?: ColorCustom;
//     hexColor?: string;
//     svgSize?: Size;
//     rotateDeg?: RotateDeg;
//     tooltip?: TooltipPropsIcon;
// }
export enum KeyCode {
    num0 = "0",
    num1 = "1",
    num2 = "2",
    num3 = "3",
    num4 = "4",
    num5 = "5",
    num6 = "6",
    num7 = "7",
    num8 = "8",
    num9 = "9",
    F1 = "F1",
    F5 = "F5",
    F12 = "F12",
    escape = "Escape",
    enter = "Enter",
    equals = "=",
    add = "+",
    p = "p",
    P = "P",
    f = "f",
    F = "F",
    g = "g",
    G = "G",
    a = "a",
    A = "A",
    z = "z",
    Z = "Z",
    y = "y",
    Y = "Y",
    s = "s",
    S = "S",
    m = "m",
    M = "M",
    n = "n",
    N = "N",
    h = "h",
    H = "H",
    o = "o",
    O = "O",
    c = "c",
    C = "C",
    w = "w",
    W = "W",
    v = "v",

    V = "V",
    digit0 = "0",
    subtract = "-",
    minus = "_",
    pageUp = "PageUp",
    pageDown = "PageDown",
    arrowUp = "ArrowUp",
    arrowDown = "ArrowDown",
    arrowLeft = "ArrowLeft",
    arrowRight = "ArrowRight",
    home = "Home",
    end = "End",
    delete = "Delete",
    BackQuote = "Backquote",
    backQuote = "`",
    shift = "Shift",
}
// export interface ICardHotel {
//     thumbnail: string;
//     name: string;
//     location: string;
//     reservations: number;
//     hotelId: string;
// }
export interface ICardHotel {
    id: string;
    name: string;
    location: string;
}

// Khi cập nhận NavbarType thì phải cập nhập lại ArrayNavbar;
export type NavbarType =
    | "dashboard"
    | "booking"
    | "front-desk"
    | "cashier"
    | "channel"
    | "end-of-day"
    | "report"
    | "tools"
    | "miscellaneous"
    | 'room-management'
//| "search";
export type LanguageType = "en" | "vi";
export const ArrayNavbar = [
    "dashboard",
    "booking",
    "front-desk",
    "cashier",
    "channel",
    "end-of-day",
    "report",
    "tools",
    "room-management",
    "miscellaneous"
    //"search",
];
export interface IHotel {
    hotelName: string;
    hotelId: string;
    businessDate: string;
    lastNightAudit: string,
    organizationId?: string
}
export interface Attendee {
    id: string,
    name: string,
    email: string,
}

export interface Color {
    id: string,
    color: string,
    bgColor: string,
    dragBgColor: string,
    borderColor: string
}
export interface Calendar {
    id: string,
    name: string
}

export interface Role {
    id: string,
    name: string
}

export interface Paging{
    offset: number,
    size: number
}

export interface MemberMeeting {
    id: string
    attendeeID: string,
    meetingID: string,
    roleID: string
}

export interface GetAllMemberReq extends Paging{
    startTime: Date,
    endTime: Date
}

export interface GetAllMembersWithRoleReq extends Paging{

}
export interface GetAllTaskReq extends Paging{
    name?: string
}

export interface CompartmentData{
    ID_khoangrac: string;
    NhanRac: string;
    KhoiLuong: number;
    AnhRac: string[]

}

export interface BinData{
    ID_thungrac: string;
    ViTriThungRac: string;
    Khoangrac: CompartmentData[];
}

export interface GarbageQuantity{
    KhoiLuong: number,
    NhanRac: string
}
export interface BarChartData{
    Ngay: string;
    Rac: GarbageQuantity[]
}

export interface GetImageResponse{
    ID_khoangrac: string;
    AnhRac: string[];
    NhanRac: string;
}