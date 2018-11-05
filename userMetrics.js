class Metrics {
    constructor(page, date, user) {
        this.page = page;
        this.timeSpent = 0;
        this.date = date;
        this.user = user;
        this.metaData = null;
    }
}



class UserMetrics {
    /**
     * 
     * @param {string} serverUrl url to server side api database ex : http://
     */
    constructor(serverUrl) {
        this.startTime = null;
        this.endTime = null;
        this.metrics = null;
        if (serverUrl) {
            this.serverUrl = serverUrl;
        } else {
            console.error("Invalid serverUrl param");
        }
    }
    /**
     * 
     * @param {string} page actual page name ex : Page1 
     * @param {Object} user user object ex : {userName: "user", id : 1 ,...}
     */
    startMetrics(page, user) {
        this.startTime = new Date();
        this.metrics = new Metrics(page, new Date(), user);

    }

    /**
     * 
     * @param {Object} metaData meta data to be send ex:  {question : 1, dificulty : 2, isCorrect : false}
     */
    stopMetrics(metaData) {
        this.endTime = new Date();
        this.metrics.timeSpent = this.endTime - this.startTime;
        this.metrics.metaData = metaData;


    }
    /**
     *  
     * @returns {Promise}
     */
    postMetrics() {
        let promise = new Promise((resolve, reject) => {
            let xmlHttp = new XMLHttpRequest();
            try {
                xmlHttp.open("POST", this.serverUrl, false);
                xmlHttp.send(JSON.stringify(this.metrics));
                let data = JSON.parse(xmlHttp.responseText);

                if (data.status == 200) {
                    resolve(data)
                } else {
                    reject(data);
                }
            }catch (err){
                reject(err);
            }
        })

        return promise;
    }

}