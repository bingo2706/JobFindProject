import moment from 'moment';
class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error)
        })
    }
    // return time form time to now
    static formatDate(time) {
        let a = moment.unix(new Date().getTime() / 1000).format('DD/MM/YYYY')
        let b = moment.unix(time / 1000).format('DD/MM/YYYY')

        var start = moment(b, "DD/MM/YYYY");
        var end = moment(a, "DD/MM/YYYY");

        //Difference in number of days

        return (moment.duration(start.diff(end)).asDays())
    }
}

export default CommonUtils;