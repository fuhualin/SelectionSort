urlpseudo = "./jsFiles/sorting/algoCode/selectionSort";
urlcpp = "./jsFiles/sorting/algoCode/selectionSort.cpp";
urljava = "./jsFiles/sorting/algoCode/java/selectionSort.java";
urlpython = "./jsFiles/sorting/algoCode/python/selectionSort.py";

d3.select("#algo-name").text("Selection Sort");
displayCodeFromFile(urlpseudo);

sortData();

function swap(i, j)
{
    var temp = dataSet[i];
    dataSet[i] = dataSet[j]; 
    dataSet[j] = temp;
}
//selectionSort
function sorting()
{
    if(playIndex >= 0 && playIndex<record.length )
    {
        dataSet = cloneData(record[playIndex]);
        hline = extraRecord[playIndex][0];
        strAction = extraRecord[playIndex][1];
        if(urlindex == 0) highlightCode(hline);
        actionLabel(strAction);
        redrawBars(dataSet);
        playIndex++;
    }
    else
    {
        clearInterval(timer);
    }
}

function sortData()
{
    record = []; extraRecord = []; hline = -1; playIndex = 0;
    strAction = "Starting to Sort";
    recordData(dataSet);
    var minIndex;
    for(var i = 0; i < dataSet.length; i++)
    {
        //set first unsorted element as minimum
        minIndex = i;
        dataSet[i].state = states.minimum; hline = 1;
        strAction = "Setting " + dataSet[i].value + " as minimum.";
        recordData(dataSet); 
        if(i === num - 1) //if one element left to sort
        {
            dataSet[i].state = states.sorted;
            strAction = dataSet[i].value + " is sorted.";
            recordData(dataSet);
            strAction = "All data has been Sorted.";
            recordData(dataSet); break;
        }
        for(var j = i+1; j < dataSet.length; j++)
        {   
            dataSet[j].state = states.compare; // setting current element to compare
            //set the previous comapre state to default state if it exist
            if(dataSet[j-1].state === states.compare)
                dataSet[j-1].state = states.default;

            //comapre current value with minimum
            if((dataSet[j].value < dataSet[minIndex].value))
            {
                //to highlight before setting as minimum
                strAction = "Comparing " + dataSet[j].value + " with " + dataSet[minIndex].value + "."; 
                hline = 3;                    
                recordData(dataSet);
                //setting as minimum
                dataSet[minIndex].state = states.default;
                minIndex = j;
                dataSet[minIndex].state = states.minimum;
                strAction = "Setting " + dataSet[j].value + " as minimum.";
                hline = 4;
                recordData(dataSet);
            }
            else
            {
                hline = 3;
                strAction = "Comparing " + dataSet[j].value + " with " + dataSet[minIndex].value + "."; 
                recordData(dataSet);
            } 
        }
        //make the last state equal to default
        if(dataSet[num-1].state === states.compare)
            dataSet[num-1].state = states.default;

        //turn both elements into swapping state
        dataSet[i].state = states.swapping;    
        dataSet[minIndex].state = states.swapping;
        strAction = "Swapping " + dataSet[i].value + " and " + dataSet[minIndex].value + ".";
        hline = 5;
        recordData(dataSet);
        //turning one state into sorted state
        swap(i, minIndex);
        dataSet[minIndex].state = states.default;
        dataSet[i].state = states.sorted;
        strAction = dataSet[i].value + " is sorted.";
        recordData(dataSet);
    }

    console.log("data sorted");
}

function init()
{
    initPlay = false;
    for(var k = 0; k< num; k++)
    {
        dataSet[k].state = states.default;
    }
}
function startSort(firstPlay) // if firstPlay is true then playing, else its resume
{
    if(firstPlay === true) init();
    timer = setInterval(function() { sorting() }, speed );   
}


