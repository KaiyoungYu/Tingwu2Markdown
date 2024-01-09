var allres = [];

function showOutput(result) {
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = result;
  console.log('output');
  console.log(result);
}


function getSomething() {
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    var tab = tabs[0];
    var tabId = tab.id;


    // 使用 executeScript 注入并运行代码
    // get 全文概要
    // const [res] = await chrome.scripting.executeScript({
    //   target: { tabId },
    //   function: () => {          
    //       const r = document.getElementsByClassName("multiEllipsis-text")[0].textContent
    //       console.log(r);
    //       return r;
    //   }
    // });

    // get 章节速览
    // const [res] = await chrome.scripting.executeScript({
    //   target: { tabId },
    //   function: () => {          
    //       res = [];
          
    //       const r_time = document.getElementsByClassName("adendaTimeItem-time-content")
    //       const r_time_line = document.getElementsByClassName("adendaTimeItem-value-line")
    //       const r_time_value = document.getElementsByClassName("adendaTimeItem-value-des")

    //       for( i = 0; i < r_time_value.length; i++){
    //         res.push('#### `' + r_time[i].innerText + '` ' + r_time_line[i].innerText + '\n' + r_time_value[i].innerText + '\n')
    //         console.log(res[i])
    //       }
          
    //       // console.log(res);
    //       return res;
    //   }
    // });


    // get 发言总结
    const [res] = await chrome.scripting.executeScript({
      target: { tabId },
      function: () => {          
          res = [];
          
          const r_speaker = document.getElementsByClassName('sc-hfAwGc hCJRwt')
          const r_speaker_content = document.getElementsByClassName('sc-hwFkLi jPgJyi')

          for( i = 0; i < r_speaker.length; i++){
            res.push('#### ' + r_speaker[i].innerText + '\n' + r_speaker_content[i].innerText + '\n');
            // allres.push('#### ' + r_speaker[i].innerText + '\n' + r_speaker_content[i].innerText);
            console.log(res[i]);
          }
          
          // console.log(res);
          return res;
      }
    });

    // allres.concat(Array.from(res.result));


    
    // get 要点回顾

    // get 原文
    console.log('res.result');
    console.log(res.result);
    console.log('allres');
    allres = allres.concat(res.result);
    console.log(allres)
    showOutput(allres)
  });
}


document.addEventListener('DOMContentLoaded', function() {
  var chatBtn = document.getElementById('chat-btn');
  chatBtn.addEventListener('click', getSomething);
  var chatBtn2 = document.getElementById('chat-btn2');
  // chatBtn2.addEventListener('click', () => {
  //   const outputElement2 = document.getElementById("output2");
  //   outputElement2.innerText = 'G2'
  // });
  chatBtn2.addEventListener('click', showOutput2);
});

function showOutput2(result) {
  const outputElement2 = document.getElementById("output2");
  outputElement2.innerHTML = '点击了下载';
  const outputElement = document.getElementById("output");
  downloadFile('download.md', allres.join(""));
}

// 尝试下载功能
function downloadFile(filename, content) {
  // 它适用于所有支持 HTML5 的浏览器，因为它使用了 <a> 元素的下载属性：
  const outputElement2 = document.getElementById("output3");
  outputElement2.innerHTML = 'download called';

  const element = document.createElement("a");

  // Blob 是一种可以存储二进制数据的数据类型
  // 根据要保存的文件，它可以有不同的值
  const blob = new Blob([content], { type: "plain/text" });

  // createObjectURL() 静态方法创建一个 DOMString，其中包含一个 URL，该 URL 表示参数中给定的对象。
  const fileUrl = URL.createObjectURL(blob);

  // setAttribute() 设置指定元素的属性值。
  element.setAttribute("href", fileUrl); // 文件位置
  element.setAttribute("download", filename); // 文件名
  element.style.display = "none";

  // 使用 appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处
  document.body.appendChild(element);
  element.click();

  // Node 接口的 removeChild() 方法从 DOM 中移除一个子节点并返回移除的节点
  document.body.removeChild(element);
}
