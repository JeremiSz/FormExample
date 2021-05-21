//SHOW RESULT
{
  //LOAD FROM LOCAL STORAGE
  {
    const strAnswers = window.localStorage.getItem(LOCAL_STORAGE);
    if(strAnswers === null) throw Error("Could not load");
    answers = JSON.parse(strAnswers);
  }

  for(let index = 0; index<answers.length; index++){
    showResult((index + 1),answers[index]);
  }
}

//LISTBOXES
{
  const firstLB = document.getElementById("firstLB");
  const second = document.getElementById("secondLB");

  firstLB.addEventListener("input",(e) => {
    //CLEAR LISTBOX
    while (second.hasChildNodes()){
      second.removeChild(second.lastChild);
    }

    //MAKE OPTIONS
    let text;
    switch (e.target.selectedIndex){
      case (0):
        text = Array("","","");
        break;
      case(1):
        text = Array("I understood the questions","I liked the visuals","I could easily navigate the site");
        break;
      default:
        text = Array("I did not understand the questions and/or answers","I did not like how it looked","I got confused at what I was meant to do");
        break
    }
    for (let i = 0; i < text.length; i++) {
      const element = document.createElement("option");
      element.innerHTML = text[i];
      second.append(element);
    }

  });
}
