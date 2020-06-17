import React from "react";
import {quizData} from "./Questions";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Rating from '@material-ui/lab/Rating';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Box from '@material-ui/core/Box';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);



class Quiz extends React.Component {

	state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    categories:null,
    difficulties:null,
    value:3
	};
	
	loadQuizData = () => {
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options,
        category: quizData[this.state.currentQuestion].category,
        difficulty: quizData[this.state.currentQuestion].difficulty
      };
    });
	};
	
	componentDidMount() {
    this.loadQuizData();
  }
	
	nextQuestionHandler = () => {
    // console.log(quizData[this.state.currentQuestion].difficulty)
  
    // if(quizData[this.state.currentQuestion].difficulty==='medium'){
    //   this.setState({
    //     value:2
    //   })    
    // }
    // if(quizData[this.state.currentQuestion].difficulty==='easy'){
    //   this.setState({
    //     value:1
    //   })    
    // } 
    // if(quizData[this.state.currentQuestion].difficulty==='hard'){
    //   this.setState({
    //     value:3
    //   })    
    // }

    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
	};
	
	componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
    if(quizData[this.state.currentQuestion].difficulty==='medium'){
      this.setState({
        value:2
      })    
    }
    if(quizData[this.state.currentQuestion].difficulty==='easy'){
      this.setState({
        value:1
      })    
    } 
    if(quizData[this.state.currentQuestion].difficulty==='hard'){
      this.setState({
        value:3
      })    
    }

      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer,
          category: quizData[this.state.currentQuestion].category
        };
      });
    }
	}
	
	//check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
	};
	
	finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    }
    if (this.state.userAnswer === this.state.correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }
	};
	
	render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    const minScore = (this.state.score/quizData.length)*100;

    const maxScore = ((quizData.length-currentQuestion)*5) + minScore;
    
    const currentScore = (this.state.score)/(currentQuestion)*100



    console.log("this.state.score",this.state.score);
    console.log("currentQuestion",currentQuestion);
    console.log("minScore",minScore);
    console.log("maxScore",maxScore);
    console.log("currentScore",currentScore);
    



    if (isEnd) {
      return (
        <div className="result">
          <h3>Game Over your Final score is {this.state.score} points </h3>
          <p>
            The correct answer's for the questions was
            <ul>
              {quizData.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <BorderLinearProgress variant="determinate" value={currentQuestion * 5}  />
          <span>{`Entertainment :  ${this.state.category}`}</span>  
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="simple-controlled" value={this.state.value}/>
          </Box>
          <h1>{this.state.questions} </h1>
          <span>{`Questions ${currentQuestion + 1}  out of ${quizData.length} remaining `}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < quizData.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {currentQuestion === quizData.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              Finish
            </button>
          )}
          <br />
          {/* <ProgressBar> */}
            {`Max Score :  ${maxScore} %`}
            <ProgressBar striped variant="warning" now={maxScore} key={2} />
            {`Current Score :  ${isNaN(currentScore)?0:currentScore} %`}
            <ProgressBar striped variant="success" now={currentScore} key={3} />
            {`Min Score :  ${minScore} %`}
            <ProgressBar striped variant="danger" now={minScore} key={1} />
          {/* </ProgressBar> */}

        </div>
      );
    }
  }

}

export default Quiz;
