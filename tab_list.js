// file global constants - store Dom elements to reuse
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]'); //tabs is an array

// event listeners
tabList.addEventListener("keydown", changeTabFocus);
tabs.forEach(tab => {
  tab.addEventListener("click", changeTabPanel);
});

// Set default value for tab-focus to first tab
// to match tabindex='0' & html default 'aria-selected' on this html element
let tabFocus = 0;

// function to change tab focus - for accessibility
function changeTabFocus(e) {
  // constants
  const keydownLeft = 37; // store left-arrow-key code
  const keydownRight = 39; // store right-arrow-key code

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    // if either the left or right arrow keys are pressed, hide the previously
    // focused tab from screen readers before moving focus
    tabs[tabFocus].setAttribute("tabindex", "-1");
    if (e.keyCode === keydownLeft) {
      // if left arrow key is pressed, move focus to lower index - loop as needed
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    } else if (e.keyCode === keydownRight) {
      // if right arrow key is pressed, move focus to lower index - loop as needed
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else console.log("Conditionals Error");
  }
  // set moved-to tab's tabindex to '0' to make it visible to screen readers
  tabs[tabFocus].setAttribute("tabindex", "0");
  // apply focus to the moved-to tab
  tabs[tabFocus].focus();
}

// function to change destination - changes article, picture & active tab
function changeTabPanel(e) {
  /* constants */
  //Get target (tab whose event listener was tripped)
  const targetTab = e.target;
  //Get id strings for panel and picture corresponding to the target tab
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetPicture = targetTab.getAttribute("data-picture");
  //get main container of Tab List & store as const
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  /* switch active tab */
  // remove active status from all tabs
  tabContainer.querySelectorAll('[role="tab"]').forEach(tab => {
    tab.setAttribute("aria-selected", "false");
  });
  // set the target tab to active
  targetTab.setAttribute("aria-selected", "true");

  // switch panel
  hide(mainContainer, '[role="tabpanel"]');
  show(mainContainer, `#${targetPanel}`);

  // switch picture
  hide(mainContainer, "picture");
  show(mainContainer, `#${targetPicture}`);
}

function hide(parent, content) {
  parent.querySelectorAll(content).forEach(item => {
    item.setAttribute("hidden", "true");
  });

  console.log(parent.querySelectorAll(content));
}

function show(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
