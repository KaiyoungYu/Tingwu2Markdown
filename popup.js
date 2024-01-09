var allres = [];
var title = '';

// get wanted Contents
function getContent() {
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    var tab = tabs[0];
    var tabId = tab.id;

    // 使用 executeScript 注入并运行代码
    // get 全文概要
    const [res_qwgy] = await chrome.scripting.executeScript({
      target: { tabId },
      function: () => {
        res = ['## 全文概要\n'];
        const r = document.getElementsByClassName("multiEllipsis-text")[0].textContent + '\n';
        console.log('全文概要');
        console.log(r);
        res.push(r);
        return res;
    }
    });

    //get 章节速览
    const [res_zjsl] = await chrome.scripting.executeScript({
      target: { tabId },
      function: () => {          
          res = ['\n## 章节速览\n'];
          
          const r_time = document.getElementsByClassName("adendaTimeItem-time-content")
          const r_time_line = document.getElementsByClassName("adendaTimeItem-value-line")
          const r_time_value = document.getElementsByClassName("adendaTimeItem-value-des")

          for( i = 0; i < r_time_value.length; i++){
            res.push('#### `' + r_time[i].innerText + '` ' + r_time_line[i].innerText + '\n' + r_time_value[i].innerText + '\n')
            // console.log(res[i])
          }
          
          console.log('章节速览');
          console.log(res);
          return res;
      }
    });

    // get 发言总结
    const [res_fyzj] = await chrome.scripting.executeScript({
      target: { tabId },
      function: () => {          
          res = ['\n## 发言总结\n'];
          
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

    // get 原文
    const [res_yw] = await chrome.scripting.executeScript({
      target: { tabId },
      function: () => {          
          res = ['\n## 原文\n'];

          const r_speaker =  document.getElementsByClassName("sc-jvIDnw ftNyTy speaker")
          const r_speaker_time = document.getElementsByClassName("sc-eCzpMH mfNEv time")
          const r_content = document.getElementsByClassName("sc-NsUQg gJEWrZ")

          for( i = 0; i < r_speaker.length; i++){
            res.push('`' + r_speaker[i].innerText + '` `' + r_speaker_time[i].innerText + '`\n');
            res.push(r_content[i].innerText + '\n\n');
            console.log(res[i]);
          }
          
          // console.log(res);
          return res;
      }
    });

    // get title
    const [res_title] = await chrome.scripting.executeScript({
      target: { tabId },
      function: () => {          
          res = document.getElementsByTagName('title')[0].innerText;
          return res;
      }
    });


    title = res_title.result;
    allres = allres.concat(res_qwgy.result, res_zjsl.result, res_fyzj.result, res_yw.result);
    showOutput(allres)
  });
}


// 展示抓取到的文字
function showOutput(result) {
  const outputElement = document.getElementById("text-demo");
  outputElement.innerHTML = result;
}


// BTN 
document.addEventListener('DOMContentLoaded', function() {
  var chatBtn = document.getElementById('btn-grab');
  chatBtn.addEventListener('click', getContent);
  
  var chatBtn2 = document.getElementById('btn-download');
  chatBtn2.addEventListener('click', () => {
    const textElement = document.getElementById("text-hint");
    downloadFile(title+'.md' || 'download.md', allres.join(""));
    
    if(allres.length === 0) {
      textElement.innerText = '请先抓取';
    } 
    else {
      textElement.innerText = '已下载！';
    }
  });
});


// 下载功能 copied from web
function downloadFile(filename, content) {
  // 它适用于所有支持 HTML5 的浏览器，因为它使用了 <a> 元素的下载属性：
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
