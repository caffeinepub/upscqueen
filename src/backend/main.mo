import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  type StudyMaterial = {
    id : Nat;
    title : Text;
    subject : Text;
    contentType : ContentType;
    url : Text;
  };

  type PreviousYearPaper = {
    id : Nat;
    year : Nat;
    subject : Text;
    examName : Text;
    url : Text;
  };

  type ContentType = {
    #VideoLecture;
    #PdfBook;
    #Music;
    #Course;
    #Book;
    #Audio;
  };

  let studyMaterialStore = Map.empty<Nat, StudyMaterial>();
  let previousYearPaperStore = Map.empty<Nat, PreviousYearPaper>();
  var nextStudyMaterialId = 0;
  var nextPreviousYearPaperId = 0;

  // -- User Profile Management --

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // -- Study Material Management --

  public shared ({ caller }) func addStudyMaterial(title : Text, subject : Text, contentType : ContentType, url : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add study materials");
    };
    let newMaterial : StudyMaterial = {
      id = nextStudyMaterialId;
      title;
      subject;
      contentType;
      url;
    };
    studyMaterialStore.add(nextStudyMaterialId, newMaterial);
    nextStudyMaterialId += 1;
    newMaterial.id;
  };

  public query func getStudyMaterialById(id : Nat) : async ?StudyMaterial {
    studyMaterialStore.get(id);
  };

  public query func getAllStudyMaterials() : async [StudyMaterial] {
    studyMaterialStore.values().toArray();
  };

  public query func getStudyMaterialsBySubject(subject : Text) : async [StudyMaterial] {
    studyMaterialStore.values().toArray().filter(
      func(material) {
        material.subject == subject;
      }
    );
  };

  public query func getStudyMaterialsByType(contentType : ContentType) : async [StudyMaterial] {
    studyMaterialStore.values().toArray().filter(
      func(material) {
        material.contentType == contentType;
      }
    );
  };

  public shared ({ caller }) func deleteStudyMaterial(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete study materials");
    };
    studyMaterialStore.remove(id);
  };

  // -- Previous Year Paper Management --

  public shared ({ caller }) func addPreviousYearPaper(year : Nat, subject : Text, examName : Text, url : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add previous year papers");
    };
    let newPaper : PreviousYearPaper = {
      id = nextPreviousYearPaperId;
      year;
      subject;
      examName;
      url;
    };
    previousYearPaperStore.add(nextPreviousYearPaperId, newPaper);
    nextPreviousYearPaperId += 1;
    newPaper.id;
  };

  public query func getPreviousYearPaperById(id : Nat) : async ?PreviousYearPaper {
    previousYearPaperStore.get(id);
  };

  public query func getAllPreviousYearPapers() : async [PreviousYearPaper] {
    previousYearPaperStore.values().toArray();
  };

  public query func getPreviousYearPapersBySubject(subject : Text) : async [PreviousYearPaper] {
    previousYearPaperStore.values().toArray().filter(
      func(paper) {
        paper.subject == subject;
      }
    );
  };

  public query func getPreviousYearPapersByExam(examName : Text) : async [PreviousYearPaper] {
    previousYearPaperStore.values().toArray().filter(
      func(paper) {
        paper.examName == examName;
      }
    );
  };

  public shared ({ caller }) func deletePreviousYearPaper(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete previous year papers");
    };
    previousYearPaperStore.remove(id);
  };
};
