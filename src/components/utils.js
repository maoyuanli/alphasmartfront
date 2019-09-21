const avgSentScore = function (articleJsonList) {
    let sum_score = 0;

    for (var i = 0; i < articleJsonList.length; i++) {
        var obj = articleJsonList[i];

        if (obj.sentiment !== "Null") {
            sum_score += obj.sentiment;
        } else {
            sum_score += 0;
        }
        ;
    }

    let avg_score = (sum_score / articleJsonList.length).toFixed(4);

    if (!isNaN(avg_score)) {
        return avg_score
    } else {
        return 0
    }

}

const publishTimeCleaner = function (rawDateTime) {
    return rawDateTime.replace(/[T]/g, '@').replace(/[Z]/g, '')
}

const topWordsFormat = function(rawTopWords){
    let formatted = rawTopWords.replace(/,/g,', ')
    return formatted
}

const marketChangeFormat = function(rawNum){
    return (rawNum*100).toFixed(2) + '%'
}

module.exports = {avgSentScore, publishTimeCleaner, topWordsFormmat: topWordsFormat, marketChangeFormat}