import firebase from "firebase/app";
import { db } from "../firebase";
import Tip, { DocTip } from "./Tip";

export default class FireStoreHelper {
  private lastDocQuery: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null = null;
  private subjectDocName: string;

  constructor(private subject: string, private userData: firebase.User | null) {
    this.subjectDocName = subject.split(/[^\w\d]/).join("_");
  }

  /**
   * Returns the next three tips.
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

  /**
   * Creates a new tip in the FireStore and returns the created Tip.
   */
  createTip = async (message: string) => {
    const newDocTip = Tip.createDocTip(this.userData, message);

    const courseDocRef = db.collection("tips").doc(this.subjectDocName);
    const docSnapshot = await courseDocRef.get();
    if (!docSnapshot.exists) await courseDocRef.set({ name: this.subject });
    const docRef = await courseDocRef.collection("list").add(newDocTip);

    return new Tip(newDocTip, docRef.id, docRef);
  };

  /**
   * Updates the specified Tip in the FireStore.
   */
  updateTip = async (message: string, tip: Tip) => {
    await tip.ref.update({ tip: message });
  };
}
