//SHOW RESULT
{
  //LOAD FROM LOCAL STORAGE
  {
    const strAnswers = window.localStorage.getItem(LOCAL_STORAGE);
    if(strAnswers === null) throw Error("Could not load");
    answers = JSON.parse(strAnswers);
  }

  for(let index = 1; index<=answers.length; index++){
    showResult(index,answers[index]);
  }
  //FINAL RESULT
  {
    let text;
    //GET TEXT
    {
      let total = 0, textIndex;
      answers.forEach((value) => total+= value);

      if(total > 339)
        textIndex = 0;
      else if(total > 244)
        textIndex = 1;
      else if(total > 149)
        textIndex = 2;
      else
        textIndex = 3;
      console.log(textIndex);
      text = Array(
        `Your organisation is evidently committed to inclusion.  Your perspective will be most valuable at the
        face to face training session as both an advocate and a guide for inclusive fitness service provision. You are
        highly relevant in your community and hence the organisation is sustainable and will remain so once your current
        commitment is supported and enhanced over time.`,
        `Your organisation is making genuine and meaningful efforts in the direction of universability.  However
         provision is probably patchy and inconsistent, which may cause some confusion among members and potential
         members. Promotion of inclusive opportunities as an organisational priority has the potential to broaden your
         relevance to an even greater number of community members.`,
        `The face to face training session will be of immense value to your organisation. An exciting challenge awaits
         as you move towards universability. It will take some time but the secret is to keep doing what you are doing
          well and gradually add other initiatives to make your services more inclusive. The face to face training
           session will lead to significant learning for your organisation.`,
        `The face to face training session will be of immense value to your organisation. An exciting challenge awaits
        as you move towards universability. It will take some time but the secret is to keep doing what you are doing
        well and gradually add other initiatives to make your services more inclusive. The face to face training session
        will lead to significant learning for your organisation. `)[textIndex];


    }
    console.log(text);
    const eleResult = document.createElement("p");
    eleResult.innerHTML = text;
    eleResult.className = FEEDBACK_CLASS;
    document.getElementById("overall").append(eleResult);

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
