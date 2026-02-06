import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type ContentType = {
    #VideoLecture;
    #PdfBook;
    #Music;
    #Course;
    #Book;
    #Audio;
  };

  type StudyMaterial = {
    id : Nat;
    title : Text;
    subject : Text;
    contentType : ContentType;
    url : Text;
  };

  type OldActor = {
    studyMaterialStore : Map.Map<Nat, StudyMaterial>;
    nextStudyMaterialId : Nat;
  };

  type NewActor = {
    studyMaterialStore : Map.Map<Nat, StudyMaterial>;
    nextStudyMaterialId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newStudyMaterials = [
      {
        id = old.nextStudyMaterialId;
        title = "NCERT Mathematics Class 10";
        subject = "Mathematics";
        contentType = #PdfBook;
        url = "https://drive.google.com/file/d/1Z6V.../view?usp=sharing";
      },
      {
        id = old.nextStudyMaterialId + 1;
        title = "NCERT Science Class 10";
        subject = "Science";
        contentType = #PdfBook;
        url = "https://drive.google.com/file/d/1Y6X.../view?usp=sharing";
      },
      {
        id = old.nextStudyMaterialId + 2;
        title = "GCRT History Class 10";
        subject = "History";
        contentType = #PdfBook;
        url = "https://drive.google.com/file/d/1X6W.../view?usp=sharing";
      },
      {
        id = old.nextStudyMaterialId + 3;
        title = "GCRT Geography Class 10";
        subject = "Geography";
        contentType = #PdfBook;
        url = "https://drive.google.com/file/d/1W6V.../view?usp=sharing";
      },
      // Add more study materials as needed
    ];

    let newStudyMaterialStore = Map.empty<Nat, StudyMaterial>();
    for (material in newStudyMaterials.values()) {
      newStudyMaterialStore.add(material.id, material);
    };

    let mergedStudyMaterialStore = old.studyMaterialStore.clone();
    for (material in newStudyMaterialStore.values()) {
      mergedStudyMaterialStore.add(material.id, material);
    };

    {
      studyMaterialStore = mergedStudyMaterialStore;
      nextStudyMaterialId = old.nextStudyMaterialId + newStudyMaterials.size();
    };
  };
};
