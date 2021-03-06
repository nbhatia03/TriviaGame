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
        question: 'What is your favorite animal?',
        answers: ["Dogs", "Cats", "Mokeys", "Koalas", "Penguins"]
    },{
        question: 'What is your worst fear?',
        answers: ["Spiders", "Heights", "Commitment", "The inevitability of death", "Public Speaking"]
    },{
        question: 'What is your favorite movie?',
        answers: ['Remember the Titans', 'Star Wars']
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
var questionInt = 5000;
var correctNum = 0;
var incorrectNum = 0;

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


//show Question and Answers in DOM
function showQandA(){

    $('#message').fadeOut().empty();
    
    //if there are no more questions
    if(globalI === questionAnswer.length){
        $('#game').fadeOut();
        
        setTimeout(function(){
            $('#results')
            .append('<div> Correct: ' + correctNum + '</div>')
            .append('<div> Incorrect: ' + incorrectNum + '</div>')
            .fadeIn()
            .removeClass('invisible');
        }, 1000)

        setTimeout(function(){
            $('#playMe').removeClass('invisible').text('Play Again');
        }, 2000)

    }else{
        $('#answers').html('');
        timeLeft = 10;
        var ques = questionAnswer[globalI].question;
        var answers = questionAnswer[globalI].answers;
        $('#ques').text(ques);
        var randomI = Math.floor(Math.random()*answers.length); //choosing random answer to be correct
        correctAnswer = answers[randomI];
        answers.forEach(function(v, i){
            var id = '';
            if (correctAnswer === v){
                id = 'id="correct"'
            }
            $('#answers').append('<div class="answer"' + id + '>' + v + '</div>')
        })

        $('.answer').on('click', checkAns); //Can't put this in global scope

        globalI ++;
        $('#timer').text(timeLeft);
        timer = setInterval(updateTime, 1000);
    }
    

}

function updateTime(){
    // if (timeLeft === 3){
    //     $('#timer').addClass('red').animate({fontSize: '30px'}, 3000)
    // } have to reset size and color of timer if I use this

    if(timeLeft > 1){
        timeLeft --;
        $('#timer').fadeOut(200)
        setTimeout(function(){
            $('#timer').fadeIn(200).text(timeLeft);
        },200)
    }else{
        //Time's up
        timeLeft --
        clearInterval(timer);
        $('#timer').text("Time's up!");
        $('#correct').addClass('green');
        incorrectNum++
        setTimeout(showQandA, questionInt);
    }
}

function startGame(){
    globalI = 0;
    correctAnswer = '';
    playerAnswer = '';
    correctNum = 0;
    incorrectNum = 0;
    $('#description').addClass('invisible');
    $('#game').fadeIn();
    $('#results').empty().addClass('invisible');
    showQandA();
    $('#playMe').addClass('invisible');

}

function checkAns(){
    clearInterval(timer);
    $('.answer').off()

    if (timeLeft > 0){
        playerAnswer = $(this).text();
        if(playerAnswer === correctAnswer){
            console.log('Yay!');
            $('#correct').addClass('green');
            correctNum++;
        }else{
            console.log('Nope');
            $(this).addClass('red');
            $('#correct').addClass('green');
            incorrectNum ++;
        
            
        }
        message();
    }

    setTimeout(showQandA, questionInt);
}

function message(){
    var beginnings = ['Actually,', 'No,', 'Incorrect,', 'Wrong,', 'Nope,', "You don't know yourself at all - "]
    var ques = questionAnswer[globalI - 1].question;
    //Piece together message based on user input and question
    if(playerAnswer !== correctAnswer){
        var quesBit = ques.slice(7, ques.length-1);
        var randomInd = [Math.floor(Math.random()*beginnings.length)]
        var correctAns = $('#correct').text()
        var response = beginnings[randomInd] + quesBit + ' is ' + correctAns + '!';
        $('#message').text(response);
    }else{
        $('#message').text('Correct!');    
    }

    $('#message').fadeIn();
}

$('#playMe').click(startGame);

$('#title').animate({fontSize: "3rem"}, 700).animate({fontSize: "2.5rem"})


        