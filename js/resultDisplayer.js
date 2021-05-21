"use strict"

const FEEDBACK_CLASS = "feedback";
const SECTION_CLASS = "section"

const answers = Array();
const filled = Array();

const eleSections = document.getElementsByClassName(SECTION_CLASS);

function showResult(section, totalPoints){
  {
    let children = eleSections[section - 1].children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].className === FEEDBACK_CLASS)
        eleSections[section - 1].removeChild(children[i]);
    }
  }

  let grade = Number(_getGrade(section,totalPoints));
  const colour = ["#d60093","#fe48ca","#ff75ff","#ecb2dd"];
  const secText = [
    [
      "The face to face training session will be a great opportunity for you to get guidance on progressing the " +
      "universability of your organisation",
      "With a little more thought you will see more opportunities for increasing the universability of your services",
      "Well done you are clearly being proactive in considering making your services more universal"
    ],
    [
      "The face to face training session will be a great opportunity for you to gain some perspective of the benefits of" +
      " universability to your organisation and its members",
      "You have some sense of the benefits of a universal organisation",
      "You have a very high level of appreciation of the mutual benefits for all stakeholders in an inclusive organisation"
    ],
    [
      "The face to face session has great scope to convince you of the feasibility of promoting inclusion - just keep" +
      " your mind open to the possibility",
      "You can see an inclusive future for your organisation and its members, the challenge is now to ensure that your" +
      " decisions and resource allocations make this happen"
    ],
    [
      "The face to face training session will only be of value to progressing your universability if you are willing to" +
      " challenge your belief system about access to fitness services being a fundamental",
      "While there is some openness to equity in your organisation the commitment is not yet wholly embraced by all." +
      " Belief systems within the organisation may be confused and possibly conflicting. It would be desirable to" +
      " promote dialogue amongst your stakeholders around the topic of inclusion",
      "Your organisation’s value system is an inclusive one. Your challenge will be to safeguard this and promote this" +
      " philosophy within the wider fitness sector"
    ],
    [
      "Universability is not something with which you have yet engaged, so the face to face training session will be" +
      " an opportunity for significant learning in this respect",
      "Your policies are confused and possibly conflicting. Some guidance will be needed to bring greater coherency" +
      " to your efforts to date",
      "Your journey of making organisational policies inclusive has started well and this may be the catalyst for" +
      " enhanced universability – if you are open to progressive change",
      "Your intentions are very sound in respect of inclusion and you have the potential to be a high achiever in" +
      " this respect"
    ],
    [
      "You have great scope for learning during the face to face training session, once you have an open mind to the" +
      " possibilities that an inclusive approach can offer",
      "You have made a positive start upon which your organisation can build sound relationships with people with" +
      " disabilities. Unit three will offer you more ideas in respect of forging alliances with people with disabilities",
      "You are already a potential resource for people with disabilities in your community, as your networks are an" +
      " essential element in the UFIT approach"
    ],
    [
      "Your organisation has yet to learn the power of dialogue as a means of providing desirable fitness services to" +
      " all members of the community",
      "As a listening organisation you have important information that can guide your journey towards universability." +
      " Your challenge is to interpret what is being said and to translate it into inclusive actions"
    ],
    [
      "You have great scope for learning during the face to face training session, once you have an open mind to the" +
      " possibilities that an inclusive approach can offer",
      "You have made a positive start – you can use the questions here to reflect on how you can make more progress" +
      " in this respect",
      "You have the potential to be a role model of provision in the fitness sector. Programming is the basic unit of" +
      " service delivery – where this is inclusive, your relevance to the wider community is enhanced"
    ],
    [
      "Universability is not something with which you have engaged so the face to face training session will be an" +
      " opportunity for significant learning in this respect",
      "Depending on the strength of influence of those with some perspective on inclusion, you may have scope to drive" +
      " improvements from within. Consider the scope for repositioning those with training and knowledge in the area" +
      " of inclusion to optimise their influence",
      "There is some scope within your organisation to promote universability principles and broaden your" +
      " organisation’s relevance in the wider community",
      "You have invested in your organisation’s most important asset. Your potential to offer inclusive services is" +
      " vast. The challenge is to make sure that you optimally deploy this wisdom to make all aspects of your service" +
      " provision truly inclusive"
    ],
    [
      "The face to face training session will provide you with wonderful ideas for making small (and inexpensive)" +
      " changes to enhance the universability of the facility.",
      "While you have made a start in the direction of universability there is considerable scope for improvements. ",
      "While some aspects of your facility are accessible there is scope for enhancement. The face to face training" +
      " session will offer you some suggestions for improvement here.",
      "The facility is largely accessible and hence there is significant scope for promoting universability."
    ],
    [
      "The face to face training session will offer you many ideas for inclusivizing your promotion materials",
      "Your organisation has some appreciation of the need for have diversity to be represented in your promotional" +
      " materials. With a little more thoughtfulness your promotional campaigns will speak louder to a wider audience",
      "You clearly understand the power of imagery and language and your materials may be potential templates for" +
      " others in the promotion of fitness services"
    ]
  ];

  let box = document.createElement("p");
  let sectionTexts = secText[section - 1];
console.log(sectionTexts.length)
  console.log(grade);
  box.innerHTML = sectionTexts[sectionTexts.length - (grade + 1)];
  console.log(sectionTexts)
  console.log(sectionTexts[sectionTexts.length - (grade + 1)]);
  box.style.backgroundColor = colour[grade];
  box.className = FEEDBACK_CLASS;
  eleSections[section -1].appendChild(box);
}
function _getGrade(section,total){
  let score;
  switch (section){
    case(1):
      if(total > 15)
        score = 0;
      else if(total > 9)
        score = 1;
      else
        score = 2;
      break;
    case(2):
      if(total > 19)
        score = 0;
      else if(total > 11)
        score = 1;
      else
        score = 2;
      break;
    case(3):
      if(total > 5)
        score = 0;
      else
        score = 1;
      break;
    case(4):
      if(total > 29)
        score = 0;
      else if(total > 19)
        score = 1;
      else
        score = 2;
      break;
    case(5):
      if(total > 39)
        score = 0;
      else if(total > 19)
        score = 1;
      else if(total > 9)
        score = 2;
      else
        score = 3;
      break;
    case(6):
      if(total > 29)
        score = 0;
      else if(total > 9)
        score = 1;
      else
        score = 2;
      break;
    case(7):
      if(total > 9)
        score = 0;
      else
        score = 1;
      break;
    case(8):
      if(total > 29)
        score = 0;
      else if(total >9)
        score = 1;
      else
        score = 2;
      break;
    case(9):
      if(total > 39)
        score = 0;
      else if(total > 19)
        score = 1;
      else if(total > 9)
        score = 2;
      else
        score = 3;
      break
    case(10):
      if(total > 39)
        score = 0;
      else if (total > 19)
        score = 1;
      else if(total > 9)
        score = 2;
      else
        score = 3
      break;
    case(11):
      if(total > 19)
        score = 0;
      else
        score = 1;
      break;
    default:
      score = -1;
  }
  return score;

}
