
// function sendMessageToChatGPT() {
//   console.log("点击了按钮");
//   // 点击 CHAT 按钮的代码
//   const outputElement = document.getElementById("output");
//   outputElement.innerText = "点击了按钮";


//   // 发送请求到 ChatGPT 的 API endpoint
//   fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer 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"
//     },
//     body: JSON.stringify({
//       "model": "gpt-3.5-turbo",
//       "messages": [{"role": "user", 
//                     "content": "Hello! Who are you?"}]
//     })
//   })
//   .then(response => response.json())
//   .then(data => {
//     // 将返回的文本展示在页面上
//     const outputElement2 = document.getElementById("output2");
//     outputElement2.innerText = data.choices[0].message.content;
//   });

// }


function getSomething() {
  var someting = document.getElementsByClassName('multiEllipsis-text');
  const outputElement = document.getElementById("output");
  console.log(someting[0].innerText);
  console.log(someting);
  console.log('DONE');
  outputElement.innerText = someting[0].innerText
}

function showOutput(result) {
  const outputElement = document.getElementById("output");
  outputElement.innerText = result
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


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  chrome.tabs.executeScript(tab.id, {
    code: 'document.getElementsByClassName("multiEllipsis-text")[0].innerText'
  }, showOutput);
});




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
