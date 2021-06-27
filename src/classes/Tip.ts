import firebase from "firebase/app";
import { fieldValue } from "../firebase";
import removeElement from "../functions/removeElement";

export interface DocTip {
  user: string;
  tip: string;
  created: firebase.firestore.Timestamp;
  likers: string[];
  dislikers: string[];
  likes: number;
}

interface TipLikesUpdateData {
  likes: firebase.firestore.FieldValue;
  likers?: firebase.firestore.FieldValue;
  dislikers?: firebase.firestore.FieldValue;
}
export default class Tip {
  constructor(
    private _docTip: DocTip,
    public id: string,
    public ref: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  ) {}

  get tip() {
    return this._docTip.tip;
  }

  set tip(newTip: string) {
    this._docTip.tip = newTip;
  }

  get likers() {
    return this._docTip.likers;
  }

  get dislikers() {
    return this._docTip.dislikers;
  }

  get likes() {
    return this._docTip.likes;
  }

  get uid() {
    return this._docTip.user;
  }

  static createDocTip(user: firebase.User | null, tip: string): DocTip {
    return {
      user: user?.uid ?? "noID",
      tip: tip,
      likes: 0,
      likers: [],
      dislikers: [],
      created: fieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    };
  }

  updateLikes(isLiked: boolean, isDisliked: boolean, uid: string, newCount: number, tapped: "Like" | "Dislike") {
    this._docTip.likes = newCount;

    if (tapped === "Like") {
      if (isLiked) removeElement(this._docTip.likers, uid);
      else this._docTip.likers.push(uid);
      if (isDisliked) removeElement(this._docTip.dislikers, uid);
    } else {
      if (isDisliked) removeElement(this._docTip.dislikers, uid);
      else this._docTip.dislikers.push(uid);
      if (isLiked) removeElement(this._docTip.likers, uid);
    }

    this._updateFirestoreLikes(isLiked, isDisliked, uid, tapped);
  }

  private _updateFirestoreLikes(isLiked: boolean, isDisliked: boolean, uid: string, tapped: "Like" | "Dislike") {
    const updates: TipLikesUpdateData = {
      likes: fieldValue.increment(
        tapped === "Like" ? (isLiked ? -1 : isDisliked ? 2 : 1) : isDisliked ? 1 : isLiked ? -2 : -1
      ),
    };

    if (tapped === "Like") {
      updates.likers = isLiked ? fieldValue.arrayRemove(uid) : fieldValue.arrayUnion(uid);
      if (isDisliked) updates.dislikers = fieldValue.arrayRemove(uid);
    } else {
      updates.dislikers = isDisliked ? fieldValue.arrayRemove(uid) : fieldValue.arrayUnion(uid);
      if (isLiked) updates.likers = fieldValue.arrayRemove(uid);
    }

    this.ref.update(updates).catch((_e) => {
      const e: Error = _e;
      console.log(`Error ${tapped === "Dislike" && "dis"}liking: `, e.message);
    });
  }
}
