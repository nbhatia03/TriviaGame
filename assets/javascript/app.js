//Show beginning screen
//Press button to play
//1st question appears
    //Timer starts
    //If time runs out
        //Show correct answer
    //If correct answer is clicked before timer runs out
        //Show congrats screen
    //ElseIf wrong answer is clicked 
        //Show correct answer
    //Go to next question

//When all the questions have been answered, show correct #, incorrect #, restart button
var questionAnswer = [
    {
        question: 'What is your favorite color?',
        answers: ["Blue", "Red", "Green", "Orange", "Purple"]
    },{
        question: 'What is your favorite food?',
        answers: ["Pizza", "Burgers", "Noodles", "Other"]
    },{
        question: 'What are your favorite animals?',
        answers: ["Dogs", "Cats", "Mokeys", "Koalas", "Penguins"]
    },{
        question: 'What is your worst fear?',
        answers: ["Spiders", "Heights", "Commitment", "The inevitability of death", "Public Speaking"]
    },{
        question: 'What is your favorite movie?'
    },{
        question: 'What is your favorite sport?',
        answers: ["Football", "Basketball", "Baseball", "Soccer"]
    },
    // {
    //     question: 'What is your favorite childhood memory?'
    // },{
    //     question: 'What is your worst childhood memory?'
    // },{
    //     question: 'What is your dream job?'
    // }
];

var globalI = 0;
var correctAnswer = '';
var playerAnswer = '';
var timeLeft = 10;
var timer;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// function timer(){
//     var time = 10
//     for(var i = 0; i<=time; i++){
//         if(i === time){
//             (function(i){
//                 setTimeout(function(){
//                     $('#timer').text("Time's Up!")
//                 }, i*1000)
//             })(i)
//         }else{
//             (function(i){
//                 setTimeout(function(){
//                     $('#timer').text(time - i)
//                 }, i*1000)
//             })(i) //IIFE works, setTimeout without this doesn't
//         }
//     }
// }

function showQandA(){
    var ques = questionAnswer[globalI].question;
    var answers = questionAnswer[globalI].answers;
    $('#ques').text(ques);
    var randomI = Math.floor(Math.random()*answers.length);
    correctAnswer = answers[randomI];
    answers.forEach(function(v, i){
        $('#answers').append('<div class="answer">' + v + '</div>')
    })
    globalI ++;
    $('#timer').text(timeLeft);
    timer = setInterval(updateTime, 1000);
    

}

function updateTime(){
    if(timeLeft > 1){
        timeLeft --;
        $('#timer').text(timeLeft);
    }else{
        clearInterval(timer);
        $('#timer').text("Time's up!");
        timeLeft = 10;
    }
}

function startGame(){
    globalI = 0;
    orrectAnswer = '';
    playerAnswer = '';
    $('#description').addClass('invisible');
    showQandA();
    $('#playMe').addClass('invisible');
}

$('#playMe').click(startGame)

        