module.exports = {
    generateData: (times, collection) => {
      console.log("inside mockdata")

        let myArray = [];

        const n = ["Database", "Git problems", "Server issues", "Code that works first try", "Finished project", "Tech help"];
        const p = [999, 849, 699, 499, 299, 179, 99, 59, 29, 10]
        const c = ['Home', 'Clothing', 'Entertainment', 'Technology', 'Industrial', 'Other']
        const u = ['Albin Engman', 'Alejandro Garcia', 'Anna Faixova', 'Elin Jakobsson', 'Sara']
        const up = ['https://ca.slack-edge.com/T6RE0MQD7-U6V4E8MBM-3d64322266dc-48', 'https://ca.slack-edge.com/T6RE0MQD7-U6VU3FFFY-423698c00f22-48', 'https://ca.slack-edge.com/T6RE0MQD7-U6WA7CBML-f29606c9a625-48', 'https://ca.slack-edge.com/T6RE0MQD7-U6XBD3TKR-776889f72b0d-72', 'https://ca.slack-edge.com/T6RE0MQD7-U74FAAYB0-42e1dd31e07b-72']
        const info = ["Don't buy this, it's a terrible thing not intended for thy world", "Consider buying this, it's an average item to an average price.", "Buy this! It's practically illegal considering how cheap it was. In fact, it might be, watch out for the cops"]
        const pi = []

        function randomElement(list) {
            let r = Math.random() * list.length;
            return list[Math.floor(r)];
        }

        function createObject(newList) {
            let newObject = {};
            newObject.name = randomElement(n);
            newObject.price = randomElement(p);
            newObject.category = randomElement(c);
            newObject.userName = randomElement(u);
            newObject.userPicture = randomElement(up);
            newObject.info = randomElement(info);
            newList.push(newObject);
        }

        for (i = 0; i < times; i++) {
            createObject(myArray);
        }

        collection.insertMany(myArray);
    }
}
