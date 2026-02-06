import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PreviousYearPaper {
    id: bigint;
    url: string;
    subject: string;
    year: bigint;
    examName: string;
}
export interface UserProfile {
    name: string;
}
export interface StudyMaterial {
    id: bigint;
    url: string;
    title: string;
    subject: string;
    contentType: ContentType;
}
export enum ContentType {
    Course = "Course",
    VideoLecture = "VideoLecture",
    Book = "Book",
    Music = "Music",
    Audio = "Audio",
    PdfBook = "PdfBook"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPreviousYearPaper(year: bigint, subject: string, examName: string, url: string): Promise<bigint>;
    addStudyMaterial(title: string, subject: string, contentType: ContentType, url: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deletePreviousYearPaper(id: bigint): Promise<void>;
    deleteStudyMaterial(id: bigint): Promise<void>;
    getAllPreviousYearPapers(): Promise<Array<PreviousYearPaper>>;
    getAllStudyMaterials(): Promise<Array<StudyMaterial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPreviousYearPaperById(id: bigint): Promise<PreviousYearPaper | null>;
    getPreviousYearPapersByExam(examName: string): Promise<Array<PreviousYearPaper>>;
    getPreviousYearPapersBySubject(subject: string): Promise<Array<PreviousYearPaper>>;
    getStudyMaterialById(id: bigint): Promise<StudyMaterial | null>;
    getStudyMaterialsBySubject(subject: string): Promise<Array<StudyMaterial>>;
    getStudyMaterialsByType(contentType: ContentType): Promise<Array<StudyMaterial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
