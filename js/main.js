"use strict"

let filled
//ANSWER SYSTEM
{
  const DISPLAY_NONE = "none";
  const DISPLAY_BLOCK ="block";

  filled = Array();
  answers  = Array();

  //SETUP
  {
    //filling arrays

    const sizes = [4, 5, 2, 4, 5, 5, 2, 8, 6, 5, 2];
    function _totalSection(section){
      let total = 0;
      answers[section - 1].forEach((value => total += Number(value)));
      return total;
    }

    sizes.forEach((value, index) => {
      answers.push(Array(value));

      let requiredQuestions;

      switch (index){
        case(3):
        case(9):
          requiredQuestions = 1;
          break;
        case(7):
          requiredQuestions = 2;
          break;
        default:
          requiredQuestions = value;
          break;
      }
      filled.push(Array(requiredQuestions));

      //POPULATING ARRAYS
      for (let i = 0;i<filled[index].length;i++){
        filled[index][i] = false;
      }

      for (let i = 0; i < value; i++) {
        answers[index][i] = 0;
      }
    });
    //hiding sections
    for (let i = 1; i < eleSections.length; i++) {
      eleSections[i].style.display = DISPLAY_NONE;
    }
    function setAnswer(section,question,value){
      answers[section - 1][question - 1] = Number(value);
      _setAnswered(section,question);

      if(_checkAnswered(section)){
        showResult(section,_totalSection(section));
        _revealNext(section);
      }
    }
  //Yes this is implemented in quite a unnecessary way. Separating filled from the points came later on
    // If I had more time I would have converted it all to either a 1d array or removed the add (probably the later.)
    function addAnswer(section,question,value,positive){
      value = Number(value);
      if(!positive) value = -value;
      answers[section - 1][question - 1] += Number(value);

      showResult(section,_totalSection(section));
      _revealNext(section);
    }

    function _checkAnswered(section){
      let total = true;
      filled[section - 1].forEach((value) => total = total && Boolean(value));
      return Boolean(total);
    }

    function _revealNext(section){
      if(section < eleSections.length)
        eleSections[section].style.display = DISPLAY_BLOCK;
    }
    //attaching html
    {
      for (let section = 1; section <= sizes.length; section++) {
        for (let question = 1; question <= sizes[section - 1]; question++) {
          let elements = document.querySelectorAll('input[name="S' + section + 'Q' + question + '"]');

          for (const element of elements) {
            if (element.type === "checkbox") {
              element.addEventListener("click", () => {
                addAnswer(section, question, element.value, element.checked)
              });
            }
            else {
              element.addEventListener("click", () => {
                setAnswer(section, question, element.value)
              });
            }
          }
        }
      }
      //setting revealers
      {
        const SECTION = 4;
        const S4Q1 = document.getElementsByName("S4Q1");
        const optional4 = document.getElementById("optional4");

        S4Q1[0].addEventListener("click", () =>{
          optional4.style.display = DISPLAY_BLOCK;
          _setAnswered(SECTION,1);

          if(_checkAnswered(SECTION)){
            showResult(SECTION,_totalSection(SECTION));
            _revealNext(SECTION);
          }
        });
        S4Q1[1].addEventListener("click", () =>{
          optional4.style.display = DISPLAY_NONE;
          _setAnswered(SECTION,1);

          if(_checkAnswered(SECTION)){
            showResult(SECTION,_totalSection(SECTION));
            _revealNext(SECTION);
          }
        });
      }
      //I should have split the filled and answers system from the beginning to avoid this.
      {
        const SECTION = 8;
        const revealer8a = document.getElementsByName("revealer8a");
        const optional8a = document.getElementById("optional8a");


        revealer8a[0].addEventListener("click",() => {
          optional8a.style.display = DISPLAY_BLOCK;
          _setAnswered(SECTION,1);

          if(_checkAnswered(SECTION)){
            showResult(SECTION,_totalSection(SECTION));
            _revealNext(SECTION);
          }
        });
        revealer8a[1].addEventListener("click", () => {
          optional8a.style.display = DISPLAY_NONE;
          _setAnswered(SECTION,1);

          if(_checkAnswered(SECTION)){
            showResult(SECTION,_totalSection(SECTION));
            _revealNext(SECTION);
          }
        });
      }
      {
        const revealer8b = document.getElementsByName("revealer8b");
        const optional8b = document.getElementById("optional8b");
        const SECTION = 8;

        revealer8b[0].addEventListener("click",() => {
          optional8b.style.display = DISPLAY_BLOCK;
          _setAnswered(SECTION,2);

          if(_checkAnswered(SECTION)){
            showResult(SECTION,_totalSection(SECTION));
            _revealNext(SECTION);
          }
        });
        revealer8b[1].addEventListener("click",() => {
          optional8b.style.display = DISPLAY_NONE;
          _setAnswered(SECTION,2);

          if(_checkAnswered(SECTION)){
            showResult(SECTION,_totalSection(SECTION));
            _revealNext(SECTION);
          }
        });
      }
    }

    function _setAnswered(section, question){
      filled[section - 1][question - 1] = true;
    }

    //STORE & SEND
    {
      function getAllAnswerTotals(){
        const results = Array();

        answers.forEach( (value) => {
          let total = 0;
          value.forEach((value) => total += Number(value));
          results.push(total);
        })

        return results;
      }

      const btnSubmit = document.getElementById("submit");

      btnSubmit.addEventListener("click",() => {
        if(_verifyAnswered()) return;

        let answers = getAllAnswerTotals();

        window.localStorage.setItem(LOCAL_STORAGE, JSON.stringify(answers));
        location.href = "html/Result.html";
      });

      function _verifyAnswered(){
        let section = 0;
        while (section < filled.length){

          if(!_checkAnswered(section + 1)){
            //IF A SECTION IS NOT COMPLETE, SCROLL TO IT.
            let question = 0;
            while (filled[section - 1][question]){
              question++;
            }
            const query = `input[name="S${section + 1}Q${question + 1}"]`;
            document.querySelectorAll(query)[0].focus();
            return true;
          }

          section++;
        }
        return false;
      }
    }
  }
}

//TIMER
{
  const timerElement = document.getElementById("timer");
  let minLeft = 5, secLeft = 0;

  drawTimer()
  const timer = setInterval(tickTimer, 1000);

  function tickTimer(){
    if(--secLeft < 0){
      secLeft = 59
      if(--minLeft < 0 ){
        clearInterval(timer);
        location.reload();
      }
    }
    drawTimer()
  }

  function drawTimer(){
    const left = minLeft.toString().padStart(2,'0');
    const right = secLeft.toString().padEnd(2,'0');
    timerElement.innerText = `${left}:${right}`;
  }
}

//HELP
{
    const helpers = document.getElementsByClassName("help");

    const enter = (e) => {
      let target = e.target;
      let addition = document.createElement("span");
      addition.innerHTML = target.dataset.text;
      target.append(addition);
    }

    const exit = (e) => {
      let target = e.target;
      target.removeChild(target.lastChild);
    }

    for (let helper of helpers){
      helper.addEventListener("mouseenter",enter);
      helper.addEventListener("mouseleave",exit);
    }
}
