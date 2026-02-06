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
export interface DailyPollutionEntry {
    id: bigint;
    day: bigint;
    recommendations: string;
    pollutionSource: string;
    airQuality: string;
}
export interface StudyMaterial {
    id: bigint;
    url: string;
    title: string;
    subject: string;
    contentType: ContentType;
}
export interface DailyTestSeriesEntry {
    id: bigint;
    day: bigint;
    subject: string;
    testName: string;
    description: string;
    questionsUrl: string;
    videoLectureUrl: string;
    answersUrl: string;
}
export interface UserProfile {
    name: string;
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
    addDailyPollutionEntry(day: bigint, airQuality: string, pollutionSource: string, recommendations: string): Promise<bigint>;
    addPreviousYearPaper(year: bigint, subject: string, examName: string, url: string): Promise<bigint>;
    addStudyMaterial(title: string, subject: string, contentType: ContentType, url: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteDailyPollutionEntry(id: bigint): Promise<void>;
    deletePreviousYearPaper(id: bigint): Promise<void>;
    deleteStudyMaterial(id: bigint): Promise<void>;
    getAllDailyPollutionEntries(): Promise<Array<DailyPollutionEntry>>;
    getAllDailyTestSeries(): Promise<Array<DailyTestSeriesEntry>>;
    getAllPreviousYearPapers(): Promise<Array<PreviousYearPaper>>;
    getAllStudyMaterials(): Promise<Array<StudyMaterial>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDailyPollutionByDay(day: bigint): Promise<Array<DailyPollutionEntry>>;
    getDailyTestSeriesByDay(day: bigint): Promise<Array<DailyTestSeriesEntry>>;
    getDailyTestSeriesBySubject(subject: string): Promise<Array<DailyTestSeriesEntry>>;
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
