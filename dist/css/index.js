//1
let a = 1;
async function changeContent(contentBlocksNames, delay = 0)
{
    let blocksHtml = [];
    contentBlocksNames.forEach(block => {
        blocksHtml.push(document.querySelector(block).innerHTML);
    });
    await sleep(delay);
    document.querySelector(contentBlocksNames[0]).innerHTML = blocksHtml[2];
    document.querySelector(contentBlocksNames[1]).innerHTML = blocksHtml[0];
    document.querySelector(contentBlocksNames[2]).innerHTML = blocksHtml[1];
    await sleep(delay);
    document.querySelector(contentBlocksNames[0]).innerHTML = blocksHtml[1];
    document.querySelector(contentBlocksNames[1]).innerHTML = blocksHtml[2];
    document.querySelector(contentBlocksNames[2]).innerHTML = blocksHtml[0];
    await sleep(delay);
    document.querySelector(contentBlocksNames[0]).innerHTML = blocksHtml[0];
    document.querySelector(contentBlocksNames[1]).innerHTML = blocksHtml[1];
    document.querySelector(contentBlocksNames[2]).innerHTML = blocksHtml[2];
    if (a==1){
      setInterval(()=>
      {document.querySelector('#section-4').style = 'color:' + 
      'hsla(' + Math.floor(Math.random()*360) + ', 100%, 82%, 1)';}, delay);
    }
}
//2

function addColorChangeWithDelay(delay)
{
    //document.querySelector('body').onclick = function()
    {
        document.querySelectorAll('#top, #bottom').forEach(block => 
        {
            setTimeout(()=>{ block.style = 
                'color:' + 'hsla(' + Math.floor(Math.random()*360) + ', 100%, 80%, 1)';}, delay);
        });
    };
}

//3
function createCommitFormTo(blockName)
{
    let form = document.createElement("form");
    form.id='git-commits-form';
    form.style = 'display:flex; flex-direction:column; border:solid 1px rgb(150, 45, 45);';

    let username = document.createElement("input");
    username.setAttribute('type',"text");
    username.setAttribute('name',"username");
    username.setAttribute('placeholder',"Username");
    username.setAttribute('required',true);

    let repositoryName = document.createElement("input");
    repositoryName.setAttribute('type',"text");
    repositoryName.setAttribute('name',"repository-name");
    repositoryName.setAttribute('placeholder',"Repository name");
    repositoryName.setAttribute('required',true);

    let submit = document.createElement("button");
    submit.setAttribute('type',"submit");
    submit.textContent = "Get commits";

    form.append(username);
    form.append(repositoryName);
    form.append(submit);

    document.querySelector(blockName).append(form);
}
async function addCommitsToBlock(blockName)
{
    let username = document.querySelector('#git-commits-form > input[name="username"]').value;
    let repositoryName = document.querySelector('#git-commits-form > input[name="repository-name"]').value;

    let response = await fetch(`https://api.github.com/repos/${username}/${repositoryName}/commits`);
    
    let div = document.createElement('div');
    div.id="commits-content";
    div.style.height = "15%";
    div.style.overflow = "auto";

    let ul = document.createElement('ul');
    if (response.ok) 
    {
        response.json().then(data => data.forEach(c => 
            {
                let li = document.createElement('li');
                li.textContent = `${c.commit.author.name} : ${c.commit.message}`;
                ul.append(li);
            }));
        div.append(ul);
    }
    else 
    {
        let p = document.createElement('p');
        p.textContent = `Error : ${response.status}(${response.statusText})`;
        p.style = 'display:border-box; border: solid 0.3em red; padding = 1em;';
        div.append(p);
    }
    document.querySelector(blockName).appendChild(div);
}

createCommitFormTo('#section-6');//3

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
//4
async function callFunc(...functions)
{
    for (let index = 0; index < functions.length; index++)
    {
        await functions[index]();
        console.log(`The ${index+1} function has finished its work`)
    }
}
function anyFunc()
{
    // nothing
}
function sleep(ms)
  {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

// 5
window.addEventListener('click', function() {
    addColorChangeWithDelay(5000);
    document.querySelector('#section-3').innerHTML  += 'Okey';
  });


//1
changeContent(['#section-2', '#section-3','#section-4'], 5000);
//4
callFunc(anyFunc, function(){return sleep(5000)});

//add 3
document.addEventListener('submit',function(event)
{
    if(event?.target.id == 'git-commits-form')
    {
        event.preventDefault();
        if(document.querySelector('#commits-content'))
        {
            document.querySelector('#commits-content').remove();
        }
        addCommitsToBlock('#' + document.querySelector('#git-commits-form').parentNode.id);
        document.querySelector('#git-commits-form').reset();
    }
    if(event?.target.id == 'sort-form')
    {
        event.preventDefault();
        if(document.querySelector('#sort-content'))
        {
            document.querySelector('#sort-content').remove();
        }
        sortListOfValuesToBlock('#' + document.querySelector('#sort-form').parentNode.id);
        document.querySelector('#sort-form').reset();
    }
});

//5

function createSortFormTo(blockName)
{
    let form = document.createElement("form");
    form.id='sort-form';
    form.style = 'display:flex; flex-direction:column; border:solid 1px rgb(150, 45, 45);';

    let listOfValues = document.createElement("input");
    listOfValues.setAttribute('type',"text");
    listOfValues.setAttribute('name',"list-of-values");
    listOfValues.setAttribute('placeholder',"List of values");
    listOfValues.setAttribute('required',true);

    let submit = document.createElement("button");
    submit.setAttribute('type',"submit");
    submit.textContent = "Sort";

    form.append(listOfValues);
    form.append(submit);

    document.querySelector(blockName).append(form);
}
function selectionSort(arr)
{ 
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let tmp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = tmp;
        }
    }
    return arr;
}


function sortListOfValuesToBlock(blockName)
    {
        let listOfValues = document.querySelector('#sort-form > input[name="list-of-values"]').value;

        let numberList = [];
        let tmpnum = '';
        for (let index = 0; index <= listOfValues.length; index++){
          if (listOfValues[index] >= '0' && listOfValues[index] <= '9'){
            tmpnum+=listOfValues[index];
          }
          if(listOfValues[index] == ' ')
          {
            numberList.push(parseInt(tmpnum));
            tmpnum = '';
          }
        }
        if(tmpnum != '')
          {
            numberList.push(parseInt(tmpnum));
          }

        if(numberList.length == 0)
            console.log('Error: no number is a list');
        else
        {
            console.log('Input list of numbers :');
            console.log(numberList.slice());
            console.log('Sorted list of numbers :')
            console.log(selectionSort(numberList));
        }
    }
  //5
  createSortFormTo('#section-6')