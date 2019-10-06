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

};

const publishTimeCleaner = function (rawDateTime) {
    return rawDateTime.replace(/[T]/g, '@').replace(/[Z]/g, '')
};

const topWordsFormat = function (rawTopWords) {
    let formatted = rawTopWords.replace(/,/g, ', ');
    return formatted
};

const marketChangeFormat = function (rawNum) {
    return (rawNum * 100).toFixed(2) + '%'
};

const filterZeroSentAndNullDescr = (articles) => {
    const rslt = articles.filter((article) => {
        if (article.sentiment !== 0 && article.description != null) {
            return article;
        } else {
            return null;
        }
    });
    return rslt;
};

const ScoreNumColorStyle = {
    red: {color: 'tomato'},
    green: {color: 'springgreen'},
    topwords_style: {'ontStyle': 'italic', 'fontFamily': 'serif', 'fontWeight': 'bold'}
};

module.exports = {
    avgSentScore,
    publishTimeCleaner,
    topWordsFormat,
    marketChangeFormat,
    filterZeroSentAndNullDescr,
    ScoreNumColorStyle
};
