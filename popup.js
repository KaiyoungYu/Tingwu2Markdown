

function showOutput(result) {
  const outputElement = document.getElementById("output");
  outputElement.innerText = result;
  console.log(result);
}


function getSomething() {
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    var tab = tabs[0];
    var tabId = tab.id;

    // 使用 executeScript 注入并运行代码
    const [res] = await chrome.scripting.executeScript({
      target: { tabId },
      function: () => {          
          const r = document.getElementsByClassName("multiEllipsis-text")[0].textContent
          console.log(r);
          return r;
      }
  });
  showOutput(res.result)
  });
}


document.addEventListener('DOMContentLoaded', function() {
  var chatBtn = document.getElementById('chat-btn');
  chatBtn.addEventListener('click', getSomething);
  var chatBtn2 = document.getElementById('chat-btn2');
  chatBtn2.addEventListener('click', () => {
    const outputElement2 = document.getElementById("output2");
    outputElement2.innerText = 'G2'
  });
});

function showOutput2(result) {
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = result
}


// get 全文概要
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   var tab = tabs[0];
//   tab_title = tab.title;
//   chrome.tabs.executeScript(tab.id, {
//     code: 'document.getElementsByClassName("multiEllipsis-text")[0].innerText'
//   }, showOutput);
// });




// get 章节速览
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   var tab = tabs[0];
//   tab_title = tab.title;
//   chrome.tabs.executeScript(tab.id, {
//     code: 'document.getElementsByClassName("multiEllipsis-text")'
//   }, showOutput2);
// });


// get 发言总结

// get 要点回顾

// get 原文


// // 获取所有类名为 "parent" 的元素
// var parentElements = document.getElementsByClassName("parent");

// // 遍历每个父级元素
// for (var i = 0; i < parentElements.length; i++) {
//   var parentElement = parentElements[i];

//   // 获取当前父级元素下的子 div 元素
//   var childDivs = parentElement.getElementsByTagName("div");

//   // 遍历每个子 div 元素并输出其文本内容
//   for (var j = 0; j < childDivs.length; j++) {
//     var childDiv = childDivs[j];
//     console.log(childDiv.textContent);
//   }
// }
