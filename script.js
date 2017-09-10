// query the chrome tabs for any discarded tabs
// renders the UI using url, title, and id of the tab as parameters
function tabQuery() {
    // only included discarded tabs in query
    const queryInfo = {
        discarded: true,
    };

    // query the tabs, and render the UI with url, title, and id of the specific tab as parameters
    chrome.tabs.query(queryInfo, (tabs) => {
        tabs.forEach((tab) => {
            renderTabComponent(tab.url, tab.title, tab.id);
        });
    });
}

function deleteUI(component){
    component.parentNode.removeChild(component);
}


// convert url and title to max 40 characters to fit extension
function max40Characters(convertTo40Chars) {
    return (convertTo40Chars.length <= 40 ? `${convertTo40Chars}` : `${convertTo40Chars.slice(0, 37)}...`);
}

// delete tab when 'close this tab' button is click
// remove div child and remove tab
function closeTab(tabIndex, tab_component) {
    
    // remove div from html page
    deleteUI(tab_component);

    // remove tab from chrome window
    chrome.tabs.remove(tabIndex);
}

// renders CONTAINER UI of tab
function renderContainer() {
    const tab_component = document.createElement('div');
    tab_component.classList.add('tab');
    return tab_component;
}

// renders URL UI of tab
function renderTabComponentUrl(tabUrl) {
    const tab_component_url = document.createElement('p');
    tab_component_url.textContent = max40Characters(tabUrl);
    return tab_component_url;
}

// renders TITLE UI of tab
function renderTabComponentTitle(tabTitle) {
    const tab_component_title = document.createElement('p');
    tab_component_title.textContent = max40Characters(tabTitle);
    return tab_component_title;
}

// renders (delete) BUTTON of tab
function addDiscardButton() {
    const discard_btn = document.createElement('button');
    discard_btn.textContent = 'Close this tab';
    discard_btn.classList.add('buttons');
    return discard_btn;
}

//
//
function renderTabComponent(tabUrl, tabTitle, tabIndex) {
    // create container tab component
    const tab_component = renderContainer();

    // create url paragraph component
    const tab_component_url = renderTabComponentUrl(tabUrl);

    // create title paragraph component
    const tab_component_title = renderTabComponentTitle(tabTitle);

    // create delete button
    const add_discard_btn = addDiscardButton();

    // append url and title component to the
    tab_component.appendChild(tab_component_url);
    tab_component.appendChild(tab_component_title);

    // eventlistener for closing tabUI at tab index when button clicked
    add_discard_btn.addEventListener('click', () => {
        closeTab(tabIndex, tab_component);
    });

    tab_component.appendChild(add_discard_btn);

    // get tag destination and append the tab component
    document.getElementById('tabs').appendChild(tab_component);
}

document.addEventListener('DOMContentLoaded', () => {
    tabQuery();
});
