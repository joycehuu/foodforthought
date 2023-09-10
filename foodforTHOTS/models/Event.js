export class Event {

    constructor(title, time, location, address, description, allergies) {

        this.id = null; // this is the userId
        this.title = title;
        this.time = time;
        this.location = location;
        this.address = address;
        this.description = description;
        this.allergies = allergies;
    }

    toJson() {
        return {
            Title: this.title,
            Time: this.time,
            Location: this.location,
            Address: this.address,
            Description: this.description,
            Allergies: this.allergies
        };
    }

    static fromFirebase(docSnap) {
        const data = docSnap.data();
        console.log(docSnap);
        console.log(data);
        console.log(docSnap.id);
        const ret = new Event(
             docSnap.id,
             data.Title,
             data.Time,
             data.Location,
             data.Address,
             data.Description,
             data.Allergies
        );
        console.log(ret);
        return ret;
    }
}