import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    query,
    addDoc,
} from 'firebase/firestore';

import { db } from '../firebase/firebase';

import { Event } from '../models/Event';

class EventService {
    constructor() {
        this.collection = 'events';
    }

    async fetchEvents() {
        const collectionRef = collection(db, this.collection);
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);

        const events = [];
        querySnapshot.forEach((doc) => {
            events.push(new Event.fromFirebase(doc));
        });

        return events;
    }

    async getEvent() {
        const collectionRef = collection(db, this.collection);

        await getDoc();
    }


    async createEvent(event) {
        // console.log("\n");
        const collectionRef = collection(db, this.collection);
        // console.log("Got here");
        const lolol = event.toJson();
        // console.log(lolol);

        const docRef = await addDoc(collectionRef, lolol);
        event.id = docRef.id;
        // console.log(event.id);




        return event;
    }

    async deleteEvent(eventId) {
        const docRef = doc(db, this.collection, eventId);
        await deleteDoc(docRef);
    }




}

const service = new EventService();
export default service;