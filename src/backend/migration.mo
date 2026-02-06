import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldActor = {
    studyMaterialStore : Map.Map<Nat, { id : Nat; title : Text; subject : Text; contentType : { #VideoLecture; #PdfBook; #Music; #Course; #Book; #Audio }; url : Text }>;
    previousYearPaperStore : Map.Map<Nat, { id : Nat; year : Nat; subject : Text; examName : Text; url : Text }>;
    dailyTestSeriesStore : Map.Map<Nat, { id : Nat; day : Nat; subject : Text; testName : Text; description : Text; questionsUrl : Text; answersUrl : Text; videoLectureUrl : Text }>;
    nextStudyMaterialId : Nat;
    nextPreviousYearPaperId : Nat;
  };

  type NewActor = {
    studyMaterialStore : Map.Map<Nat, { id : Nat; title : Text; subject : Text; contentType : { #VideoLecture; #PdfBook; #Music; #Course; #Book; #Audio }; url : Text }>;
    previousYearPaperStore : Map.Map<Nat, { id : Nat; year : Nat; subject : Text; examName : Text; url : Text }>;
    dailyTestSeriesStore : Map.Map<Nat, { id : Nat; day : Nat; subject : Text; testName : Text; description : Text; questionsUrl : Text; answersUrl : Text; videoLectureUrl : Text }>;
    nextStudyMaterialId : Nat;
    nextPreviousYearPaperId : Nat;
    nextDailyPollutionEntryId : Nat;
    dailyPollutionStore : Map.Map<Nat, { id : Nat; day : Nat; airQuality : Text; pollutionSource : Text; recommendations : Text }>;
  };

  public func run(old : OldActor) : NewActor {
    let dailyPollutionEntries = [
      (
        0,
        {
          id = 0;
          day = 1;
          airQuality = "Moderate";
          pollutionSource = "Vehicle emissions";
          recommendations = "Wear masks, avoid outdoor activities during peak hours";
        },
      ),
      (
        1,
        {
          id = 1;
          day = 2;
          airQuality = "Unhealthy";
          pollutionSource = "Industrial emissions";
          recommendations = "Limit outdoor exercise, use air purifiers indoors";
        },
      ),
      (
        2,
        {
          id = 2;
          day = 3;
          airQuality = "Good";
          pollutionSource = "Minimal sources";
          recommendations = "No special precautions needed";
        },
      ),
    ];

    { old with nextDailyPollutionEntryId = dailyPollutionEntries.size(); dailyPollutionStore = Map.fromIter(dailyPollutionEntries.values()) };
  };
};
