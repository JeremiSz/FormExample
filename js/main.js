"use strict"

//ANSWER SYSTEM
{
  const DISPLAY_NONE = "none";
  const DISPLAY_BLOCK ="block";

  const filled = Array();
  answers  = Array();

  //SETUP
  {
    //filling arrays

    const sizes = [4, 5, 2, 4, 4, 5, 2, 8, 6, 5, 2];
    function _totalSection(section){
      let total = 0;
      answers[section - 1].forEach((value => total += Number(value)));
      return total;
    }

    sizes.forEach((value) => {
      answers.push(Array(value));
      filled.push(Array(value));
    });

    for (let i = 0; i < filled.length; i++) {
      for (let j = 0; j < sizes[i]; j++) {
        answers[i][j] = 0;
      }
    }
    //hiding sections
    for (let i = 1; i < eleSections.length; i++) {
      eleSections[i].style.display = DISPLAY_NONE;
    }
    function setAnswer(section,question,value){
      answers[section - 1][question - 1] = Number(value);
      filled[section - 1][question - 1] = true;

      if(_checkAnswered(section)){
        showResult(section,_totalSection(section));
        _revealNext(section);
      }
    }

    function addAnswer(section,question,value,subtract){
      value = Number(value);
      if(subtract) value = -value;
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
              filled[section - 1][question - 1] = true;
            }
            else {
              element.addEventListener("click", () => {
                setAnswer(section, question, element.value)
              });
              filled[section - 1][question - 1] = false;
            }
          }
        }
      }
      //setting revealers
      function optionalClicked(section,optionalPart,display){
        optionalPart.style.display = display;
        showResult(section,_totalSection(section));
      }
      {
        const S4Q1 = document.getElementsByName("S4Q1");
        const optional4 = document.getElementById("optional4");

        S4Q1[0].addEventListener("click", () =>{
          optionalClicked(4,optional4,DISPLAY_BLOCK);
        });
        S4Q1[1].addEventListener("click", () =>{
          optionalClicked(4,optional4,DISPLAY_NONE);
        });
      }
      //I do realise hardcoding this for 8 is not the neatest. It is an exception in every way to the rest so I feel it
      //deserves it. That whole an 80% solution is cleaner than 100%.
      {
        const revealer8a = document.getElementsByName("revealer8a");
        const optional8a = document.getElementById("optional8a");


        revealer8a[0].addEventListener("click",() => {
          optionalClicked(8,optional8a,DISPLAY_BLOCK);
        });
        revealer8a[1].addEventListener("click", () => {
          optionalClicked(8,optional8a,DISPLAY_NONE);
        });
      }
      {
        const revealer8b = document.getElementsByName("revealer8b");
        const optional8b = document.getElementById("optional8b");

        revealer8b[0].addEventListener("click",() => {
          optionalClicked(8,optional8b,DISPLAY_BLOCK);
        });
        revealer8b[1].addEventListener("click",() => {
          optionalClicked(8,optional8b,DISPLAY_NONE);
        });
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
    let answers = getAllAnswerTotals();

    window.localStorage.setItem(LOCAL_STORAGE, JSON.stringify(answers));
    location.href = "html/Result.html";
  })
}
