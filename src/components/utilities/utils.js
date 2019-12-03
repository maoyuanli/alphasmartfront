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

const filterZeroSentScore = (articles) => {
    const rslt = articles.filter((article) => {
        if (article.sentiment !== 0 ) {
            return article;
        } else {
            return null;
        }
    });
    return rslt;
};

const ScoreNumColorStyle = {
    red: {color: 'tomato'},
    green: {color: 'limeGreen'},
    topwords_style: {'ontStyle': 'italic', 'fontFamily': 'serif', 'fontWeight': 'bold'}
};

const switchUrl = (page) => {
    let urls = {
        heroku:'https://alphasmartback.herokuapp.com/api/',
        aws:'http://ec2-3-87-255-104.compute-1.amazonaws.com:8000/api/',
        local:'http://localhost:8000/api/'
    };

    let currentInUse = urls.aws;

    return currentInUse + page + '/'

};

module.exports = {
    avgSentScore,
    publishTimeCleaner,
    topWordsFormat,
    marketChangeFormat,
    filterZeroSentScore,
    ScoreNumColorStyle,
    switchUrl
};
