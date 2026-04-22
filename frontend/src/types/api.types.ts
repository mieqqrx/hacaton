export interface AuthResponse {
    token: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
}

export type UserRole = "User" | "Veteran" | "Admin";
export type AnnouncementType = "NeedHelp" | "OfferHelp";
export type ApplicationStatus = "Pending" | "Approved" | "Rejected";

export interface DashboardStats {
    activeMeetings: number;
    needsHelp: number;
    onlineCommunity: number;
}

export interface ApplicationDto {
    id: number;
    announcementTitle: string;
    announcementType: string;
    appliedAt: string;
    status: ApplicationStatus;
    responderName?: string; 
    responderRole?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}