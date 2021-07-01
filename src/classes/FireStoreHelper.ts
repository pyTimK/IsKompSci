import firebase from "firebase/app";
import { db } from "../firebase";
import Tip, { DocTip } from "./Tip";

export default class FireStoreHelper {
  private lastDocQuery: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null = null;
  private subjectDocName: string;

  constructor(subject: String) {
    this.subjectDocName = subject.split(/[^\w\d]/).join("_");
  }

  /**
   * Asynchronous method that returns three tips at a time
   */
  getTips = async () => {
    const got_tips: Tip[] = [];
    let tipsCollection = db
      .collection("tips")
      .doc(this.subjectDocName)
      .collection("list")
      .orderBy("likes", "desc")
      .orderBy("created", "desc");

    if (this.lastDocQuery) tipsCollection = tipsCollection.startAfter(this.lastDocQuery);

    const querySnapshot = await tipsCollection.limit(3).get();

    querySnapshot.forEach((doc) => got_tips.push(new Tip(doc.data() as DocTip, doc.id, doc.ref)));

    this.lastDocQuery = got_tips.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null;

    return got_tips;
  };
}