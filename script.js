/*
// event which fires when highlighted or selected tabs in a window changes .. see: https://developer.chrome.com/extensions/tabs#event-onHighlighted 
// whenever a tab is highlighted .... res
chrome.tabs.onHighlighted.addListener(function(){
    

});
*/

function tabQuery(){
    
    const queryInfo = {
        discarded: true
    };

    chrome.tabs.query(queryInfo, function(tabs){
        tabs.forEach(tab => {
            renderTab(tab.url, tab.title, tab.id);
        })
    });
}

/** 
 * @description: adjust text size of paragraphs to fit in small extension window
 * @param {string} convertTo40Chars tab-url or tab-title
 * @returns {string} tab-url or tab-title at 
 *  
*/
function max40Characters(convertTo40Chars){
    return (convertTo40Chars.length <= 40? `${convertTo40Chars}` : `${convertTo40Chars.slice(0,37)}...`);
}

// delete tab when 'close this tab' button is click
// remove div child and remove tab
function closeTab(tabIndex,tab_component){
    
    // remove div from html page
    tab_component.parentNode.removeChild(tab_component);
    
    //remove tab from chrome window
    chrome.tabs.remove(tabIndex);

}

/** 
 * tab_component.addEventListener('click',function(e){
        console.log(e.target);
    });
* Create Tab Component.
*
* @param {function(string)} tabUrl - individual tab url for each tab on chrome
*/
function renderTab(tabUrl, tabTitle, tabIndex){

    // create container tab component as paragraph element
    // later used to contain the text and buttons
    const tab_component = document.createElement("div");
    tab_component.classList.add('tab');
    tab_component.dataset.id = tabIndex;

    // create url paragraph component 
    // only use 40 chars
    const tab_component_url = document.createElement("p");
    tab_component_url.textContent = max40Characters(tabUrl);
    
    // create title paragraph component
    // only use 40 chars
    const tab_component_title = document.createElement("p");
    tab_component_title.textContent = max40Characters(tabTitle);


    // append url and title component to the 
    tab_component.appendChild(tab_component_url);
    tab_component.appendChild(tab_component_title);


    const add_discard_btn = document.createElement("button");
    add_discard_btn.textContent = `Close this tab`;
    add_discard_btn.classList.add('buttons');
    add_discard_btn.addEventListener('click',function() {
        closeTab(tabIndex,tab_component);
    });
    tab_component.appendChild(add_discard_btn);

    // get tag destination and append the tab component
    document.getElementById('tabs').appendChild(tab_component);
}

document.addEventListener('DOMContentLoaded', function() {
    tabQuery();

});